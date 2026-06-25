import apiClient from './apiClient';

/**
 * Products service.
 * Encapsulates every HTTP call related to products (full CRUD) so that
 * components never talk to axios/JSON Server directly.
 */
const RESOURCE = '/products';

export async function getProducts() {
  const { data } = await apiClient.get(RESOURCE);
  return data;
}

export async function getProductById(id) {
  const { data } = await apiClient.get(`${RESOURCE}/${id}`);
  return data;
}

export async function createProduct(product) {
  const payload = { ...product, createdAt: new Date().toISOString() };
  const { data } = await apiClient.post(RESOURCE, payload);
  return data;
}

export async function updateProduct(id, product) {
  const { data } = await apiClient.put(`${RESOURCE}/${id}`, product);
  return data;
}

export async function deleteProduct(id) {
  await apiClient.delete(`${RESOURCE}/${id}`);
  return id;
}
