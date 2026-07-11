import React from 'react';

export default function Navbar({ onToggleHistory }) {
  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 12L11 4L20 8L13 12L20 16L11 20L4 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-semibold text-lg text-white tracking-tight">
            PromptPilot <span className="text-primary">AI</span>
          </span>
        </div>

        <button
          onClick={onToggleHistory}
          className="btn-ghost text-sm flex items-center gap-2 lg:hidden"
          aria-label="Toggle prompt history"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3M12 3a9 9 0 1 0 9 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          History
        </button>
      </div>
    </header>
  );
}
