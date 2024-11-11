import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  Button,
  SelectChangeEvent,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { AppointmentResponse } from '../../api/models/Appointment';
import { RoomAppointmentResponse } from '../../api/models/Room';
import { getAppointments } from '../../api/requests/appointment';
import { getAppointmentRooms } from '../../api/requests/room';
import { showAlert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentResponse[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [modalData, setModalData] = useState<AppointmentResponse | null>(null);
  const [rooms, setRooms] = useState<RoomAppointmentResponse[]>([]);
  const [status, setStatus] = useState<string>('Paciente presente');
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        if (response.success) {
          setAppointments(response.data!);
          setFilteredAppointments(response.data!);
        } else {
          showAlert(response.message || 'Erro ao carregar agendamentos.', 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar agendamentos.', 'error');
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await getAppointmentRooms();
        if (response.success) {
          setRooms(response.data!.filter((room) => room.isActive));
        } else {
          showAlert(response.message || 'Erro ao carregar salas.', 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar salas.', 'error');
      }
    };

    fetchAppointments();
    fetchRooms();

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobileView(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleRoomFilter = (event: SelectChangeEvent<string>) => {
    const roomId = event.target.value;
    setSelectedRoom(roomId);
    setFilteredAppointments(roomId ? appointments.filter((appt) => appt.roomId === Number(roomId)) : appointments);
  };

  const handleEventClick = (info: any) => {
    const appointment = filteredAppointments.find((appt) => appt.id === Number(info.event.id));
    if (appointment) {
      setModalData(appointment);
    } else {
      const blockedTime = filteredAppointments.find((appt) => appt.roomId === Number(info.event.extendedProps.roomId));
      if (blockedTime) setModalData(blockedTime);
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Box display="flex" justifyContent="space-between" alignItems="center" className="flex-col md:flex-row mb-4">
        <Typography
          variant={isMobileView ? 'h6' : 'h5'}
          fontWeight="bold"
          className="text-center sm:text-left mb-2 sm:mb-4"
        >
          Agendamentos
        </Typography>
        <FormControl variant="outlined" className="w-60">
          <Select value={selectedRoom} onChange={handleRoomFilter} displayEmpty size="small">
            <MenuItem value="">Todas as salas</MenuItem>
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id.toString()}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={isMobileView ? 'listWeek' : 'timeGridWeek'}
        headerToolbar={{
          left: 'prev,next today',
          center: isMobileView ? '' : 'title',
          right: isMobileView ? 'timeGridDay,listWeek' : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }}
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
          day: 'Dia',
          list: 'Lista',
        }}
        events={filteredAppointments.map((appt) => ({
          id: appt.id?.toString() || '',
          title: appt.id ? appt.patientName : 'Ocupado',
          start: appt.startDate,
          end: appt.endDate,
          backgroundColor: appt.id ? 'rgb(178, 206, 243)' : '#ceddf0',
          color: appt.id ? '#a5a5a5' : '#a5a5a5',
          textColor: '#000000',
          extendedProps: {
            roomId: appt.roomId,
          },
        }))}
        eventClick={handleEventClick}
        allDaySlot={false}
        height="75vh"
        locale="pt-br"
      />

      {modalData && (
        <Modal open={!!modalData} onClose={closeModal}>
          <Box
            className="p-4 bg-white rounded-lg shadow-lg"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '400px',
              minWidth: '300px',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold">
                {modalData.id ? (
                  <Link
                    onClick={() => navigate(`/patient/${modalData.patientId}`)}
                    underline="hover"
                    color="primary"
                    fontWeight="bold"
                    style={{ cursor: 'pointer' }}
                  >
                    {modalData.patientName}
                  </Link>
                ) : (
                  <Typography variant="h6" fontWeight="bold">
                    Ocupado
                  </Typography>
                )}
              </Typography>
              <Box display="flex" gap={1}>
                <IconButton size="small" onClick={closeModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body1">
              <strong>Data:</strong> {dayjs(modalData.startDate).locale('pt-br').format('DD/MM/YYYY (dddd)')} -{' '}
              {dayjs(modalData.startDate).format('HH:mm')} às {dayjs(modalData.endDate).format('HH:mm')}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Sala:</strong> {modalData.roomName}
            </Typography>
            {modalData.id && (
              <>
                <Box display="flex" gap={1} mb={1}>
                  {modalData.urgency && <Chip label="Urgência" color="error" size="small" />}
                  {modalData.specialNeeds && <Chip label="Necessidades Especiais" color="info" size="small" />}
                </Box>
                <FormControl size="small" className="mt-3 w-full">
                  <Select value={status} onChange={(e) => setStatus(e.target.value as string)} displayEmpty>
                    <MenuItem value="Paciente presente">
                      <ThumbUpIcon color="success" fontSize="small" /> Paciente presente
                    </MenuItem>
                    <MenuItem value="Paciente ausente">
                      <ThumbDownIcon color="warning" fontSize="small" /> Paciente ausente
                    </MenuItem>
                    <MenuItem value="Paciente cancelou">
                      <CancelIcon color="error" fontSize="small" /> Paciente cancelou
                    </MenuItem>
                    <MenuItem value="Profissional cancelou">
                      <CancelIcon color="error" fontSize="small" /> Profissional cancelou
                    </MenuItem>
                    <MenuItem value="Confirmar agendamento">
                      <CheckCircleIcon color="primary" fontSize="small" /> Confirmar agendamento
                    </MenuItem>
                    <MenuItem value="Desfazer">
                      <ReplayIcon fontSize="small" /> Desfazer
                    </MenuItem>
                  </Select>
                </FormControl>
                <Box mt={2} display="flex" gap={1} justifyContent="space-between">
                  <Button variant="outlined" startIcon={<NoteAddIcon />} size="small">
                    Acompanhamento
                  </Button>
                  {modalData.id && (
                    <div>
                      <button className="icon-button text-yellow-800" aria-label="Edit">
                        <EditIcon />
                      </button>
                      <IconButton size="small" color="error">
                        <HighlightOffIcon />
                      </IconButton>
                    </div>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
