/**
 * General-purpose utility/helper functions.
 * Keeping these pure and dependency-free makes them easy to unit test.
 */

/** Format a number as USD currency, e.g. 1234.5 -> "$1,234.50" */
export function formatCurrency(value) {
  const number = Number(value) || 0;
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

/** Format a number with thousands separators, e.g. 12345 -> "12,345" */
export function formatNumber(value) {
  return Number(value || 0).toLocaleString('en-US');
}

/** Format an ISO date string into a short readable date, e.g. "Jan 10, 2026" */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Basic email format validator */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Returns true if value is a finite number greater than 0 */
export function isPositiveNumber(value) {
  const n = Number(value);
  return value !== '' && !Number.isNaN(n) && Number.isFinite(n) && n > 0;
}

/** Convert a File object to a base64 data URL (used for local image preview/storage) */
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/** Clamp a number between min and max */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
