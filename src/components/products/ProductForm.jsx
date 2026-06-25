import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import ImageUpload from '../common/ImageUpload';
import { isPositiveNumber } from '../../utils/helpers';
import { PRODUCT_STATUS } from '../../utils/constants';

const STATUS_OPTIONS = [
  { value: PRODUCT_STATUS.AVAILABLE, label: 'Available' },
  { value: PRODUCT_STATUS.OUT_OF_STOCK, label: 'Out of Stock' },
];

const EMPTY_PRODUCT = {
  name: '',
  price: '',
  description: '',
  status: PRODUCT_STATUS.AVAILABLE,
  image: '',
};

/**
 * ProductForm — reusable form for both "Add Product" and "Edit Product" pages.
 * Validates on submit (and re-validates a field on change once it has an error,
 * so the user gets immediate feedback as they fix it).
 */
function ProductForm({ initialValues = EMPTY_PRODUCT, onSubmit, isSubmitting, submitLabel = 'Save Product' }) {
  const [values, setValues] = useState({ ...EMPTY_PRODUCT, ...initialValues });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate(fields) {
    const newErrors = {};

    if (!fields.name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (fields.price === '' || fields.price === null || fields.price === undefined) {
      newErrors.price = 'Price is required.';
    } else if (!isPositiveNumber(fields.price)) {
      newErrors.price = 'Price must be a valid number greater than 0.';
    }

    return newErrors;
  }

  function handleChange(field, value) {
    const updated = { ...values, [field]: value };
    setValues(updated);
    // Live re-validate only fields that already show an error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, ...validate(updated) }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...values,
      name: values.name.trim(),
      price: Number(values.price),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 640 }}>
      <Input
        label="Product Name"
        required
        name="name"
        placeholder="e.g. Wireless Bluetooth Headphones"
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
      />

      <div className="form-row">
        <Input
          label="Price"
          required
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          prefix="$"
          value={values.price}
          onChange={(e) => handleChange('price', e.target.value)}
          error={errors.price}
        />

        <Select
          label="Status"
          name="status"
          options={STATUS_OPTIONS}
          value={values.status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
      </div>

      <Textarea
        label="Description"
        name="description"
        placeholder="Briefly describe the product..."
        rows={4}
        value={values.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <ImageUpload value={values.image} onChange={(val) => handleChange('image', val)} />

      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => navigate('/products')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
