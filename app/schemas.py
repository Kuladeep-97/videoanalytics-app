from typing import Literal

from pydantic import BaseModel, Field


Tone = Literal["Flirty", "Funny", "Confident", "Savage"]


class ReplyRequest(BaseModel):
    message_text: str = Field(..., min_length=1, description="Conversation text to reply to.")
    tone: Tone


class ReplyOption(BaseModel):
    text: str


class ReplyResponse(BaseModel):
    source_text: str
    tone: Tone
    replies: list[ReplyOption]


class ScoreRequest(BaseModel):
    conversation_text: str = Field(..., min_length=1)
    reply_text: str = Field(..., min_length=1)


class ScoreResponse(BaseModel):
    score: int = Field(..., ge=1, le=10)
    verdict: str

