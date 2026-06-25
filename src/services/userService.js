import apiClient from './apiClient';

/**
 * Users service.
 * Handles fetching users and updating their role.
 */
const RESOURCE = '/users';

export async function getUsers() {
  const { data } = await apiClient.get(RESOURCE);
  return data;
}

export async function updateUserRole(id, role) {
  const { data } = await apiClient.patch(`${RESOURCE}/${id}`, { role });
  return data;
}
