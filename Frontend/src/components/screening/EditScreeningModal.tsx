import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, TextField, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { showAlert } from '../../components/common/Alert';
import { getScreening, putScreening } from '../../api/requests/screening';
import { PatientListResponse } from '../../api/models/Patient';
import MaskedInput from 'react-text-mask';
import { EditScreeningRequest } from '../../api/models/Screening';
import { getPatientsScreening } from '../../api/requests/Patient';

const screeningSchema = Yup.object().shape({
  patientId: Yup.number().nullable(),
  name: Yup.string().required('Nome é obrigatório'),
  birthDate: Yup.date().required('Data de nascimento é obrigatória'),
  gender: Yup.string().nullable(),
  phoneNumber: Yup.string()
    .required('Telefone é obrigatório')
    .test('is-valid-phone', 'Telefone incompleto', (value) => !!value && value.replace(/\D/g, '').length === 11),
  email: Yup.string().email('Email inválido').nullable(),
  urgency: Yup.boolean().required('Campo obrigatório'),
  specialNeeds: Yup.boolean().required('Campo obrigatório'),
  observation: Yup.string().nullable(),
});

const EditScreeningModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  screeningId: number;
}> = ({ open, onClose, onSubmitSuccess, screeningId }) => {
  const [patients, setPatients] = useState<PatientListResponse[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientListResponse[]>([]);
  const [initialValues, setInitialValues] = useState<EditScreeningRequest | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchScreeningData = async () => {
      try {
        const response = await getScreening(screeningId);
        if (response.success) {
          const data: EditScreeningRequest = {
            ...response.data!,
            birthDate: response.data!.birthDate.split('T')[0],
          };
          setInitialValues(data);
        } else {
          showAlert(response.message, 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar detalhes da triagem.', 'error');
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await getPatientsScreening();
        if (response.success) {
          setPatients(response.data!);
        } else {
          showAlert(response.message, 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar pacientes.', 'error');
      }
    };

    if (open) {
      fetchScreeningData();
      fetchPatients();
    }
  }, [open, screeningId]);

  const handleNameChange = (name: string, setFieldValue: any) => {
    const filtered = patients.filter((p) => p.name.toLowerCase().includes(name.toLowerCase()));
    setFilteredPatients(filtered);

    setFieldValue('patientId', undefined);
    setFieldValue('name', name);
    setFieldValue('birthDate', '');
    setFieldValue('gender', '');
    setFieldValue('phoneNumber', '');
    setFieldValue('email', '');
    setFieldValue('specialNeeds', false);
  };

  const handlePatientSelect = (patient: PatientListResponse, setFieldValue: any) => {
    setFieldValue('patientId', patient.id);
    setFieldValue('name', patient.name);
    setFieldValue('birthDate', patient.birthDate.split('T')[0]);
    setFieldValue('gender', patient.gender || '');
    setFieldValue('phoneNumber', patient.phoneNumber);
    setFieldValue('email', patient.email || '');
    setFieldValue('specialNeeds', patient.specialNeeds);
    setFilteredPatients([]);
    showAlert('Paciente encontrado', 'success');
  };

  const handleSubmit = async (values: EditScreeningRequest) => {
    try {
      const data = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
      };
      const response = await putScreening(screeningId, data);
      if (response.success) {
        showAlert('Triagem atualizada com sucesso!', 'success');
        onSubmitSuccess();
        handleClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert('Erro ao atualizar triagem.', 'error');
    }
  };

  const handleClose = () => {
    setInitialValues(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Triagem</h2>
        {initialValues ? (
          <Formik initialValues={initialValues} validationSchema={screeningSchema} onSubmit={handleSubmit}>
            {({ values, handleChange, setFieldValue, errors, touched }) => (
              <Form>
                <Field type="hidden" name="patientId" />
                <div className="grid grid-cols-1 gap-4">
                  <TextField
                    label="Nome"
                    name="name"
                    variant="outlined"
                    fullWidth
                    value={values.name}
                    onChange={(e) => handleNameChange(e.target.value, setFieldValue)}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    onBlur={() => setTimeout(() => setFilteredPatients([]), 200)}
                  />

                  {filteredPatients.length > 0 && (
                    <div
                      ref={dropdownRef}
                      className="border border-gray-300 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto absolute z-10 mt-1 min-w-128"
                      style={{ top: '125px' }}
                    >
                      {filteredPatients.map((patient) => (
                        <MenuItem key={patient.id} onClick={() => handlePatientSelect(patient, setFieldValue)}>
                          {patient.name}
                        </MenuItem>
                      ))}
                    </div>
                  )}

                  <TextField
                    label="Data de Nascimento"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                    value={values.birthDate}
                    onChange={handleChange}
                    error={touched.birthDate && Boolean(errors.birthDate)}
                    helperText={touched.birthDate && errors.birthDate}
                  />

                  <TextField
                    label="Gênero"
                    name="gender"
                    select
                    fullWidth
                    variant="outlined"
                    value={values.gender}
                    onChange={handleChange}
                    error={touched.gender && Boolean(errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >
                    <MenuItem value="">Prefere não informar</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                    <MenuItem value="Agênero">Agênero</MenuItem>
                    <MenuItem value="Gênero Fluido">Gênero Fluido</MenuItem>
                    <MenuItem value="Não Binário">Não Binário</MenuItem>
                    <MenuItem value="Transgênero">Transgênero</MenuItem>
                    <MenuItem value="Outro">Outro</MenuItem>
                  </TextField>

                  <MaskedInput
                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    placeholder="(DDD) 00000-0000"
                    value={values.phoneNumber}
                    onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
                    render={(ref, props) => (
                      <TextField
                        {...props}
                        inputRef={ref}
                        label="Telefone"
                        name="phoneNumber"
                        variant="outlined"
                        fullWidth
                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    )}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.urgency}
                        onChange={(e) => setFieldValue('urgency', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Urgência"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.specialNeeds}
                        onChange={(e) => setFieldValue('specialNeeds', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Necessidades Especiais"
                  />

                  <TextField
                    label="Observação"
                    name="observation"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    value={values.observation}
                    onChange={handleChange}
                    error={touched.observation && Boolean(errors.observation)}
                    helperText={touched.observation && errors.observation}
                  />
                </div>

                <div className="flex justify-end mt-6 gap-4">
                  <Button variant="contained" color="inherit" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Salvar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </Modal>
  );
};

export default EditScreeningModal;
