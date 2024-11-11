import React, { useEffect } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { showAlert } from '../../components/common/Alert';
import { editAppointment } from '../../api/requests/appointment';

const appointmentSchema = Yup.object().shape({
  startDate: Yup.date().required('Data inicial é obrigatória'),
  startTime: Yup.string().required('Hora inicial é obrigatória'),
  endTime: Yup.string().required('Hora final é obrigatória'),
});

const EditAppointmentModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  appointmentId: number;
  initialStartDate: string;
  initialEndDate: string;
}> = ({ open, onClose, onSubmitSuccess, appointmentId, initialStartDate, initialEndDate }) => {
  const handleSubmit = async (values: any) => {
    try {
      const startDate = `${values.startDate}T${values.startTime}`;
      const endDate = `${values.startDate}T${values.endTime}`;
      const response = await editAppointment(appointmentId, { startDate, endDate });
      if (response.success) {
        showAlert('Agendamento atualizado com sucesso!', 'success');
        onSubmitSuccess();
        onClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert('Erro ao atualizar agendamento.', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <Box className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Agendamento</h2>
        <Formik
          initialValues={{
            startDate: initialStartDate.split('T')[0],
            startTime: initialStartDate.split('T')[1].slice(0, 5),
            endTime: initialEndDate.split('T')[1].slice(0, 5),
          }}
          validationSchema={appointmentSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <Box className="grid grid-cols-1 gap-4">
                <TextField
                  label="Data"
                  name="startDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={values.startDate}
                  onChange={handleChange}
                  error={touched.startDate && Boolean(errors.startDate)}
                  helperText={touched.startDate && errors.startDate}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <TextField
                    label="Hora Inicial"
                    name="startTime"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={values.startTime}
                    onChange={handleChange}
                    error={touched.startTime && Boolean(errors.startTime)}
                    helperText={touched.startTime && errors.startTime}
                  />
                  <TextField
                    label="Hora Final"
                    name="endTime"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={values.endTime}
                    onChange={handleChange}
                    error={touched.endTime && Boolean(errors.endTime)}
                    helperText={touched.endTime && errors.endTime}
                  />
                </div>
              </Box>

              <Box className="flex justify-end mt-6 gap-4">
                <Button variant="contained" color="inherit" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default EditAppointmentModal;
