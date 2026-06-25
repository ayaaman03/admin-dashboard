import Badge from '../common/Badge';
import Select from '../common/Select';
import { USER_ROLES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const ROLE_OPTIONS = [
  { value: USER_ROLES.ADMIN, label: 'Admin' },
  { value: USER_ROLES.USER, label: 'User' },
];

/**
 * UsersTable — lists all users with the ability to change role inline.
 * `onRoleChange(userId, newRole)` is called immediately on select change
 * (optimistic UI handled by the parent page).
 */
function UsersTable({ users, onRoleChange, updatingUserId }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Role</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <img src={user.avatar} alt={user.name} />
                  <span className="user-name">{user.name}</span>
                </div>
              </td>
              <td className="user-email">{user.email}</td>
              <td>{formatDate(user.joinedAt)}</td>
              <td>
                <Badge value={user.role} />
              </td>
              <td>
                <Select
                  options={ROLE_OPTIONS}
                  value={user.role}
                  disabled={updatingUserId === user.id}
                  onChange={(e) => onRoleChange(user.id, e.target.value)}
                  aria-label={`Change role for ${user.name}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
