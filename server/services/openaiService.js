import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  console.log("Calling Gemini...");
  console.log("Model:", env.GEMINI_MODEL);

  const stream = await client.models.generateContentStream({
    model: env.GEMINI_MODEL,
    contents: `${systemPrompt}\n\n${userPrompt}`,
  });

  console.log("Stream created");

  for await (const chunk of stream) {
    console.log("Chunk:", chunk);

    if (chunk.text) {
      console.log("Text:", chunk.text);
      onToken(chunk.text);
    }
  }

  console.log("Stream finished");
}
