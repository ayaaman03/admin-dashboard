import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { createProduct } from '../services/productService';

/** AddProductPage — create a new product via the shared ProductForm. */
function AddProductPage({ onToast }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(values) {
    setIsSubmitting(true);
    try {
      await createProduct(values);
      onToast(`"${values.name}" was added successfully.`, 'success');
      navigate('/products');
    } catch (err) {
      onToast(err.message || 'Failed to add product.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Add Product</h1>
          <p>Create a new product in your catalog</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} submitLabel="Add Product" />
    </div>
  );
}

export default AddProductPage;
