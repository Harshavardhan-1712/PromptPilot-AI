// controllers/improveController.js

import { buildSystemPrompt } from "../services/promptBuilder.js";
import { streamImprovedPrompt } from "../services/openaiService.js";

export async function improvePrompt(req, res, next) {
  const { prompt, style } = req.body;

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  let clientClosed = false;

  req.on("close", () => {
    clientClosed = true;
    console.log("Client disconnected");
  });

  try {
    console.log("========== NEW REQUEST ==========");
    console.log("Style:", style);
    console.log("Prompt:", prompt);

    const systemPrompt = buildSystemPrompt(style);

    console.log("System prompt built");

    await streamImprovedPrompt(systemPrompt, prompt, (token) => {
      console.log("Token:", token);

      if (!clientClosed) {
        sendEvent("token", { token });
      }
    });

    console.log("Streaming completed");

    if (!clientClosed) {
      sendEvent("done", { done: true });
      res.end();
    }
  } catch (err) {
    console.error("========== CONTROLLER ERROR ==========");
    console.error(err);
    console.error("======================================");

    if (!clientClosed) {
      sendEvent("error", {
        error: err.message || "Failed to generate response.",
      });
      res.end();
    }
  }
}
