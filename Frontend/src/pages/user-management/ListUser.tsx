import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { UserListResponse } from '../../api/models/UserManagement';
import { showAlert } from '../../components/common/Alert';
import { getUsers } from '../../api/requests/user-management';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { getTranslatedUserRole } from '../../models/Enums';

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<UserListResponse[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.success === true) {
          setUsers(response.data!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao carregar a lista. Por favor, verifique suas credenciais.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar a lista. Por favor, verifique suas credenciais.', 'error');
      }
    };

    fetchUsers();
  }, []);

  const columns: Column<UserListResponse>[] = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'E-mail',
        accessor: 'email',
      },
      {
        Header: 'Permissão',
        accessor: 'role',
        Cell: ({ row }) => <>{getTranslatedUserRole(row.values.role)}</>,
      },
      {
        Header: 'Status',
        accessor: 'isActive',
        Cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            {row.values.isActive && <RadioButtonCheckedIcon className="text-green-700" titleAccess="Ativado" />}
            {!row.values.isActive && <RadioButtonUncheckedIcon className="text-red-700" titleAccess="Desativado" />}
          </div>
        ),
      },
      {
        Header: 'Editar',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => navigate(`/user-management/edit/${row.values.id}`)}
              className="icon-button text-yellow-800"
              aria-label="Edit"
            >
              <EditIcon />
            </button>
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
          <p className="text-gray-600">Uma lista de usuários.</p>
        </div>
        <div>
          <Button
            variant="contained"
            className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
            onClick={() => navigate(`/user-management/create`)}
          >
            Novo usuário
          </Button>
        </div>
      </div>
      <CustomTable columns={columns} data={users} />
    </div>
  );
};

export default UserListPage;
