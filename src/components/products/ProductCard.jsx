import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';

/** Single product card shown in the Products grid. */
function ProductCard({ product, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={product.image || 'https://placehold.co/400x300?text=No+Image'}
        alt={product.name}
        className="product-card-image"
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image';
        }}
      />
      <div className="product-card-body">
        <span className="product-card-name">{product.name}</span>
        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}
        <div className="product-card-footer">
          <span className="product-card-price">{formatCurrency(product.price)}</span>
          <Badge value={product.status} />
        </div>
      </div>
      <div className="product-card-actions">
        <Button variant="secondary" size="sm" onClick={() => navigate(`/products/edit/${product.id}`)}>
          <FaEdit /> Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDeleteClick(product)}>
          <FaTrash /> Delete
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
