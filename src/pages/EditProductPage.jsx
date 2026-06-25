import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { getProductById, updateProduct } from '../services/productService';
import ProductForm from '../components/products/ProductForm';
import Spinner from '../components/common/Spinner';
import ErrorBanner from '../components/common/ErrorBanner';

/** EditProductPage — fetches the product by id and pre-fills the shared ProductForm. */
function EditProductPage({ onToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetcher = useCallback(() => getProductById(id), [id]);
  const { data: product, isLoading, error } = useFetch(fetcher, [id]);

  async function handleSubmit(values) {
    setIsSubmitting(true);
    try {
      await updateProduct(id, values);
      onToast(`"${values.name}" was updated successfully.`, 'success');
      navigate('/products');
    } catch (err) {
      onToast(err.message || 'Failed to update product.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Edit Product</h1>
          <p>Update the details of this product</p>
        </div>
      </div>

      {isLoading && <Spinner message="Loading product..." />}
      {error && <ErrorBanner message={error} />}
      {!isLoading && product && (
        <ProductForm
          initialValues={product}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Save Changes"
        />
      )}
    </div>
  );
}

export default EditProductPage;
