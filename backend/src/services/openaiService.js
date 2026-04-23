import OpenAI from "openai";

import { env } from "../config/env.js";

const client = new OpenAI({
  apiKey: env.openAiApiKey
});

const ensureApiKey = () => {
  if (!env.openAiApiKey) {
    const error = new Error("OPENAI_API_KEY is not configured");
    error.statusCode = 500;
    throw error;
  }
};

const parseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (_error) {
    return null;
  }
};

export const generateHooksAndCaptions = async (niche) => {
  ensureApiKey();

  const prompt = `Generate viral short-form video hooks for ${niche} using curiosity, emotion, and controversy.
Return valid JSON with this shape:
{
  "hooks": ["10 hooks"],
  "captions": ["5 captions"],
  "titles": ["5 SEO titles"],
  "hashtags": ["10 hashtags"]
}`;

  const response = await client.responses.create({
    model: env.openAiModel,
    input: prompt
  });

  const outputText = response.output_text || "{}";
  const parsed = parseJson(outputText);

  if (!parsed) {
    throw new Error("OpenAI returned an unexpected format");
  }

  return parsed;
};
