import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  const response = await client.models.generateContentStream({
    model: env.GEMINI_MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `${systemPrompt}\n\n${userPrompt}`,
          },
        ],
      },
    ],
  });

  for await (const chunk of response) {
    if (chunk.text) {
      onToken(chunk.text);
    }
  }
}