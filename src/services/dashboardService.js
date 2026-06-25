import apiClient from './apiClient';

/**
 * Dashboard service.
 * Aggregates data from multiple resources into the stats/charts the
 * Dashboard page needs. In a real backend this would likely be a single
 * "/stats" endpoint — here we compose it client-side from JSON Server data.
 */
export async function getDashboardData() {
  const [ordersRes, usersRes, productsRes] = await Promise.all([
    apiClient.get('/orders'),
    apiClient.get('/users'),
    apiClient.get('/products'),
  ]);

  const orders = ordersRes.data;
  const users = usersRes.data;
  const products = productsRes.data;

  const totalOrders = orders.reduce((sum, o) => sum + o.count, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.revenue, 0);
  const totalUsers = users.length;
  const totalProducts = products.length;

  return {
    totalOrders,
    totalUsers,
    totalRevenue,
    totalProducts,
    monthlyData: orders, // [{ month, count, revenue }]
  };
}
