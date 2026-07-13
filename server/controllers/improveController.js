import { buildSystemPrompt } from "../services/promptBuilder.js";
import { streamImprovedPrompt } from "../services/openaiService.js";

export async function improvePrompt(req, res) {
  console.log("========== CONTROLLER HIT ==========");

  const { prompt, style } = req.body;

  console.log("Prompt:", prompt);
  console.log("Style:", style);

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
    console.log("Building system prompt...");
    const systemPrompt = buildSystemPrompt(style);
    console.log("System prompt built.");

    console.log("Calling Gemini...");

    await streamImprovedPrompt(systemPrompt, prompt, (token) => {
      console.log("TOKEN:", token);

      if (!closed) {
        sendEvent("token", { token });
      }
    });

    console.log("Gemini stream completed.");

    if (!closed) {
      console.log("Sending DONE event.");
      sendEvent("done", { done: true });
      res.end();
    }

    console.log("========== REQUEST FINISHED ==========");
  } catch (err) {
    console.error("========== CONTROLLER ERROR ==========");
    console.error(err);
    console.error("======================================");

    if (!closed) {
      sendEvent("error", {
        error: err.message || "Failed to generate response.",
      });
      res.end();
    }
  }
}
