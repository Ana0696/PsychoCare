import React from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { EditSessionRequest, SessionResponse } from '../../api/models/Patient';
import { putSession } from '../../api/requests/Patient';
import { showAlert } from '../common/Alert';

interface EditSessionModalProps {
  open: boolean;
  onClose: () => void;
  session: SessionResponse;
  onEditSuccess: () => void;
}

const sessionSchema = Yup.object().shape({
  evolution: Yup.string().required('A Evolução é obrigatória'),
  observation: Yup.string().nullable(),
});

const EditSessionModal: React.FC<EditSessionModalProps> = ({ open, onClose, session, onEditSuccess }) => {
  const initialValues = {
    evolution: session.evolution || '',
    observation: session.observation || '',
  };

  const handleSubmit = async (values: EditSessionRequest) => {
    try {
      const response = await putSession(session.id, values);
      if (response.success) {
        showAlert('Sessão atualizada com sucesso!', 'success');
        onEditSuccess();
        onClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch {
      showAlert('Erro ao atualizar a sessão.', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Sessão</h2>
        <Formik initialValues={initialValues} validationSchema={sessionSchema} onSubmit={handleSubmit}>
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

export default EditSessionModal;
