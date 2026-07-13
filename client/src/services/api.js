// services/api.js

const API_BASE = import.meta.env.VITE_API_URL || "";

export async function improvePromptStream(
  payload,
  { onToken, onDone, onError },
  signal
) {
  let response;

  try {
    response = await fetch(`${API_BASE}/api/improve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal,
    });

    console.log("Response:", response.status);
  } catch (err) {
    console.error(err);
    onError("Network error.");
    return;
  }

  if (!response.ok || !response.body) {
    onError("Server error.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        console.log("Stream finished.");

        // Process any remaining buffered message
        if (buffer.trim()) {
          processMessage(buffer);
        }

        onDone();
        return;
      }

      const chunk = decoder.decode(value, { stream: true });

      console.log("RAW CHUNK:");
      console.log(chunk);

      buffer += chunk;

      const messages = buffer.split("\n\n");
      buffer = messages.pop() || "";

      for (const message of messages) {
        processMessage(message);
      }
    }
  } catch (err) {
    console.error(err);

    if (err.name !== "AbortError") {
      onError(err.message);
    }
  }

  function processMessage(message) {
    console.log("MESSAGE:");
    console.log(message);

    const lines = message.split("\n");

    let event = "";
    let data = "";

    for (const line of lines) {
      if (line.startsWith("event:")) {
        event = line.substring(6).trim();
      }

      if (line.startsWith("data:")) {
        data += line.substring(5).trim();
      }
    }

    if (!data) return;

    console.log("EVENT:", event);
    console.log("DATA:", data);

    try {
      const parsed = JSON.parse(data);

      if (event === "token") {
        onToken(parsed.token);
      }

      if (event === "done") {
        onDone();
      }

      if (event === "error") {
        onError(parsed.error);
      }
    } catch (err) {
      console.error("JSON Parse Error:", err);
    }
  }
}
