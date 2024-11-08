import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { showAlert } from '../../components/common/Alert';
import { PatientResponse } from '../../api/models/Patient';
import { getPatient } from '../../api/requests/Patient';
import { useParams } from 'react-router-dom';
import PatientEditForm from '../../components/patient/PatientEditForm';

const ViewPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = parseInt(id ?? '', 0);
  const [tabIndex, setTabIndex] = useState(0);
  const [patientData, setPatientData] = useState<PatientResponse | null>(null);

  const fetchData = async () => {
    try {
      const response = await getPatient(patientId);
      if (response.success) {
        const formattedData = {
          ...response.data!,
          birthDate: response.data!.birthDate.split('T')[0],
          guardianBirthDate: response.data!.guardianBirthDate?.split('T')[0],
        };
        setPatientData(formattedData);
      } else {
        showAlert(response.message, 'error');
      }
    } catch {
      showAlert('Erro ao carregar dados do paciente.', 'error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const reloadData = () => {
    fetchData();
  };

  if (!patientData) return <div>Carregando...</div>;

  return (
    <Box className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Cadastro" />
        <Tab label="Sessão" />
        <Tab label="Arquivos" />
      </Tabs>
      <Box mt={4}>
        {tabIndex === 0 && <PatientEditForm id={patientId} patient={patientData} onEditSuccess={reloadData} />}
        {tabIndex === 1 && <div>A fazer</div>}
        {tabIndex === 2 && <div>A fazer</div>}
      </Box>
    </Box>
  );
};

export default ViewPatient;
