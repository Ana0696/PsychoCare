import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, TextField, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { showAlert } from '../../components/common/Alert';
import { CreateScreeningRequest } from '../../api/models/Screening';
import { PatientListResponse } from '../../api/models/Patient';
import MaskedInput from 'react-text-mask';
import { createScreening } from '../../api/requests/screening';
import { getPatientsScreening } from '../../api/requests/Patient';

const screeningSchema = Yup.object().shape({
  patientId: Yup.number().nullable(),
  name: Yup.string().required('Nome é obrigatório'),
  birthDate: Yup.date().required('Data de nascimento é obrigatória'),
  gender: Yup.string().nullable(),
  phoneNumber: Yup.string()
    .required('Campo obrigatório')
    .test('is-valid-phone', 'Telefone incompleto', (value) => !!value && value.replace(/\D/g, '').length === 11),
  email: Yup.string().email('Email inválido').nullable(),
  urgency: Yup.boolean().required('Campo obrigatório'),
  specialNeeds: Yup.boolean().required('Campo obrigatório'),
  observation: Yup.string().nullable(),
});

const NewScreeningModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}> = ({ open, onClose, onSubmitSuccess }) => {
  const [patients, setPatients] = useState<PatientListResponse[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientListResponse[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (values: CreateScreeningRequest) => {
    try {
      const data = {
        ...values,
        phoneNumber: values.phoneNumber.replace(/\D/g, ''),
      };
      const response = await createScreening(data);
      if (response.success) {
        showAlert('Triagem criada com sucesso!', 'success');
        onSubmitSuccess();
        onClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert('Erro ao criar triagem.', 'error');
    }
  };

  useEffect(() => {
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

    fetchPatients();
  }, []);

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
    // Preenche os campos com os dados do paciente selecionado
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

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar evento</h2>

        <Formik
          initialValues={{
            patientId: undefined,
            name: '',
            birthDate: '',
            gender: '',
            phoneNumber: '',
            email: '',
            urgency: false,
            specialNeeds: false,
            observation: '',
          }}
          validationSchema={screeningSchema}
          onSubmit={handleSubmit} // Submete diretamente do modal
        >
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
                  onBlur={() => setTimeout(() => setFilteredPatients([]), 200)} // Fecha o dropdown ao perder o foco, com atraso
                />

                {filteredPatients.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="border border-gray-300 rounded-md bg-white shadow-lg max-h-40 overflow-y-auto absolute z-10 mt-1 min-w-128"
                    style={{ top: '125px' }} // Posiciona o dropdown abaixo do campo de texto
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
                <Button variant="contained" color="inherit" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default NewScreeningModal;
