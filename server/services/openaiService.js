import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const client = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  try {
    console.log("🚀 Calling Gemini...");
    console.log("Model:", env.GEMINI_MODEL);

    const response = await client.models.generateContentStream({
      model: env.GEMINI_MODEL,
      contents: `${systemPrompt}\n\n${userPrompt}`,
    });

    console.log("✅ Stream opened");

    for await (const chunk of response) {
      console.log("📦", chunk.text);

      if (chunk.text) {
        onToken(chunk.text);
      }
    }

    console.log("🏁 Stream finished");
  } catch (err) {
    console.error("🔥 GEMINI ERROR");
    console.error(err);
    throw err;
  }
}
