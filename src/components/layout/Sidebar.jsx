import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaPlusCircle,
  FaUsers,
  FaStore,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/products', label: 'Products', icon: FaBoxOpen },
  { to: '/products/new', label: 'Add Product', icon: FaPlusCircle },
  { to: '/users', label: 'Users', icon: FaUsers },
];

/**
 * Sidebar — primary navigation.
 * On mobile/tablet it slides in/out (`open` class toggled by parent layout)
 * and is paired with a dimmed overlay to close on outside click.
 */
function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">
            <FaStore />
          </span>
          <span>Admin Dashboard</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }} onClick={logout}>
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </aside>

      {/* Dim overlay behind sidebar on mobile, closes sidebar on click */}
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
    </>
  );
}

export default Sidebar;
