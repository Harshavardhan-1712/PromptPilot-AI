import React from 'react';

export default function ImproveButton({ onClick, isStreaming, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-sm"
    >
      {isStreaming ? (
        <>
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          Generating…
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Improve Prompt
        </>
      )}
    </button>
  );
}
