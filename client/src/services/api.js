// services/api.js

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function improvePromptStream(
  payload,
  { onToken, onDone, onError },
  signal
) {
  console.log("========== STARTING STREAM ==========");

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

    console.log("Response Status:", response.status);
    console.log("Response Headers:", [...response.headers.entries()]);
  } catch (err) {
    console.error("Fetch Error:", err);
    onError("Network error.");
    return;
  }

  if (!response.ok || !response.body) {
    console.error("Invalid Response");

    try {
      const data = await response.json();
      onError(data.error || "Something went wrong.");
    } catch {
      onError("Something went wrong.");
    }

    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();

      console.log("Reader Result:", {
        done,
        bytes: value?.length,
      });

      if (done) {
        console.log("========== STREAM FINISHED ==========");
        break;
      }

      const chunk = decoder.decode(value, {
        stream: true,
      });

      console.log("RAW CHUNK:");
      console.log(chunk);

      buffer += chunk;

      const messages = buffer.split("\n\n");
      buffer = messages.pop() || "";

      console.log("Messages Found:", messages.length);

      for (const message of messages) {
        console.log("---------------");
        console.log("MESSAGE:");
        console.log(message);

        const lines = message.split("\n");

        let event = "";
        let data = "";

        for (const line of lines) {
          console.log("LINE:", line);

          if (line.startsWith("event:")) {
            event = line.replace("event:", "").trim();
          }

          if (line.startsWith("data:")) {
            data = line.replace("data:", "").trim();
          }
        }

        console.log("EVENT =", event);
        console.log("DATA =", data);

        if (!data) continue;

        try {
          const parsed = JSON.parse(data);

          if (event === "token") {
            console.log("TOKEN RECEIVED:", parsed.token);
            onToken(parsed.token);
          }

          if (event === "done") {
            console.log("DONE EVENT");
            onDone();
          }

          if (event === "error") {
            console.log("ERROR EVENT");
            onError(parsed.error);
          }
        } catch (e) {
          console.error("JSON Parse Error:", e);
        }
      }
    }
  } catch (err) {
    console.error("Reader Error:", err);

    if (err.name !== "AbortError") {
      onError("Connection interrupted.");
    }
  }

  console.log("========== API COMPLETE ==========");
}
