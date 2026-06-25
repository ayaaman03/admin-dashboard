import { FaSearch } from 'react-icons/fa';
import Select from '../common/Select';
import { PRICE_RANGES, PRODUCT_STATUS } from '../../utils/constants';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: PRODUCT_STATUS.AVAILABLE, label: 'Available' },
  { value: PRODUCT_STATUS.OUT_OF_STOCK, label: 'Out of Stock' },
];

const PRICE_OPTIONS = PRICE_RANGES.map((range, idx) => ({
  value: String(idx),
  label: range.label,
}));

/**
 * ProductFilters — search box + status filter + price-range filter.
 * Fully controlled: parent (ProductsPage) owns all filter state.
 */
function ProductFilters({ search, onSearchChange, status, onStatusChange, priceRangeIndex, onPriceRangeChange }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          className="form-input"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <div className="filter-group">
        <Select
          options={STATUS_OPTIONS}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
        />
        <Select
          options={PRICE_OPTIONS}
          value={priceRangeIndex}
          onChange={(e) => onPriceRangeChange(e.target.value)}
          aria-label="Filter by price range"
        />
      </div>
    </div>
  );
}

export default ProductFilters;
