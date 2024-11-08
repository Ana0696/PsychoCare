import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button, MenuItem, FormControlLabel, Switch } from '@mui/material';
import { CreatePatientRequest } from '../../api/models/Patient';
import { patientSchema } from '../../pages/patient/CreatePatient';
import MaskedInput from 'react-text-mask';
import { showAlert } from '../../components/common/Alert';
import { getTranslatedPatientGroup, PatientGroup } from '../../models/Enums';
import { putPatient } from '../../api/requests/Patient';

const PatientEditForm: React.FC<{ id: number; patient: CreatePatientRequest; onEditSuccess: () => void }> = ({
  id,
  patient,
  onEditSuccess,
}) => {
  const [isEditable, setIsEditable] = useState(false);

  const handleSubmit = async (values: CreatePatientRequest) => {
    try {
      if (!values.guardianBirthDate) {
        values.guardianBirthDate = undefined;
      }
      const response = await putPatient(id, values);
      if (response.success) {
        showAlert('Paciente atualizado com sucesso!', 'success');
        setIsEditable(false);
        onEditSuccess();
      } else {
        showAlert(response.message, 'error');
      }
    } catch {
      showAlert('Erro ao atualizar paciente.', 'error');
    }
  };

  return (
    <Formik initialValues={patient} validationSchema={patientSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form id="edit-patient-form" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label={
                <>
                  Nome <span className="text-red-500">*</span>
                </>
              }
              name="name"
              variant="outlined"
              fullWidth
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              disabled={!isEditable}
            />
            <TextField
              select
              label={
                <>
                  Grupo <span className="text-red-500">*</span>
                </>
              }
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
              disabled={!isEditable}
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
              label={
                <>
                  Data de Nascimento <span className="text-red-500">*</span>
                </>
              }
              name="birthDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={values.birthDate}
              onChange={handleChange}
              error={touched.birthDate && Boolean(errors.birthDate)}
              helperText={touched.birthDate && errors.birthDate}
              disabled={!isEditable}
            />
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              value={values.phoneNumber}
              onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
              render={(ref, props) => (
                <TextField
                  {...props}
                  inputRef={ref}
                  label={
                    <>
                      Telefone <span className="text-red-500">*</span>
                    </>
                  }
                  name="phoneNumber"
                  variant="outlined"
                  fullWidth
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
              label="Profissão"
              name="profession"
              variant="outlined"
              fullWidth
              value={values.profession}
              onChange={handleChange}
              error={touched.profession && Boolean(errors.profession)}
              helperText={touched.profession && errors.profession}
              disabled={!isEditable}
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
              disabled={!isEditable}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={values.specialNeeds}
                  onChange={(e) => setFieldValue('specialNeeds', e.target.checked)}
                  color="primary"
                  disabled={!isEditable}
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
              disabled={!isEditable}
            />
            <TextField
              label="Data de Nascimento"
              name="guardianBirthDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={values.guardianBirthDate}
              onChange={handleChange}
              error={touched.guardianBirthDate && Boolean(errors.guardianBirthDate)}
              helperText={touched.guardianBirthDate && errors.guardianBirthDate}
              disabled={!isEditable}
            />
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
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
                  disabled={!isEditable}
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
            variant="contained"
            fullWidth
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-700"
            onClick={() => {
              if (isEditable) {
                // Submete o formulário ao clicar em Salvar
                document
                  .getElementById('edit-patient-form')
                  ?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              } else {
                // Habilita os campos para edição
                setIsEditable(true);
              }
            }}
          >
            {isEditable ? 'Salvar' : 'Editar'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PatientEditForm;
