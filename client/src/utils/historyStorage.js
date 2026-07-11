// utils/historyStorage.js
// Wraps browser Local Storage for prompt history persistence.

const STORAGE_KEY = 'promptpilot_history_v1';
const MAX_ENTRIES = 50;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry) {
  const history = loadHistory();
  const updated = [entry, ...history].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
