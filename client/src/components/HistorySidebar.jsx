import React from 'react';

function formatTime(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(ts).toLocaleDateString();
}

export default function HistorySidebar({ history, onSelect, onClear, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:relative top-0 right-0 h-screen lg:h-auto w-72 lg:w-80 shrink-0 z-50 lg:z-0
          bg-card lg:bg-transparent border-l lg:border-l-0 lg:border-none border-card-border
          transform transition-transform duration-300 lg:transform-none
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}
      >
        <div className="card lg:sticky lg:top-20 flex flex-col p-4 lg:m-4 h-full lg:h-[calc(100vh-6rem)] lg:rounded-2xl rounded-none lg:border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-sm text-white">Prompt History</h3>
            <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white" aria-label="Close history">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-slate-600 text-xs">No prompts yet. Your history will appear here.</p>
          ) : (
            <div className="flex-1 overflow-y-auto scroll-thin space-y-2 pr-1">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="w-full text-left rounded-lg bg-bg-raised hover:bg-white/5 border border-card-border
                    px-3 py-2.5 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-primary uppercase tracking-wide">
                      {item.style}
                    </span>
                    <span className="text-[10px] text-slate-600">{formatTime(item.timestamp)}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{item.prompt}</p>
                </button>
              ))}
            </div>
          )}

          {history.length > 0 && (
            <button
              onClick={onClear}
              className="btn-ghost text-xs mt-3 w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
            >
              Clear history
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
