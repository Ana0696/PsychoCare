import React, { useState } from 'react';
import { Column } from 'react-table';
import { Button } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { showAlert } from '../../components/common/Alert';
import { ScreeningListResponse } from '../../api/models/Screening';
import { getScreenins } from '../../api/requests/screening';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccessibleIcon from '@mui/icons-material/Accessible';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewScreeningModal from '../../components/screening/NewScreeningModal';
import ScreeningDetailsModal from '../../components/screening/ScreeningDetailsModal';
import CancelScreeningModal from '../../components/screening/CancelScreeningModal';
import EditScreeningModal from '../../components/screening/EditScreeningModal';
import useAuth from '../../hooks/useAuth';
import { UserRole } from '../../models/Enums';

const ScreeningListPage: React.FC = () => {
  const [scrennings, setScrennings] = useState<ScreeningListResponse[]>([]);
  const [modalNewIsOpen, setModalNewIsOpen] = useState(false);
  const [selectedScreeningId, setSelectedScreeningId] = useState<number | null>(null);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const { user } = useAuth();

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

  const handleOpenModalNew = () => setModalNewIsOpen(true);
  const handleCloseModalNew = () => setModalNewIsOpen(false);

  const handleDetailsOpen = (id: number) => {
    setSelectedScreeningId(id);
    setDetailsModalOpen(true);
  };
  const handleDetailsClose = () => setDetailsModalOpen(false);

  const handleEditOpen = (id: number) => {
    setSelectedScreeningId(id);
    setEditModalOpen(true);
  };
  const handleEditClose = () => setEditModalOpen(false);

  const handleCancelOpen = (id: number) => {
    setSelectedScreeningId(id);
    setCancelModalOpen(true);
  };
  const handleCancelClose = () => setCancelModalOpen(false);

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

  React.useEffect(() => {
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
        Cell: ({ value }: { value: number }) => (
          <div className="flex items-center justify-center gap-1">
            <button onClick={() => handleDetailsOpen(value)} className="icon-button text-blue-950" aria-label="View">
              <VisibilityIcon />
            </button>
            {user?.role && (user.role === UserRole.manager || user.role === UserRole.secretary) && (
              <>
                <button onClick={() => handleEditOpen(value)} className="icon-button text-yellow-800" aria-label="Edit">
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleCancelOpen(value)}
                  className="icon-button text-red-900"
                  aria-label="Delete"
                >
                  <DeleteIcon />
                </button>
              </>
            )}
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
          <h2 className="text-xl font-bold">Triagem</h2>
          <p className="text-gray-600">Lista de triagem, ordenada pela Urgência e pela data de contato.</p>
        </div>
        <div>
          {user?.role && (user.role === UserRole.manager || user.role === UserRole.secretary) && (
            <Button
              variant="contained"
              className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
              onClick={handleOpenModalNew}
            >
              Nova triagem
            </Button>
          )}
        </div>
      </div>
      <CustomTable columns={columns} data={scrennings} />

      <NewScreeningModal open={modalNewIsOpen} onClose={handleCloseModalNew} onSubmitSuccess={fetchUsers} />
      <ScreeningDetailsModal
        open={isDetailsModalOpen}
        onClose={handleDetailsClose}
        screeningId={selectedScreeningId ?? 0}
      />
      <EditScreeningModal
        open={isEditModalOpen}
        onClose={handleEditClose}
        onSubmitSuccess={fetchUsers}
        screeningId={selectedScreeningId ?? 0}
      />
      <CancelScreeningModal
        open={isCancelModalOpen}
        onClose={handleCancelClose}
        onSubmitSuccess={fetchUsers}
        screeningId={selectedScreeningId ?? 0}
      />
    </div>
  );
};

export default ScreeningListPage;
