from io import BytesIO

from PIL import Image
import pytesseract


class OCRService:
    def __init__(self, tesseract_cmd: str | None = None) -> None:
        if tesseract_cmd:
            pytesseract.pytesseract.tesseract_cmd = tesseract_cmd

    def extract_text(self, image_bytes: bytes) -> str:
        image = Image.open(BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text.strip()

