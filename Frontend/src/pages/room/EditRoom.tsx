import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';
import * as Yup from 'yup';
import { getRoom, putRoom } from '../../api/requests/room';
import { showAlert } from '../../components/common/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateRoomRequest } from '../../api/models/Room';

interface RoomFormValues extends CreateRoomRequest {}

const roomSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  allowGroupSession: Yup.boolean(),
  specialNeeds: Yup.boolean(),
  pediatric: Yup.boolean(),
  isActive: Yup.boolean(),
});

const EditRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = parseInt(id ?? '', 0);
  const [initialValues, setInitialValues] = useState<RoomFormValues | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await getRoom(roomId);
        if (response.success) {
          setInitialValues(response.data!);
        } else {
          showAlert(response.message || 'Erro ao carregar a sala.', 'error');
          navigate('/room');
        }
      } catch {
        showAlert('Erro ao carregar a sala.', 'error');
        navigate('/room');
      }
    };
    fetchRoomData();
  }, []);

  const handleSubmit = async (values: RoomFormValues) => {
    try {
      const response = await putRoom(roomId, values);
      if (response.success) {
        showAlert('Sala editada com sucesso!', 'success');
        navigate('/room');
      } else {
        showAlert(response.message || 'Erro ao editar a sala.', 'error');
      }
    } catch {
      showAlert('Erro ao editar a sala.', 'error');
    }
  };

  if (!initialValues) {
    return <div>Carregando...</div>;
  }

  return (
    <Formik initialValues={initialValues} validationSchema={roomSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, errors, touched }) => (
        <Form className="p-8 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Edição de Sala</h2>

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
                  onChange={handleChange}
                  color="primary"
                />
              }
              label="Permitir Sessão em Grupo"
            />
            <FormControlLabel
              control={
                <Switch name="specialNeeds" checked={values.specialNeeds} onChange={handleChange} color="primary" />
              }
              label="Necessidades Especiais"
            />
            <FormControlLabel
              control={<Switch name="pediatric" checked={values.pediatric} onChange={handleChange} color="primary" />}
              label="Pediátrico"
            />
            <FormControlLabel
              control={<Switch name="isActive" checked={values.isActive} onChange={handleChange} color="primary" />}
              label="Sala Ativa"
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-6 bg-gradient-to-br from-slate-900 to-slate-700"
          >
            Salvar alterações
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditRoom;
