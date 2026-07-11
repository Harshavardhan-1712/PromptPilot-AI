// services/api.js
// Handles the streaming request to POST /api/improve.
// Uses fetch + ReadableStream instead of EventSource because EventSource
// only supports GET requests, and we need to POST the prompt body.

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Streams an improved prompt from the backend.
 * @param {{prompt: string, style: string}} payload
 * @param {{onToken: (t: string) => void, onDone: () => void, onError: (e: string) => void}} handlers
 * @param {AbortSignal} signal
 */
export async function improvePromptStream(payload, { onToken, onDone, onError }, signal) {
  let response;
  try {
    response = await fetch(`${API_BASE}/api/improve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
  } catch (err) {
    onError('Network error. Please check your connection and try again.');
    return;
  }

  if (!response.ok || !response.body) {
    try {
      const data = await response.json();
      onError(data.error || 'Something went wrong.');
    } catch {
      onError('Something went wrong. Please try again.');
    }
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // SSE messages are separated by a blank line.
      const messages = buffer.split('\n\n');
      buffer = messages.pop(); // keep incomplete chunk in buffer

      for (const message of messages) {
        const lines = message.split('\n');
        let event = 'message';
        let data = '';
        for (const line of lines) {
          if (line.startsWith('event:')) event = line.slice(6).trim();
          if (line.startsWith('data:')) data = line.slice(5).trim();
        }
        if (!data) continue;

        try {
          const parsed = JSON.parse(data);
          if (event === 'token') onToken(parsed.token);
          if (event === 'done') onDone();
          if (event === 'error') onError(parsed.error);
        } catch {
          // ignore malformed chunk
        }
      }
    }
  } catch (err) {
    if (err.name !== 'AbortError') {
      onError('Connection interrupted. Please try again.');
    }
  }
}
