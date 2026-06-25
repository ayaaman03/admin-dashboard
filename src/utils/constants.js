/** Centralized constants — avoids magic strings/numbers scattered through the app */

export const PRODUCT_STATUS = {
  AVAILABLE: 'Available',
  OUT_OF_STOCK: 'Out of Stock',
};

export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
};

export const PRODUCTS_PER_PAGE = 6;

export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $75', min: 25, max: 75 },
  { label: '$75 - $150', min: 75, max: 150 },
  { label: 'Over $150', min: 150, max: Infinity },
];

export const AUTH_STORAGE_KEY = 'admin_dashboard_auth';
export const THEME_STORAGE_KEY = 'admin_dashboard_theme';

/** Demo credentials for the bonus login page (fake auth, no real backend) */
export const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};
