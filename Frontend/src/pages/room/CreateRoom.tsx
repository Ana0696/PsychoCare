import React from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, Checkbox, FormControlLabel, Switch } from '@mui/material';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerRoom } from '../../api/requests/room';
import { showAlert } from '../../components/common/Alert';
import { CreateRoomRequest } from '../../api/models/Room';

interface RoomFormValues extends CreateRoomRequest {}

const roomSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  allowGroupSession: Yup.boolean(),
  specialNeeds: Yup.boolean(),
  pediatric: Yup.boolean(),
  isActive: Yup.boolean(),
});

const RegisterRoom: React.FC = () => {
  const initialValues: RoomFormValues = {
    name: '',
    allowGroupSession: false,
    specialNeeds: false,
    pediatric: false,
    isActive: true,
  };
  const navigate = useNavigate();

  const handleSubmit = async (values: RoomFormValues) => {
    try {
      const response = await registerRoom(values);
      if (response.success) {
        showAlert('Sala cadastrada com sucesso!', 'success');
        navigate('/room');
      } else {
        showAlert(response.message || 'Erro ao cadastrar a sala.', 'error');
      }
    } catch (error) {
      showAlert('Erro ao cadastrar a sala.', 'error');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={roomSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, errors, touched }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Nova Sala</h2>

          <div className="grid grid-cols-1 gap-6">
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
            <FormControlLabel
              control={
                <Switch
                  name="allowGroupSession"
                  checked={values.allowGroupSession}
                  value={values.allowGroupSession}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Permitir Sessão em Grupo"
            />
            <FormControlLabel
              control={
                <Switch
                  name="specialNeeds"
                  checked={values.specialNeeds}
                  value={values.specialNeeds}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Necessidades Especiais"
            />
            <FormControlLabel
              control={
                <Switch
                  name="pediatric"
                  checked={values.pediatric}
                  value={values.pediatric}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Pediátrico"
            />
            <FormControlLabel
              control={
                <Switch
                  name="isActive"
                  checked={values.isActive}
                  value={values.isActive}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Sala Ativa"
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-700"
          >
            Criar nova sala
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterRoom;
