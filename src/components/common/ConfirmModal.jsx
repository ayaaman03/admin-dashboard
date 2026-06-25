import { FaExclamationTriangle } from 'react-icons/fa';
import Modal from './Modal';
import Button from './Button';

/**
 * ConfirmModal — specialized modal for destructive confirmations
 * (e.g. "Delete this product?"). Used before any delete action.
 */
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  isLoading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="modal-icon-danger">
        <FaExclamationTriangle />
      </div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{message}</p>
    </Modal>
  );
}

export default ConfirmModal;
