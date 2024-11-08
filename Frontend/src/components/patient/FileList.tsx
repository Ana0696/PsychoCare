import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Modal, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PatientFileResponse } from '../../api/models/Patient';
import { deleteFile, downloadFile } from '../../api/requests/Patient';
import { showAlert } from '../common/Alert';
import UploadFileModal from './UploadFileModal';
import { Add } from '@mui/icons-material';
import dayjs from 'dayjs';

interface FileListTabProps {
  files: PatientFileResponse[];
  patientId: number;
  onUpdateFile: () => void;
}

const FileListTab: React.FC<FileListTabProps> = ({ files, patientId, onUpdateFile }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null);

  const handleDeleteClick = (fileId: number) => {
    setSelectedFileId(fileId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedFileId !== null) {
      try {
        const response = await deleteFile(selectedFileId);
        if (response.success) {
          showAlert('Arquivo deletado com sucesso!', 'success');
          onUpdateFile();
        } else {
          showAlert(response.message, 'error');
        }
      } catch {
        showAlert('Erro ao deletar o arquivo.', 'error');
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      const blob = await downloadFile(fileId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      showAlert('Erro ao baixar o arquivo.', 'error');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Button
          variant="contained"
          className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <AddIcon /> Adicionar anexo
        </Button>
      </div>

      {files.map((file) => (
        <Card key={file.id} className="border border-gray-300">
          <CardContent className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Box>
              <Typography variant="h6" className="text-blue-800 font-semibold">
                {file.name}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Data de upload: {dayjs(file.date).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </Box>

            <Box className="flex gap-2">
              <IconButton onClick={() => handleDownload(file.id, file.name)} color="primary" title="Baixar">
                <DownloadIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteClick(file.id)} color="error" title="Deletar">
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
          <Typography variant="h6" className="text-center mb-4">
            Confirmar exclusão
          </Typography>
          <Typography variant="body2" className="mb-6">
            Tem certeza que deseja excluir este arquivo? Esta ação não poderá ser desfeita.
          </Typography>
          <br />
          <div className="flex justify-end gap-4">
            <Button onClick={() => setIsDeleteModalOpen(false)} variant="contained" color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} variant="contained" color="error">
              Deletar
            </Button>
          </div>
        </div>
      </Modal>

      <UploadFileModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        patientId={patientId}
        onUploadSuccess={onUpdateFile}
      />
    </div>
  );
};

export default FileListTab;
