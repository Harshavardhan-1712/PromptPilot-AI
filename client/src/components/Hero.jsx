import React from 'react';

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center animate-fadeIn">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-card-border bg-card/60 text-xs text-slate-400 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Streaming live from your model of choice
      </div>
      <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.05]">
        Transform simple prompts
        <br />
        into <span className="text-primary">expert AI prompts</span>
      </h1>
      <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
        Write what you mean in plain language. PromptPilot rewrites it into a sharper,
        more effective prompt for ChatGPT, Claude, and Gemini — token by token, in real time.
      </p>
    </section>
  );
}
