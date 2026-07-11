import OpenAI from 'openai';
import { env } from '../config/env.js';

const client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function streamImprovedPrompt(systemPrompt, userPrompt, onToken) {
  try {
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
  } catch (err) {
    console.error("========== OPENAI ERROR ==========");
    console.error(err);
    console.error("Status:", err.status);
    console.error("Code:", err.code);
    console.error("Message:", err.message);
    console.error("==================================");

    throw err;
  }
}
