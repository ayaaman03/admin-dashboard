import { useCallback, useState } from 'react';

let idCounter = 0;

/**
 * useToast — lightweight toast/notification manager.
 * Returns the active toasts plus helpers to show/dismiss them.
 * Used to show success/error messages (e.g. "Product added successfully").
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success', duration = 3500) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      if (duration) {
        setTimeout(() => dismissToast(id), duration);
      }
      return id;
    },
    [dismissToast]
  );

  return { toasts, showToast, dismissToast };
}
