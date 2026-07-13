import { buildSystemPrompt } from "../services/promptBuilder.js";
import { streamImprovedPrompt } from "../services/openaiService.js";

export async function improvePrompt(req, res) {
  console.log("========== CONTROLLER HIT ==========");

  const { prompt, style } = req.body;

  console.log("Prompt:", prompt);
  console.log("Style:", style);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  res.flushHeaders?.();

  // Force the SSE connection to start immediately
  res.write(": connected\n\n");

  const sendEvent = (event, data) => {
    const message =
      `event: ${event}\n` +
      `data: ${JSON.stringify(data)}\n\n`;

    console.log("Sending Event:", event);

    res.write(message);

    // Flush if available
    res.flush?.();
  };

  let closed = false;

  res.on("close", () => {
    closed = true;
    console.log("Response closed");
  });

  req.on("aborted", () => {
    closed = true;
    console.log("Request aborted");
  });

  try {
    console.log("Building system prompt...");
    const systemPrompt = buildSystemPrompt(style);
    console.log("System prompt built.");

    console.log("Calling Gemini...");

    await streamImprovedPrompt(systemPrompt, prompt, (token) => {
      console.log("TOKEN:", token);

      // Send regardless for this test
      sendEvent("token", { token });
    });

    console.log("Gemini stream completed.");

    sendEvent("done", { done: true });

    res.end();

    console.log("========== REQUEST FINISHED ==========");
  } catch (err) {
    console.error("========== CONTROLLER ERROR ==========");
    console.error(err);

    sendEvent("error", {
      error: err.message || "Failed to generate response.",
    });

    res.end();
  }
}
