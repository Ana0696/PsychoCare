import React from 'react';
import { Formik, FieldArray, Form } from 'formik';
import { Button, TextField, Checkbox, MenuItem, FormControlLabel, Switch } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/Alert';
import { registerPatient } from '../../api/requests/Patient';
import { CreatePatientRequest } from '../../api/models/Patient';
import { getTranslatedPatientGroup, PatientGroup } from '../../models/Enums';
import MaskedInput from 'react-text-mask';

export const patientSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  birthDate: Yup.date().required('Campo obrigatório'),
  phoneNumber: Yup.string()
    .required('Campo obrigatório')
    .test('is-valid-phone', 'Telefone incompleto', (value) => !!value && value.replace(/\D/g, '').length === 11),
  email: Yup.string().email('E-mail inválido').nullable(),
  document: Yup.string().nullable(),
  gender: Yup.string().nullable(),
  group: Yup.number().required('Campo obrigatório'),
  specialNeeds: Yup.boolean(),
  observations: Yup.string().nullable(),
  profession: Yup.string().nullable(),
  guardianName: Yup.string().nullable(),
  guardianBirthDate: Yup.date().nullable(),
  guardianPhoneNumber: Yup.string()
    .test('is-valid-phone', 'Telefone incompleto', (value) => !value || value.replace(/\D/g, '').length === 11)
    .nullable(),
  guardianDocument: Yup.string().nullable(),
  guardianGender: Yup.string().nullable(),
});

const CreatePatient: React.FC = () => {
  const initialValues: CreatePatientRequest = {
    name: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    document: '',
    gender: '',
    group: PatientGroup.Adult,
    specialNeeds: false,
    observations: '',
    profession: '',
    guardianName: '',
    guardianBirthDate: '',
    guardianPhoneNumber: '',
    guardianDocument: '',
    guardianGender: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: CreatePatientRequest) => {
    try {
      const response = await registerPatient(values);
      if (response.success) {
        showAlert('Paciente cadastrado com sucesso!', 'success');
        navigate('/patient-management');
      } else {
        showAlert(response.message || 'Erro ao cadastrar paciente.', 'error');
      }
    } catch (error) {
      showAlert('Erro ao cadastrar paciente.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={patientSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Novo Paciente</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              label="Data de Nascimento"
              name="birthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={values.birthDate}
              onChange={handleChange}
              error={touched.birthDate && Boolean(errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
            />
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
            <TextField
              label="Documento"
              name="document"
              variant="outlined"
              fullWidth
              value={values.document}
              onChange={handleChange}
              error={touched.document && Boolean(errors.document)}
              helperText={touched.document && errors.document}
            />
            <TextField
              select
              label="Gênero"
              name="gender"
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
            <TextField
              select
              label="Grupo"
              name="group"
              variant="outlined"
              fullWidth
              value={values.group}
              onChange={(e) => {
                const groupValue = parseInt(e.target.value, 10) as PatientGroup;
                setFieldValue('group', groupValue);
              }}
              error={touched.group && Boolean(errors.group)}
              helperText={touched.group && errors.group}
            >
              {Object.values(PatientGroup)
                .filter((value) => typeof value === 'number')
                .map((value) => (
                  <MenuItem key={value} value={value}>
                    {getTranslatedPatientGroup(value as PatientGroup)}
                  </MenuItem>
                ))}
            </TextField>
            <TextField
              label="Profissão"
              name="profession"
              variant="outlined"
              fullWidth
              value={values.profession}
              onChange={handleChange}
              error={touched.profession && Boolean(errors.profession)}
              helperText={touched.profession && errors.profession}
            />
            <TextField
              label="Observações"
              name="observations"
              variant="outlined"
              fullWidth
              multiline
              className="md:col-span-2"
              rows={4}
              value={values.observations}
              onChange={handleChange}
              error={touched.observations && Boolean(errors.observations)}
              helperText={touched.observations && errors.observations}
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
          </div>

          <h3 className="text-xl font-semibold mt-6">Dados do Responsável</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <TextField
              label="Nome"
              name="guardianName"
              variant="outlined"
              fullWidth
              value={values.guardianName}
              onChange={handleChange}
              error={touched.guardianName && Boolean(errors.guardianName)}
              helperText={touched.guardianName && errors.guardianName}
            />
            <TextField
              label="Data de Nascimento"
              name="guardianBirthDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={values.guardianBirthDate}
              onChange={handleChange}
              error={touched.guardianBirthDate && Boolean(errors.guardianBirthDate)}
              helperText={touched.guardianBirthDate && errors.guardianBirthDate}
            />
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              placeholder="(DDD) 00000-0000"
              value={values.guardianPhoneNumber}
              onChange={(e) => setFieldValue('guardianPhoneNumber', e.target.value)}
              render={(ref, props) => (
                <TextField
                  {...props}
                  inputRef={ref}
                  label="Telefone"
                  name="guardianPhoneNumber"
                  variant="outlined"
                  fullWidth
                  error={touched.guardianPhoneNumber && Boolean(errors.guardianPhoneNumber)}
                  helperText={touched.guardianPhoneNumber && errors.guardianPhoneNumber}
                />
              )}
            />
            <TextField
              label="Documento"
              name="guardianDocument"
              variant="outlined"
              fullWidth
              value={values.guardianDocument}
              onChange={handleChange}
              error={touched.guardianDocument && Boolean(errors.guardianDocument)}
              helperText={touched.guardianDocument && errors.guardianDocument}
            />
            <TextField
              select
              label="Gênero"
              name="guardianGender"
              fullWidth
              variant="outlined"
              value={values.guardianGender}
              onChange={handleChange}
              error={touched.guardianGender && Boolean(errors.guardianGender)}
              helperText={touched.guardianGender && errors.guardianGender}
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
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-700"
          >
            Criar novo paciente
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePatient;
