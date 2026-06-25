import { FaInbox } from 'react-icons/fa';

/** Generic "no data" screen — shown when a list/table has zero items. */
function EmptyState({ icon, title = 'No data found', message, action }) {
  return (
    <div className="empty-state">
      {icon || <FaInbox />}
      <h4>{title}</h4>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
