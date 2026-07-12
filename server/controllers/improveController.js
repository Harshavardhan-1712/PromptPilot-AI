// controllers/improveController.js
// Handles POST /api/improve. Streams the optimized prompt back to the
// client using Server-Sent Events so the UI can render tokens progressively.

import { buildSystemPrompt } from '../services/promptBuilder.js';
import { streamImprovedPrompt } from '../services/openaiService.js';

export async function improvePrompt(req, res, next) {
  const { prompt, style } = req.body;

  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no'); // disable proxy buffering (e.g. nginx)
  res.flushHeaders?.();

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // If the client disconnects early, stop wasting tokens.
  let clientClosed = false;
  req.on('close', () => {
    clientClosed = true;
  });

  try {
    const systemPrompt = buildSystemPrompt(style);

    await streamImprovedPrompt(systemPrompt, prompt, (token) => {
      if (!clientClosed) {
        sendEvent('token', { token });
      }
    });

    if (!clientClosed) {
      sendEvent('done', { done: true });
      res.end();
    }
  } } catch (err) {
  console.error("========== CONTROLLER ERROR ==========");
  console.error(err);
  console.error("======================================");

  if (!clientClosed) {
    sendEvent("error", {
      error: err.message || "Failed to generate response.",
    });
    res.end();
  }
      } catch {
        next(err);
      }
    }
  }
}
