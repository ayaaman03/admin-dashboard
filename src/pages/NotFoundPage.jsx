import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/common/Button';

/** Catch-all 404 page for unmatched routes. */
function NotFoundPage() {
  return (
    <div className="empty-state" style={{ minHeight: '100vh' }}>
      <FaExclamationTriangle />
      <h4 style={{ fontSize: '1.4rem' }}>404 — Page Not Found</h4>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
