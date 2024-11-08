import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography } from '@mui/material';
import { uploadFile } from '../../api/requests/Patient';
import { showAlert } from '../common/Alert';

interface UploadFileModalProps {
  open: boolean;
  onClose: () => void;
  patientId: number;
  onUploadSuccess: () => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ open, onClose, patientId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      showAlert('Por favor, selecione um arquivo para fazer o upload.', 'error');
      return;
    }

    try {
      const response = await uploadFile(patientId, selectedFile);
      if (response.success) {
        showAlert('Arquivo enviado com sucesso!', 'success');
        onUploadSuccess();
        onClose();
      } else {
        showAlert(response.message || 'Erro ao fazer upload do arquivo.', 'error');
      }
    } catch {
      showAlert('Erro ao fazer upload do arquivo.', 'error');
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedFile(null);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <Typography variant="h6" className="text-center mb-4">
          Enviar Arquivo
        </Typography>
        <div className="mb-4">
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Selecione um arquivo:
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {selectedFile ? selectedFile.name : 'Escolher arquivo'}
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="contained" color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!selectedFile}>
            Enviar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadFileModal;
