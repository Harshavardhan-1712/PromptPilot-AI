import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-xl shadow-lg
        text-sm font-medium animate-fadeIn flex items-center gap-2 border
        ${isError
          ? 'bg-red-500/15 border-red-500/30 text-red-300'
          : 'bg-accent/15 border-accent/30 text-accent'}`}
    >
      {isError ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {toast.message}
    </div>
  );
}
