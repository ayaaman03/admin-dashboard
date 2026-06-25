import { FaShoppingCart, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useFetch } from '../hooks/useFetch';
import { getDashboardData } from '../services/dashboardService';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import OrdersChart from '../components/dashboard/OrdersChart';
import Spinner from '../components/common/Spinner';
import ErrorBanner from '../components/common/ErrorBanner';
import { formatCurrency, formatNumber } from '../utils/helpers';

/**
 * DashboardPage — landing page after login.
 * Shows three headline stats plus two dynamic charts, all sourced from
 * the API (JSON Server) via dashboardService.
 */
function DashboardPage() {
  const { data, isLoading, error, refetch } = useFetch(getDashboardData);

  if (isLoading) return <Spinner message="Loading dashboard..." />;

  if (error) {
    return (
      <div>
        <ErrorBanner message={error} />
        <button className="btn btn-secondary" onClick={refetch}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your store's performance</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={<FaShoppingCart />}
          label="Total Orders"
          value={formatNumber(data.totalOrders)}
          variant="orders"
        />
        <StatCard
          icon={<FaUsers />}
          label="Total Users"
          value={formatNumber(data.totalUsers)}
          variant="users"
        />
        <StatCard
          icon={<FaDollarSign />}
          label="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          variant="revenue"
        />
      </div>

      <div className="charts-grid">
        <RevenueChart data={data.monthlyData} />
        <OrdersChart data={data.monthlyData} />
      </div>
    </div>
  );
}

export default DashboardPage;
