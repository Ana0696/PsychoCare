import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { showAlert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import { ScreeningListResponse } from '../../api/models/Screening';
import { getScreenins } from '../../api/requests/screening';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccessibleIcon from '@mui/icons-material/Accessible';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ScreeningListPage: React.FC = () => {
  const [scrennings, setScrennings] = useState<ScreeningListResponse[]>([]);
  const navigate = useNavigate();

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getScreenins();
        if (response.success === true) {
          setScrennings(response.data!);
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

  const columns: Column<ScreeningListResponse>[] = React.useMemo(
    () => [
      { Header: 'Nome', accessor: 'name' },
      {
        Header: 'Idade',
        accessor: 'birthDate',
        Cell: ({ value }: { value: string }) => <>{calculateAge(value)}</>,
      },
      {
        Header: 'Telefone',
        accessor: 'phoneNumber',
        Cell: ({ value }: { value: string }) => (
          <a
            href={`https://wa.me/${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1"
          >
            <WhatsAppIcon color="success" />
            {value}
          </a>
        ),
      },
      {
        Header: 'Atenção',
        Cell: ({ row }: { row: { original: ScreeningListResponse } }) => (
          <div className="flex items-center justify-center gap-1">
            {row.original.urgency && <ReportProblemIcon color="warning" titleAccess="Urgência" />}
            {row.original.specialNeeds && <AccessibleIcon color="info" titleAccess="Necessidades Especiais" />}
          </div>
        ),
      },
      {
        Header: 'Data de Contato',
        accessor: 'contactDate',
        Cell: ({ value }: { value: string }) => <>{formatDate(value)}</>,
      },
      {
        Header: 'Ações',
        accessor: 'id',
        Cell: () => (
          <div className="flex items-center justify-center gap-1">
            <button className="icon-button" aria-label="View">
              <VisibilityIcon />
            </button>
            <button className="icon-button" aria-label="Edit">
              <EditIcon />
            </button>
            <button className="icon-button" aria-label="Delete">
              <DeleteIcon />
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
          <h2 className="text-xl font-bold">Triagem</h2>
          <p className="text-gray-600">Lista de triagem, ordenada pela Urgência e pela data de contato.</p>
        </div>
        <Button
          variant="contained"
          className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
          onClick={() => navigate(`/user-management/create`)}
        >
          Nova triagem
        </Button>
      </div>
      <CustomTable columns={columns} data={scrennings} />
    </div>
  );
};

export default ScreeningListPage;
