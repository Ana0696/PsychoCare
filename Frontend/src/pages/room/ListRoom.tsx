import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { showAlert } from '../../components/common/Alert';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useNavigate } from 'react-router-dom';
import { RoomResponse } from '../../api/models/Room';
import { getRooms } from '../../api/requests/room';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessibleIcon from '@mui/icons-material/Accessible';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

const RoomListPage: React.FC = () => {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        if (response.success === true) {
          setRooms(response.data!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao carregar a lista. Por favor, verifique suas credenciais.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar a lista. Por favor, verifique suas credenciais.', 'error');
      }
    };

    fetchRooms();
  }, []);

  const columns: Column<RoomResponse>[] = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Atenção',
        Cell: ({ row }: { row: { original: RoomResponse } }) => (
          <div className="flex items-center justify-center gap-1">
            {row.original.allowGroupSession && <GroupsIcon color="info" titleAccess="Sessões em grupo" />}
            {row.original.specialNeeds && <AccessibleIcon color="info" titleAccess="Necessidades Especiais" />}
            {row.original.pediatric && <EscalatorWarningIcon color="info" titleAccess="Pediatria" />}
          </div>
        ),
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
              onClick={() => navigate(`/room/edit/${row.values.id}`)}
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
          <h2 className="text-xl font-bold">Salas</h2>
          <p className="text-gray-600">Salas de atendimento.</p>
        </div>
        <div>
          <Button
            variant="contained"
            className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
            onClick={() => navigate(`/room/create`)}
          >
            Nova sala
          </Button>
        </div>
      </div>
      <CustomTable columns={columns} data={rooms} />
    </div>
  );
};

export default RoomListPage;
