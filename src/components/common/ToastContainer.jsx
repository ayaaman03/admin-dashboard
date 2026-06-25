import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const ICONS = {
  success: FaCheckCircle,
  error: FaExclamationCircle,
  info: FaInfoCircle,
};

/**
 * ToastContainer — renders the floating stack of toast notifications.
 * Consumes the `toasts` array produced by the useToast hook.
 */
function ToastContainer({ toasts, dismissToast }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || FaInfoCircle;
        return (
          <div
            key={toast.id}
            className={`toast ${toast.type}`}
            onClick={() => dismissToast(toast.id)}
            role="status"
          >
            <Icon />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
