import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useFetch } from '../hooks/useFetch';
import { getUsers, updateUserRole } from '../services/userService';
import UsersTable from '../components/users/UsersTable';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import ErrorBanner from '../components/common/ErrorBanner';

/**
 * UsersPage — lists all users and lets an admin change a user's role
 * inline. Update is optimistic: the table updates immediately while the
 * request is in flight, and rolls back with a toast if it fails.
 */
function UsersPage({ onToast }) {
  const { data: users, isLoading, error, setData } = useFetch(getUsers);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  async function handleRoleChange(userId, newRole) {
    const previousUsers = users;
    const targetUser = users.find((u) => u.id === userId);

    setUpdatingUserId(userId);
    // Optimistically update the UI
    setData((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));

    try {
      await updateUserRole(userId, newRole);
      onToast(`${targetUser.name}'s role updated to ${newRole}.`, 'success');
    } catch (err) {
      // Roll back on failure
      setData(previousUsers);
      onToast(err.message || 'Failed to update role.', 'error');
    } finally {
      setUpdatingUserId(null);
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage user accounts and permissions</p>
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {isLoading ? (
        <Spinner message="Loading users..." />
      ) : !users?.length ? (
        <EmptyState icon={<FaUsers />} title="No users found" message="There are no registered users yet." />
      ) : (
        <UsersTable users={users} onRoleChange={handleRoleChange} updatingUserId={updatingUserId} />
      )}
    </div>
  );
}

export default UsersPage;
