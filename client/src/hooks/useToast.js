// hooks/useToast.js
import { useCallback, useState } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 2800);
  }, []);

  return { toast, showToast };
}
