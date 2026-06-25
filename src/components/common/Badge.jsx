import { FaCheckCircle, FaTimesCircle, FaShieldAlt, FaUser } from 'react-icons/fa';
import { PRODUCT_STATUS, USER_ROLES } from '../../utils/constants';

const CONFIG = {
  [PRODUCT_STATUS.AVAILABLE]: { className: 'available', icon: FaCheckCircle },
  [PRODUCT_STATUS.OUT_OF_STOCK]: { className: 'out-of-stock', icon: FaTimesCircle },
  [USER_ROLES.ADMIN]: { className: 'admin', icon: FaShieldAlt },
  [USER_ROLES.USER]: { className: 'user', icon: FaUser },
};

/** Small pill-shaped status/role indicator, reused on Products & Users pages. */
function Badge({ value }) {
  const config = CONFIG[value] || { className: 'user', icon: FaUser };
  const Icon = config.icon;
  return (
    <span className={`badge ${config.className}`}>
      <Icon /> {value}
    </span>
  );
}

export default Badge;
