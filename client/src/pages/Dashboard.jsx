import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import PromptInput from '../components/PromptInput.jsx';
import StyleSelector from '../components/StyleSelector.jsx';
import ImproveButton from '../components/ImproveButton.jsx';
import ResponseArea from '../components/ResponseArea.jsx';
import HistorySidebar from '../components/HistorySidebar.jsx';
import Toast from '../components/Toast.jsx';
import Footer from '../components/Footer.jsx';
import { useImprovePrompt } from '../hooks/useImprovePrompt.js';
import { useToast } from '../hooks/useToast.js';
import { loadHistory, clearHistory } from '../utils/historyStorage.js';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Professional');
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { output, isStreaming, error, run } = useImprovePrompt();
  const { toast, showToast } = useToast();

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!isStreaming && output) {
      setHistory(loadHistory());
    }
  }, [isStreaming, output]);

  const handleImprove = () => {
    if (!prompt.trim() || isStreaming) return;
    run(prompt.trim(), style);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      showToast('Copied to clipboard');
    } catch {
      showToast('Could not copy. Please copy manually.', 'error');
    }
  };

  const handleSelectHistory = (item) => {
    setPrompt(item.prompt);
    setStyle(item.style);
    setSidebarOpen(false);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
    showToast('History cleared');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggleHistory={() => setSidebarOpen((v) => !v)} />

      <div className="flex-1 flex">
        <main className="flex-1 min-w-0">
          <Hero />

          <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 space-y-5">
            <div className="card p-5 space-y-5">
              <PromptInput value={prompt} onChange={setPrompt} disabled={isStreaming} />
              <StyleSelector value={style} onChange={setStyle} disabled={isStreaming} />
              <div className="flex justify-end">
                <ImproveButton
                  onClick={handleImprove}
                  isStreaming={isStreaming}
                  disabled={isStreaming || !prompt.trim()}
                />
              </div>
            </div>

            <ResponseArea output={output} isStreaming={isStreaming} error={error} onCopy={handleCopy} />
          </section>
        </main>

        <HistorySidebar
          history={history}
          onSelect={handleSelectHistory}
          onClear={handleClearHistory}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      <Footer />
      <Toast toast={toast} />
    </div>
  );
}
