import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-card-border mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} PromptPilot AI. Built for better prompts.
        </p>
        <p className="text-xs text-slate-600">
          Powered by GPT · Works great with Claude & Gemini too
        </p>
      </div>
    </footer>
  );
}
