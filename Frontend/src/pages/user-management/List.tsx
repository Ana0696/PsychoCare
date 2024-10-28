import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { UserListResponse } from '../../api/models/UserManagement';
import { showAlert } from '../../components/common/Alert';
import { getUsers } from '../../api/user-management';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';
import { getTranslatedUserRole } from '../../models/Enums';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(1);
    const fetchUsers = async () => {
      console.log(2);
      try {
        const response = await getUsers();

        if (response.success === true) {
          setUsers(response.data!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao efetuar login. Por favor, verifique suas credenciais.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar usuários.', 'error');
      }
    };
    console.log(3);

    fetchUsers();
    console.log(4);
  }, []);

  const columns: Column<UserListResponse>[] = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Permissão',
        accessor: 'role',
        Cell: ({ row }) => <>{getTranslatedUserRole(row.values.role)}</>,
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Editar',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className="flex items-center justify-between">
            <EditNoteIcon
              className="text-teal-700"
              onClick={() => navigate(`/user-management/edit/${row.values.id}`)}
            />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-slate-200">
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Usuários do sistema</h2>
          <p className="text-gray-600">
            Uma lista de todos os usuários da sua conta, incluindo nome, cargo, e-mail e função.
          </p>
        </div>
        <Button
          variant="contained"
          className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
          onClick={() => navigate(`/user-management/create`)}
        >
          Novo usuário
        </Button>
      </div>
      <CustomTable columns={columns} data={users} />
    </div>
  );
};

export default UserListPage;
