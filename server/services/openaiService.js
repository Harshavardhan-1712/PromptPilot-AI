import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

console.log("Creating Gemini client...");

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  console.log("========== GEMINI ==========");
  console.log("Model:", env.GEMINI_MODEL);
  console.log("Starting generateContentStream...");

  const stream = await client.models.generateContentStream({
    model: env.GEMINI_MODEL,
    contents: `${systemPrompt}\n\n${userPrompt}`,
  });

  console.log("Stream created.");

  for await (const chunk of stream) {
    console.log("Chunk received:", chunk.text);

    if (chunk.text) {
      onToken(chunk.text);
    }
  }

  console.log("Gemini stream finished.");
}
