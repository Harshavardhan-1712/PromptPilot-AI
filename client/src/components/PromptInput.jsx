import React from 'react';

const MAX_LENGTH = 4000;

export default function PromptInput({ value, onChange, disabled }) {
  const count = value.length;
  const nearLimit = count > MAX_LENGTH * 0.9;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="prompt-input" className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Your prompt
        </label>
        <span className={`text-xs font-mono ${nearLimit ? 'text-amber-400' : 'text-slate-500'}`}>
          {count} / {MAX_LENGTH}
        </span>
      </div>
      <textarea
        id="prompt-input"
        value={value}
        disabled={disabled}
        maxLength={MAX_LENGTH}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Write a resume for a software engineering internship"
        rows={5}
        className="w-full resize-y rounded-xl bg-bg-raised border border-card-border focus:border-primary
          text-slate-100 placeholder:text-slate-600 px-4 py-3 text-sm leading-relaxed
          outline-none transition-colors duration-150 disabled:opacity-50 scroll-thin"
      />
    </div>
  );
}
