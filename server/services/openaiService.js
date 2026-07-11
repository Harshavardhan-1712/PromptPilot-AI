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
    console.error("OPENAI ERROR:");
    console.error(err);

    if (err.status) console.error("Status:", err.status);
    if (err.code) console.error("Code:", err.code);
    if (err.message) console.error("Message:", err.message);

    throw err;
  }
}
