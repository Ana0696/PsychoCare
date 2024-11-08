import React, { useState } from 'react';
import { SessionResponse } from '../../api/models/Patient';
import { Card, CardContent, Typography, IconButton, Collapse, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventIcon from '@mui/icons-material/Event';
import RoomIcon from '@mui/icons-material/Room';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';
import EditSessionModal from './EditSessionModal';

interface SessionTabProps {
  sessions: SessionResponse[];
  onUpdateSession: () => void;
}

const SessionTab: React.FC<SessionTabProps> = ({ sessions, onUpdateSession }) => {
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(null);
  const [selectedSession, setSelectedSession] = useState<SessionResponse | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleExpandClick = (sessionId: number) => {
    setExpandedSessionId(expandedSessionId === sessionId ? null : sessionId);
  };

  const handleEditClick = (session: SessionResponse) => {
    setSelectedSession(session);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <Card key={session.id} className="border border-gray-300">
          <CardContent className="flex flex-col space-y-2">
            <Box className="flex items-center justify-between">
              <Typography variant="h6" className="text-blue-900 font-bold">
                {new Date(session.date).toLocaleDateString('pt-BR')}
              </Typography>
              <Box className="flex space-x-2 items-center">
                <button
                  onClick={() => handleEditClick(session)}
                  className="icon-button text-yellow-800"
                  aria-label="Editar"
                >
                  <EditIcon />
                </button>
                <IconButton onClick={() => handleExpandClick(session.id)}>
                  {expandedSessionId === session.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            </Box>

            <Box className="flex items-center space-x-2 text-gray-700">
              <RoomIcon />
              <Typography variant="body2">{session.roomName}</Typography>
              <PersonIcon />
              <Typography variant="body2">{session.professionalName}</Typography>
              <EventIcon />
              <Typography variant="body2">
                {new Date(session.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </CardContent>

          <Collapse in={expandedSessionId === session.id} timeout="auto" unmountOnExit>
            <CardContent className="bg-gray-100">
              <Typography variant="subtitle1" className="font-bold text-black">
                Evolução
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                {session.evolution || 'Sem evolução registrada'}
              </Typography>
              <br />
              <Typography variant="subtitle1" className="font-bold">
                Observação
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                {session.observation || 'Sem observações registradas'}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}

      {selectedSession && (
        <EditSessionModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          session={selectedSession}
          onEditSuccess={onUpdateSession}
        />
      )}
    </div>
  );
};

export default SessionTab;
