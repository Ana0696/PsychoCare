import React from 'react';
import { Modal, Button } from '@mui/material';
import { showAlert } from '../../components/common/Alert';
import { cancelAppointment } from '../../api/requests/appointment';

const CancelAppointmentModal: React.FC<{
  open: boolean;
  onClose: () => void;
  appointmentId: number;
  onSubmitSuccess: () => void;
}> = ({ open, onClose, appointmentId, onSubmitSuccess }) => {
  const handleCancel = async () => {
    try {
      const response = await cancelAppointment(appointmentId);
      if (response.success) {
        showAlert('Agendamento cancelado com sucesso.', 'success');
        onSubmitSuccess();
        onClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert('Erro ao cancelar agendamento.', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Cancelar Agendamento</h2>
        <p>Tem certeza de que deseja cancelar este agendamento?</p>
        <div className="flex justify-end mt-4 gap-4">
          <Button onClick={onClose} variant="contained" color="inherit">
            Voltar
          </Button>
          <Button onClick={handleCancel} variant="contained" color="error">
            Confirmar Cancelamento
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelAppointmentModal;
