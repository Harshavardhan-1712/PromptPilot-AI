// hooks/useImprovePrompt.js
import { useCallback, useRef, useState } from 'react';
import { improvePromptStream } from '../services/api.js';
import { saveHistoryEntry } from '../utils/historyStorage.js';

export function useImprovePrompt() {
  const [output, setOutput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const run = useCallback(async (prompt, style) => {
    setOutput('');
    setError(null);
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let fullText = '';

    await improvePromptStream(
      { prompt, style },
      {
        onToken: (token) => {
          fullText += token;
          setOutput((prev) => prev + token);
        },
        onDone: () => {
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
          setError(message);
          setIsStreaming(false);
        },
      },
      controller.signal
    );

    setIsStreaming(false);
  }, []);

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { output, isStreaming, error, run, cancel, setOutput };
}
