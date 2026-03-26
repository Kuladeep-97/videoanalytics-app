from pathlib import Path

from fastapi import Depends, FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.config import Settings, get_settings
from app.schemas import ReplyOption, ReplyRequest, ReplyResponse, ScoreRequest, ScoreResponse, Tone
from app.services.ocr_service import OCRService
from app.services.openai_service import OpenAIService


BASE_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(title="AI Dating Assistant")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))


def get_openai_service(settings: Settings = Depends(get_settings)) -> OpenAIService:
    return OpenAIService(api_key=settings.openai_api_key, model=settings.openai_model)


def get_ocr_service(settings: Settings = Depends(get_settings)) -> OCRService:
    return OCRService(tesseract_cmd=settings.tesseract_cmd)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/api/generate/text", response_model=ReplyResponse)
async def generate_from_text(
    payload: ReplyRequest,
    openai_service: OpenAIService = Depends(get_openai_service),
) -> ReplyResponse:
    try:
        replies = openai_service.generate_replies(payload.message_text, payload.tone)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ReplyResponse(
        source_text=payload.message_text,
        tone=payload.tone,
        replies=[ReplyOption(text=reply) for reply in replies],
    )


@app.post("/api/generate/image", response_model=ReplyResponse)
async def generate_from_image(
    tone: Tone = Form(...),
    image: UploadFile = File(...),
    ocr_service: OCRService = Depends(get_ocr_service),
    openai_service: OpenAIService = Depends(get_openai_service),
) -> ReplyResponse:
    try:
        image_bytes = await image.read()
        extracted_text = ocr_service.extract_text(image_bytes)
        if not extracted_text:
            raise HTTPException(status_code=400, detail="No readable text found in the image.")
        replies = openai_service.generate_replies(extracted_text, tone)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ReplyResponse(
        source_text=extracted_text,
        tone=tone,
        replies=[ReplyOption(text=reply) for reply in replies],
    )


@app.post("/api/score", response_model=ScoreResponse)
async def score_reply(
    payload: ScoreRequest,
    openai_service: OpenAIService = Depends(get_openai_service),
) -> ScoreResponse:
    try:
        result = openai_service.score_reply(payload.conversation_text, payload.reply_text)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return ScoreResponse(score=result["score"], verdict=result["verdict"])
