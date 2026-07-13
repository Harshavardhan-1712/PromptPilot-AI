// hooks/useImprovePrompt.js

import { useCallback, useRef, useState } from "react";
import { improvePromptStream } from "../services/api.js";
import { saveHistoryEntry } from "../utils/historyStorage.js";

export function useImprovePrompt() {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  const run = useCallback(async (prompt, style) => {
    console.log("Starting stream...");

    setOutput("");
    setError(null);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let fullText = "";

    try {
      await improvePromptStream(
        { prompt, style },
        {
          onToken: (token) => {
            console.log("Received token:", token);

            fullText += token;

            setOutput((prev) => prev + token);
          },

          onDone: () => {
            console.log("Stream completed.");

            setIsStreaming(false);

            if (fullText.trim()) {
              saveHistoryEntry({
                id: crypto.randomUUID(),
                prompt,
                style,
                result: fullText,
                timestamp: Date.now(),
              });
            }
          },

          onError: (message) => {
            console.error("Stream error:", message);

            setError(message);
            setIsStreaming(false);
          },
        },
        controller.signal
      );
    } catch (err) {
      console.error("Unexpected error:", err);

      setError(err.message || "Something went wrong.");
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, []);

  const cancel = useCallback(() => {
    console.log("Cancelling stream...");

    abortRef.current?.abort();
    abortRef.current = null;

    setIsStreaming(false);
  }, []);

  return {
    output,
    isStreaming,
    error,
    run,
    cancel,
    setOutput,
  };
}
