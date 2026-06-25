import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaBoxOpen } from 'react-icons/fa';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { getProducts, deleteProduct } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import Pagination from '../components/common/Pagination';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import ErrorBanner from '../components/common/ErrorBanner';
import ConfirmModal from '../components/common/ConfirmModal';
import Button from '../components/common/Button';
import { PRICE_RANGES, PRODUCTS_PER_PAGE } from '../utils/constants';

/**
 * ProductsPage — full CRUD listing UI:
 *  - search by name (debounced)
 *  - filter by status + price range
 *  - client-side pagination
 *  - delete with confirmation modal
 *
 * `onToast` is passed down from App so we can show success/error toasts
 * after destructive actions.
 */
function ProductsPage({ onToast }) {
  const { data: products, isLoading, error, setData } = useFetch(getProducts);

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState('all');
  const [priceRangeIndex, setPriceRangeIndex] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);

  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Apply search + filters client-side (JSON Server dataset is small enough),
  // then sort newest-first so a just-added product appears at the top
  // instead of wherever the API happened to insert it.
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const range = PRICE_RANGES[Number(priceRangeIndex)] || PRICE_RANGES[0];

    return products
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesStatus = status === 'all' || p.status === status;
        const matchesPrice = p.price >= range.min && p.price <= range.max;
        return matchesSearch && matchesStatus && matchesPrice;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [products, debouncedSearch, status, priceRangeIndex]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset to page 1 whenever filters change so the user isn't stranded on
  // a page that no longer has results.
  function updateFilter(setter) {
    return (value) => {
      setter(value);
      setCurrentPage(1);
    };
  }

  async function handleConfirmDelete() {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setData((prev) => prev.filter((p) => p.id !== productToDelete.id));
      onToast(`"${productToDelete.name}" was deleted.`, 'success');
      setProductToDelete(null);
    } catch (err) {
      onToast(err.message || 'Failed to delete product.', 'error');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your store's product catalog</p>
        </div>
        <Link to="/products/new">
          <Button>
            <FaPlus /> Add Product
          </Button>
        </Link>
      </div>

      {error && <ErrorBanner message={error} />}

      <ProductFilters
        search={search}
        onSearchChange={updateFilter(setSearch)}
        status={status}
        onStatusChange={updateFilter(setStatus)}
        priceRangeIndex={priceRangeIndex}
        onPriceRangeChange={updateFilter(setPriceRangeIndex)}
      />

      {isLoading ? (
        <Spinner message="Loading products..." />
      ) : filteredProducts.length === 0 ? (
        <EmptyState
          icon={<FaBoxOpen />}
          title="No products found"
          message={
            products?.length
              ? 'Try adjusting your search or filters.'
              : 'Get started by adding your first product.'
          }
          action={
            !products?.length && (
              <Link to="/products/new">
                <Button>
                  <FaPlus /> Add Product
                </Button>
              </Link>
            )
          }
        />
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onDeleteClick={setProductToDelete} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}

      <ConfirmModal
        isOpen={Boolean(productToDelete)}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete this product?"
        message={`This will permanently remove "${productToDelete?.name}" from your catalog. This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default ProductsPage;
