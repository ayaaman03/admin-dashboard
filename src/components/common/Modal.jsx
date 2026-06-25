import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * Reusable Modal.
 * Renders nothing when `isOpen` is false. Closes on Escape key or
 * clicking the overlay (outside the modal box).
 */
function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div className={`modal-box ${size === 'lg' ? 'modal-lg' : ''}`}>
        {title && (
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <FaTimes />
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
