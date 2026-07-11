import React from 'react';

export const PROMPT_STYLES = [
  { id: 'Professional', label: 'Professional', desc: 'Formal & precise' },
  { id: 'Creative', label: 'Creative', desc: 'Vivid & imaginative' },
  { id: 'Detailed', label: 'Detailed', desc: 'Rich in context' },
  { id: 'Concise', label: 'Concise', desc: 'Short & sharp' },
  { id: 'GPT Optimized', label: 'GPT Optimized', desc: 'Structured directives' },
];

export default function StyleSelector({ value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
        Optimization style
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {PROMPT_STYLES.map((style) => {
          const active = value === style.id;
          return (
            <button
              key={style.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(style.id)}
              className={`text-left rounded-xl border px-3 py-2.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                active
                  ? 'border-primary bg-primary/10 shadow-sm shadow-primary/20'
                  : 'border-card-border bg-bg-raised hover:border-slate-500'
              }`}
            >
              <div className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-300'}`}>
                {style.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{style.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
