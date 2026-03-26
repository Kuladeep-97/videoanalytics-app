import json

from openai import OpenAI


SYSTEM_PROMPT = """
You write dating-chat replies that sound human, socially sharp, and natural.

Rules:
- Match the requested tone without sounding robotic or scripted.
- Keep replies concise, textable, and believable.
- Avoid cheesy pickup lines unless the tone strongly calls for it.
- Do not mention being an AI.
- Return valid JSON only.
""".strip()


class OpenAIService:
    def __init__(self, api_key: str, model: str) -> None:
        self.client = OpenAI(api_key=api_key)
        self.model = model

    def generate_replies(self, conversation_text: str, tone: str) -> list[str]:
        prompt = f"""
Generate exactly 3 distinct dating-app replies for the conversation below.

Tone: {tone}

Conversation:
{conversation_text}

Return JSON in this exact shape:
{{"replies": ["reply 1", "reply 2", "reply 3"]}}
""".strip()

        response = self.client.responses.create(
            model=self.model,
            input=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
        )
        payload = self._load_json(response.output_text)
        replies = payload.get("replies", [])
        cleaned = [str(reply).strip() for reply in replies if str(reply).strip()]
        if len(cleaned) != 3:
            raise ValueError("Model did not return exactly 3 replies.")
        return cleaned

    def score_reply(self, conversation_text: str, reply_text: str) -> dict[str, str | int]:
        prompt = f"""
Rate the draft reply for the conversation below.

Conversation:
{conversation_text}

Reply:
{reply_text}

Score the reply from 1 to 10 based on charm, confidence, clarity, and how natural it feels.
Return JSON in this exact shape:
{{"score": 8, "verdict": "short explanation"}}
""".strip()

        response = self.client.responses.create(
            model=self.model,
            input=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt},
            ],
        )
        payload = self._load_json(response.output_text)
        score = int(payload["score"])
        verdict = str(payload["verdict"]).strip()
        if not 1 <= score <= 10:
            raise ValueError("Score must be between 1 and 10.")
        return {"score": score, "verdict": verdict}

    @staticmethod
    def _load_json(content: str) -> dict:
        start = content.find("{")
        end = content.rfind("}")
        if start == -1 or end == -1:
            raise ValueError("Model did not return JSON.")
        return json.loads(content[start : end + 1])

