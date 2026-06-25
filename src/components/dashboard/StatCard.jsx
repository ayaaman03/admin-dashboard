/** Single statistic card (e.g. Total Orders) shown on the Dashboard page. */
function StatCard({ icon, label, value, variant }) {
  return (
    <div className="card stat-card">
      <span className={`stat-icon ${variant}`}>{icon}</span>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
