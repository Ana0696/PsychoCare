import React, { useEffect, useState } from 'react';
import { Modal, Button, TextField } from '@mui/material';
import { getScreening } from '../../api/requests/screening';
import { showAlert } from '../../components/common/Alert';
import { GetScreeningResponse } from '../../api/models/Screening';
import MaskedInput from 'react-text-mask';

const ScreeningDetailsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  screeningId: number;
}> = ({ open, onClose, screeningId }) => {
  const [screening, setScreening] = useState<GetScreeningResponse | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const fetchScreening = async () => {
      try {
        const response = await getScreening(screeningId);
        if (response.success) {
          setScreening(response.data!);
        } else {
          showAlert(response.message, 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar detalhes da triagem.', 'error');
      }
    };

    if (open) fetchScreening();
  }, [open, screeningId]);

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Detalhes da Triagem</h2>
        {screening ? (
          <div className="grid gap-4">
            <TextField label="Nome" value={screening.name} fullWidth disabled />
            <TextField label="Data de Nascimento" value={formatDate(screening.birthDate)} fullWidth disabled />
            <TextField label="Gênero" value={screening.gender || 'Não informado'} fullWidth disabled />
            <MaskedInput
              mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              value={screening.phoneNumber}
              readOnly
              render={(ref, props) => (
                <TextField {...props} inputRef={ref} label="Telefone" fullWidth variant="outlined" disabled />
              )}
            />
            <TextField label="Email" value={screening.email || 'Não informado'} fullWidth disabled />
            <TextField
              label="Necessidades Especiais"
              value={screening.specialNeeds ? 'Sim' : 'Não'}
              fullWidth
              disabled
            />
            <TextField label="Urgência" value={screening.urgency ? 'Sim' : 'Não'} fullWidth disabled />
            <TextField
              label="Observação"
              value={screening.observation || 'Sem observações'}
              fullWidth
              disabled
              multiline
              rows={3}
            />
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} variant="contained" color="primary">
            Fechar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ScreeningDetailsModal;
