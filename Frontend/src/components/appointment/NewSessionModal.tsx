import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CreateSessionRequest } from '../../api/models/Appointment';
import { showAlert } from '../common/Alert';
import { getSessionByAppointmentId, registerSessionByAppointmentId } from '../../api/requests/appointment';

interface NewSessionModalProps {
  open: boolean;
  onClose: () => void;
  appointmentId: number;
}

const newSessionSchema = Yup.object().shape({
  evolution: Yup.string().required('A Evolução é obrigatória.'),
  observation: Yup.string().nullable(),
});

const NewSessionModal: React.FC<NewSessionModalProps> = ({ open, onClose, appointmentId }) => {
  const [initialValues, setInitialValues] = useState<CreateSessionRequest>({
    evolution: '',
    observation: '',
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSessionByAppointmentId(appointmentId);
        if (response.success && response.data) {
          setInitialValues({
            evolution: response.data.evolution || '',
            observation: response.data.observation || '',
          });
        } else {
          setInitialValues({ evolution: '', observation: '' });
        }
      } catch {
        showAlert('Erro ao carregar os dados de acompanhamento.', 'error');
        onClose();
      }
    };

    if (open) {
      fetchSession();
    }
  }, [appointmentId, onClose, open]);

  const handleSubmit = async (values: CreateSessionRequest) => {
    try {
      const response = await registerSessionByAppointmentId(appointmentId, values);
      if (response.success) {
        showAlert('Acompanhamento salvo com sucesso!', 'success');
        onClose();
      } else {
        showAlert(response.message || 'Erro ao salvar acompanhamento.', 'error');
      }
    } catch {
      showAlert('Erro ao salvar o acompanhamento.', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Acompanhamento</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={newSessionSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 gap-4">
                <TextField
                  label="Evolução"
                  name="evolution"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={values.evolution}
                  onChange={handleChange}
                  error={touched.evolution && Boolean(errors.evolution)}
                  helperText={touched.evolution && errors.evolution}
                />
                <TextField
                  label="Observação"
                  name="observation"
                  multiline
                  rows={4}
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

export default NewSessionModal;
