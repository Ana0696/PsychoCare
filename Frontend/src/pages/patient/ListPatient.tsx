import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { showAlert } from '../../components/common/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { PatientListResponse } from '../../api/models/Patient';
import { getPatients } from '../../api/requests/Patient';

const PatientListPage: React.FC = () => {
  const [patients, setPatients] = useState<PatientListResponse[]>([]);
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

  React.useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        if (response.success === true) {
          setPatients(response.data!);
        } else if (response.message) {
          showAlert(response.message, 'error');
        } else {
          showAlert('Falha ao carregar a lista.', 'error');
        }
      } catch (error) {
        showAlert('Falha ao carregar a lista.', 'error');
      }
    };

    fetchPatients();
  }, []);

  const columns: Column<PatientListResponse>[] = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name',
      },
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
        Cell: ({ row }: { row: { original: PatientListResponse } }) => (
          <div className="flex items-center justify-center gap-1">
            {row.original.specialNeeds && <AccessibleIcon color="info" titleAccess="Necessidades Especiais" />}
          </div>
        ),
      },
      {
        Header: 'Ações',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => navigate(`/patient/${row.values.id}`)}
              className="icon-button text-blue-950"
              aria-label="Edit"
            >
              <VisibilityIcon />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Pacientes</h2>
          <p className="text-gray-600">Listagem de Pacientes.</p>
        </div>
        <div>
          <Button
            variant="contained"
            className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
            onClick={() => navigate(`/patient/create`)}
          >
            Novo paciente
          </Button>
        </div>
      </div>
      <CustomTable columns={columns} data={patients} />
    </div>
  );
};

export default PatientListPage;
