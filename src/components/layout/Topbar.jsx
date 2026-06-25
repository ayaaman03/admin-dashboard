import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const TITLES = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/products/new': 'Add Product',
  '/users': 'Users',
};

function pageTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith('/products/edit')) return 'Edit Product';
  return 'Admin Dashboard';
}

/** Topbar — shows current page title, dark mode toggle, and the signed-in user. */
function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { pathname } = useLocation();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          <FaBars />
        </button>
        <h2 className="topbar-title">{pageTitle(pathname)}</h2>
      </div>

      <div className="topbar-right">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        <div className="user-chip">
          <img src={`https://i.pravatar.cc/100?u=${user?.email}`} alt={user?.name} />
          <span className="user-chip-name">{user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
