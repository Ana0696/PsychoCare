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
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { AppointmentResponse } from '../../api/models/Appointment';
import { RoomAppointmentResponse } from '../../api/models/Room';
import { editAppointmentStatus, getAppointments } from '../../api/requests/appointment';
import { getAppointmentRooms } from '../../api/requests/room';
import { showAlert } from '../../components/common/Alert';
import { useNavigate } from 'react-router-dom';
import CancelAppointmentModal from '../../components/appointment/CancelAppointmentModal';
import EditAppointmentModal from '../../components/appointment/EditAppointmentModal';
import { AppointmentStatus, AppointmentStatusNames, UserRole } from '../../models/Enums';
import NewSessionModal from '../../components/appointment/NewSessionModal';
import useAuth from '../../hooks/useAuth';
import NewAppointmentModal from '../../components/appointment/NewAppointmentModal';

const AppointmentStatusIcons: Record<AppointmentStatus, JSX.Element> = {
  [AppointmentStatus.Waiting]: <HourglassEmptyIcon fontSize="small" />,
  [AppointmentStatus.Confirmed]: <DoneOutlineIcon fontSize="small" />,
  [AppointmentStatus.BothAttended]: <DoneAllIcon fontSize="small" />,
  [AppointmentStatus.PatientOnlyAttended]: <PersonIcon fontSize="small" />,
  [AppointmentStatus.ProfessionalOnlyAttended]: <WorkIcon fontSize="small" />,
  [AppointmentStatus.NoneAttended]: <HighlightOffIcon fontSize="small" />,
};

const CalendarPage: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentResponse[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [modalData, setModalData] = useState<AppointmentResponse | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [sessionModalOpen, setSessionModalOpen] = useState<boolean>(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomAppointmentResponse[]>([]);
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handleCancelAppointment = () => {
    setCancelModalOpen(true);
  };

  const refreshAppointments = async () => {
    closeModal();
    const response = await getAppointments();
    if (response.success) {
      setAppointments(response.data!);
      setFilteredAppointments(response.data!);
    } else {
      showAlert('Erro ao recarregar agendamentos.', 'error');
    }
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleStatusChange = async (status: AppointmentStatus) => {
    if (!modalData?.id) return;

    try {
      const response = await editAppointmentStatus(modalData.id, { status });
      if (response.success) {
        showAlert('Status atualizado com sucesso!', 'success');
        setModalData({ ...modalData, status: status });
        refreshAppointments();
      } else {
        showAlert(response.message || 'Erro ao atualizar status.', 'error');
      }
    } catch (error) {
      showAlert('Erro ao atualizar status.', 'error');
    }
  };

  const openSessionModal = () => {
    setSessionModalOpen(true);
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

        <div className="flex gap-3 flex-col md:flex-row mb-4">
          <Button
            variant="contained"
            className="mt-4 lg:mt-0 bg-gradient-to-br from-slate-900 to-slate-700"
            onClick={() => setAppointmentModalOpen(true)}
          >
            Agendar
          </Button>
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
        </div>
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
                {user?.role && (user.role === UserRole.manager || user.role === UserRole.secretary) && (
                  <FormControl size="small" className="mt-3 w-full">
                    <Select
                      value={modalData.status ?? AppointmentStatus.Waiting}
                      onChange={(e) => handleStatusChange(Number(e.target.value) as AppointmentStatus)}
                      displayEmpty
                    >
                      {Object.entries(AppointmentStatusNames).map(([status, label]) => (
                        <MenuItem key={status} value={status}>
                          <Box display="flex" alignItems="center" gap={1}>
                            {AppointmentStatusIcons[Number(status) as AppointmentStatus]}
                            {label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                <Box mt={2} display="flex" gap={1} justifyContent="space-between" flexDirection={'row'}>
                  {modalData.id && (
                    <>
                      <div>
                        {user?.role && (user.role === UserRole.manager || user.role === UserRole.intern) && (
                          <Button
                            variant="outlined"
                            startIcon={<NoteAddIcon />}
                            size="small"
                            onClick={openSessionModal}
                          >
                            Acompanhamento
                          </Button>
                        )}
                      </div>
                      <div>
                        {(modalData.status === AppointmentStatus.Waiting ||
                          modalData.status === AppointmentStatus.Confirmed) && (
                          <>
                            <button className="icon-button text-yellow-800" onClick={openEditModal} aria-label="Editar">
                              <EditIcon />
                            </button>
                            <button
                              className="icon-button text-red-900"
                              onClick={handleCancelAppointment}
                              aria-label="Cancelar"
                            >
                              <HighlightOffIcon />
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Modal>
      )}

      {modalData?.id && (
        <CancelAppointmentModal
          open={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          appointmentId={modalData.id}
          onSubmitSuccess={refreshAppointments}
        />
      )}

      {modalData?.id && (
        <EditAppointmentModal
          open={editModalOpen}
          onClose={closeEditModal}
          onSubmitSuccess={refreshAppointments}
          appointmentId={modalData.id}
          initialStartDate={modalData.startDate}
          initialEndDate={modalData.endDate}
        />
      )}

      {modalData?.id && (
        <NewSessionModal
          open={sessionModalOpen}
          onClose={() => setSessionModalOpen(false)}
          appointmentId={modalData?.id!}
        />
      )}

      <NewAppointmentModal
        open={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        onSubmitSuccess={refreshAppointments}
      />
    </div>
  );
};

export default CalendarPage;
