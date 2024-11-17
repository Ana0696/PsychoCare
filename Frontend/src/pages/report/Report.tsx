import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip, IconButton, InputBase } from '@mui/material';
import CustomTable from '../../components/common/CustomTable';
import { showAlert } from '../../components/common/Alert';
import { getReport } from '../../api/requests/report';
import { ReportResponse } from '../../api/models/Report';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from 'react-table';
import dayjs from 'dayjs';

const ReportPage: React.FC = () => {
  const [reportData, setReportData] = useState<ReportResponse[]>([]);
  const [filters, setFilters] = useState({ activeOnly: true, underMySupervision: true });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchReport = async () => {
    try {
      const response = await getReport(filters);
      if (response.success) {
        setReportData(response.data!);
      } else {
        showAlert(response.message || 'Erro ao carregar relatório.', 'error');
      }
    } catch (error) {
      showAlert('Erro ao carregar relatório. Tente novamente.', 'error');
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filters]);

  const handleFilterChange = (filterName: keyof typeof filters, value: boolean) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const formatHours = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return `${hours}h ${minutes}m`;
  };

  const filteredData = reportData.filter((item) => item.internName.toLowerCase().includes(searchTerm.toLowerCase()));

  const columns: Column<ReportResponse>[] = React.useMemo(
    () => [
      {
        Header: 'Estagiário',
        accessor: 'internName',
      },
      {
        Header: 'Período',
        accessor: 'internPeriod',
        Cell: ({ value }: { value: string | undefined }) => <>{value || 'N/A'}</>,
      },
      {
        Header: 'Orientador',
        accessor: 'supervisorName',
      },
      {
        Header: 'Atendimentos Realizados',
        accessor: 'completedAppointment',
      },
      {
        Header: 'Horas Validadas',
        accessor: 'appointmentHours',
        Cell: ({ value }: { value: string }) => <>{formatHours(value)}</>,
      },
    ],
    [],
  );

  return (
    <div className="p-6">
      <Paper elevation={3} className="p-6 mb-6 flex flex-col lg:flex-row justify-between text-center lg:text-left">
        <div>
          <Typography variant="h4" className="font-bold text-gray-700 mb-4">
            Relatório de Estagiários
          </Typography>
          <Typography variant="body1" className="text-gray-500">
            Utilize os filtros ao lado para ajustar os dados exibidos no relatório.
          </Typography>
        </div>
        <Box className="flex flex-wrap items-center text-center lg:text-left gap-2 mb-6">
          <Chip
            label="Ativos Apenas"
            onClick={() => handleFilterChange('activeOnly', !filters.activeOnly)}
            color={filters.activeOnly ? 'primary' : 'default'}
            variant="outlined"
            clickable
          />
          <Chip
            label="Sob Minha Supervisão"
            onClick={() => handleFilterChange('underMySupervision', !filters.underMySupervision)}
            color={filters.underMySupervision ? 'primary' : 'default'}
            variant="outlined"
            clickable
          />
        </Box>
      </Paper>

      <CustomTable columns={columns} data={filteredData} />
    </div>
  );
};

export default ReportPage;
