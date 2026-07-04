import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useToast } from './hooks/useToast';
import ToastContainer from './components/common/ToastContainer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Spinner from './components/common/Spinner';
import LoginPage from './pages/LoginPage';

// Bonus feature: lazy-load every route page so the initial bundle stays
// small and each page's code is only fetched when the user navigates to it.
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const AddProductPage = lazy(() => import('./pages/AddProductPage'));
const EditProductPage = lazy(() => import('./pages/EditProductPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * App — top-level component.
 * Wraps everything in Auth + Theme providers, sets up React Router,
 * and hosts the global toast notification system (passed down to pages
 * via the `onToast` prop so any page can surface success/error messages).
 */
function App() {
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner message="Loading page..." />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route
                  path="products"
                  element={<ProductsPage onToast={showToast} />}
                />
                <Route
                  path="products/new"
                  element={<AddProductPage onToast={showToast} />}
                />
                <Route
                  path="products/edit/:id"
                  element={<EditProductPage onToast={showToast} />}
                />
                <Route
                  path="users"
                  element={<UsersPage onToast={showToast} />}
                />
              </Route>

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>

          <ToastContainer toasts={toasts} dismissToast={dismissToast} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
