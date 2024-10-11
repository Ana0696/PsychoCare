import React, { useState } from 'react';
import { getUsers } from '../../api/user-management';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { showAlert } from '../../components/common/Alert';
import { UserListResponse } from '../../api/models/UserManagement';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();

        if (response.success === true) {
          setUsers(response.data);
        } else {
          showAlert(response.message, 'error');
        }
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">User List</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 flex justify-around">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate(`/users/edit/${user.id}`)}
                />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
