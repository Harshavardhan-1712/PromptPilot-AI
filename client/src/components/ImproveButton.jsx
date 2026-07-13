import React from 'react';

export default function ImproveButton({
  onClick,
  onCancel,
  isStreaming,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={isStreaming ? onCancel : onClick}
      disabled={!isStreaming && disabled}
      className={`w-full sm:w-auto flex items-center justify-center gap-2 text-sm ${
        isStreaming ? 'btn-secondary' : 'btn-primary'
      }`}
    >
      {isStreaming ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
          Stop Generating
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Improve Prompt
        </>
      )}
    </button>
  );
}
