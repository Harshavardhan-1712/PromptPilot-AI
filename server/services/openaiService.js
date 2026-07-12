import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  console.log("🚀 Calling Gemini...");

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

  console.log("✅ Stream opened");

  for await (const chunk of response) {
    console.log("📦 Chunk:", chunk.text);

    if (chunk.text) {
      onToken(chunk.text);
    }
  }

  console.log("🏁 Stream finished");
}
