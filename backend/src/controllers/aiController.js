import { generateHooksAndCaptions } from "../services/openaiService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a viral content expert.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      result: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI generation failed" });
  }
};