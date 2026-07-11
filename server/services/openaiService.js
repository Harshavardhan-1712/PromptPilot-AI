// services/openaiService.js
// Thin wrapper around the OpenAI SDK. Isolating the SDK here means the rest
// of the app never touches API keys or vendor-specific response shapes.

import OpenAI from 'openai';
import { env } from '../config/env.js';

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

/**
 * Streams a chat completion token-by-token.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {(chunk: string) => void} onToken - called for each text delta
 * @returns {Promise<void>} resolves when the stream completes
 */
export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  const stream = await client.chat.completions.create({
    model: env.OPENAI_MODEL,
    stream: true,
    temperature: 0.7,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  for await (const part of stream) {
    const token = part.choices?.[0]?.delta?.content;
    if (token) {
      onToken(token);
    }
  }
}
