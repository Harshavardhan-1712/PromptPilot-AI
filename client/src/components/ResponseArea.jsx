import React from 'react';

export default function ResponseArea({ output, isStreaming, error, onCopy }) {
  const hasContent = output.length > 0;

  return (
    <div className="card p-5 min-h-[220px] flex flex-col animate-fadeIn">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Optimized prompt
        </span>
        {hasContent && !isStreaming && (
          <button
            onClick={onCopy}
            className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin max-h-[420px]">
        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {!error && !hasContent && !isStreaming && (
          <div className="text-slate-600 text-sm h-full flex flex-col items-center justify-center py-10 text-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 3v18M3 12h18" strokeLinecap="round" opacity="0.4" />
              <circle cx="12" cy="12" r="9" opacity="0.2" />
            </svg>
            Your optimized prompt will stream in here.
          </div>
        )}

        {!error && hasContent && (
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
            {output}
            {isStreaming && <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-blink align-middle" />}
          </p>
        )}
      </div>
    </div>
  );
}
