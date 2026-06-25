import { FaExclamationCircle } from 'react-icons/fa';

/** Inline error banner — used to surface API/network failures within a page. */
function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="error-banner">
      <FaExclamationCircle />
      <span>{message}</span>
    </div>
  );
}

export default ErrorBanner;
