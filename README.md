# AI Dating Assistant

A small full-stack web app that turns pasted chats or screenshot uploads into three dating-app-style reply suggestions.

## Features

- FastAPI backend with modular services
- Plain HTML, CSS, and vanilla JavaScript frontend
- OCR from uploaded screenshots via `pytesseract`
- OpenAI-powered reply generation with tone presets
- Reply scoring endpoint that rates a draft out of 10

## Prerequisites

1. Python 3.11+
2. Tesseract OCR installed locally
3. An OpenAI API key

### Install Tesseract

- Windows: install [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki) and note the path to `tesseract.exe`
- macOS: `brew install tesseract`
- Ubuntu/Debian: `sudo apt-get install tesseract-ocr`

If Tesseract is not on your system `PATH`, set `TESSERACT_CMD` in `.env`.

## Local setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Set these variables in `.env`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5-mini
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

## Run

```bash
uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000`.

## API endpoints

- `GET /` renders the frontend
- `POST /api/generate/text` generates 3 replies from pasted text
- `POST /api/generate/image` extracts text from an uploaded image, then generates 3 replies
- `POST /api/score` rates a reply out of 10

