import axios from 'axios';

/**
 * Central Axios instance.
 * Base URL comes from an environment variable so it's never hardcoded
 * and can change per environment (dev/staging/prod) without touching code.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Normalize errors into a predictable shape so UI code doesn't need to
// know about axios internals.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong while contacting the server.';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
