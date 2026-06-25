import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FaStore } from 'react-icons/fa';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { DEMO_CREDENTIALS } from '../utils/constants';

/**
 * LoginPage — bonus feature: basic authentication.
 * Uses the fake AuthContext (no real backend auth). On success, redirects
 * back to the page the user originally tried to visit (or "/").
 */
function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/';

  // Already logged in? Skip the login form entirely.
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    // Simulate a tiny network delay for realism
    setTimeout(() => {
      const result = login(email, password);
      setIsSubmitting(false);
      if (result.success) {
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message);
      }
    }, 400);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="sidebar-brand-icon">
            <FaStore />
          </span>
        </div>
        <h2>Welcome back</h2>
        <p className="subtitle">Sign in to manage your store</p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="form-error" style={{ marginBottom: 14 }}>{error}</p>}
          <Button type="submit" block isLoading={isSubmitting}>
            Sign In
          </Button>
        </form>

        {/* <div className="auth-hint">
          Demo credentials: <strong>{DEMO_CREDENTIALS.email}</strong> / <strong>{DEMO_CREDENTIALS.password}</strong>
        </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
