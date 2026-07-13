import { buildSystemPrompt } from "../services/promptBuilder.js";
import { streamImprovedPrompt } from "../services/openaiService.js";

export async function improvePrompt(req, res) {
  const { prompt, style } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders?.();

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  let closed = false;

  req.on("close", () => {
    closed = true;
    console.log("Client disconnected");
  });

  try {
    console.log("Incoming Prompt:", prompt);

    const systemPrompt = buildSystemPrompt(style);

    await streamImprovedPrompt(systemPrompt, prompt, (token) => {
      if (!closed) {
        sendEvent("token", { token });
      }
    });

    if (!closed) {
      sendEvent("done", { done: true });
      res.end();
    }
  } catch (err) {
    console.error(err);

    if (!closed) {
      sendEvent("error", {
        error: err.message,
      });

      res.end();
    }
  }
}
