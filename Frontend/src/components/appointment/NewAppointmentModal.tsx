import React, { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  FormControlLabel,
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { showAlert } from '../../components/common/Alert';
import { getPatientsScreening } from '../../api/requests/Patient';
import { getRooms } from '../../api/requests/room';
import MaskedInput from 'react-text-mask';
import { PatientListResponse } from '../../api/models/Patient';
import { RoomResponse } from '../../api/models/Room';
import { CreateAppointmentRequest } from '../../api/models/Appointment';
import { registerAppointment } from '../../api/requests/appointment';
import { PatientGroup, getTranslatedPatientGroup } from '../../models/Enums';
import { GetScreeningResponse } from '../../api/models/Screening';

const appointmentSchema = Yup.object().shape({
  patientId: Yup.number().nullable(),
  patientName: Yup.string().when('patientId', (patientId, schema) =>
    patientId == null ? schema.required('Nome do paciente é obrigatório') : schema.nullable(),
  ),
  patientBirthDate: Yup.date()
    .nullable()
    .when('patientId', (patientId, schema) =>
      patientId == null ? schema.required('Data de nascimento é obrigatória') : schema.nullable(),
    ),
  patientPhoneNumber: Yup.string()
    .nullable()
    .when('patientId', (patientId, schema) =>
      patientId == null
        ? schema
            .required('Telefone é obrigatório')
            .test('is-valid-phone', 'Telefone incompleto', (value) => !!value && value.replace(/\D/g, '').length === 11)
        : schema.nullable(),
    ),
  patientGroup: Yup.number().required('Grupo de paciente é obrigatório'),
  roomId: Yup.number().required('Sala é obrigatória'),
  date: Yup.date().required('Data é obrigatória'),
  startTime: Yup.string().required('Hora inicial é obrigatória'),
  endTime: Yup.string().required('Hora final é obrigatória'),
  urgency: Yup.boolean().required('Urgência é obrigatória'),
  specialNeeds: Yup.boolean(),
});

const NewAppointmentModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  screeningData?: GetScreeningResponse | null;
}> = ({ open, onClose, onSubmitSuccess, screeningData }) => {
  const [patients, setPatients] = useState<PatientListResponse[]>([]);
  const [rooms, setRooms] = useState<RoomResponse[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<RoomResponse[]>([]);
  const [isNewPatient, setIsNewPatient] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatientsScreening();
        if (response.success) {
          setPatients(response.data!);
        } else {
          showAlert(response.message || 'Erro ao carregar pacientes', 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar pacientes', 'error');
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await getRooms();
        if (response.success) {
          setRooms(response.data!.filter((room) => room.isActive));
          setFilteredRooms(response.data!.filter((room) => room.isActive));
        } else {
          showAlert(response.message || 'Erro ao carregar salas', 'error');
        }
      } catch (error) {
        showAlert('Erro ao carregar salas', 'error');
      }
    };

    fetchPatients();
    fetchRooms();
  }, []);

  useEffect(() => {
    if (screeningData) {
      setIsNewPatient(!screeningData.patientId);
    }
  }, [screeningData]);

  const handlePatientToggle = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setIsNewPatient(newSelection === 'new');
    }
  };

  const filterRooms = (specialNeeds: boolean) => {
    const validRooms = rooms.filter((room) => {
      return !specialNeeds || room.specialNeeds;
    });
    setFilteredRooms(validRooms);
  };

  const handleSpecialNeedsChange = (setFieldValue: any, value: boolean) => {
    setFieldValue('specialNeeds', value);
    filterRooms(value);
    setFieldValue('roomId', null);
  };

  const handlePatientSelection = (selectedPatient: PatientListResponse | null, setFieldValue: any) => {
    if (selectedPatient) {
      setFieldValue('patientId', selectedPatient.id);
      setFieldValue('specialNeeds', selectedPatient.specialNeeds);
      filterRooms(selectedPatient.specialNeeds);
    } else {
      setFieldValue('patientId', null);
      setFieldValue('specialNeeds', false);
      filterRooms(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        patientPhoneNumber: values.patientPhoneNumber.replace(/\D/g, ''), // Remove os caracteres não numéricos
        startDate: `${values.date}T${values.startTime}`,
        endDate: `${values.date}T${values.endTime}`,
      };

      const appointmentData: CreateAppointmentRequest = {
        roomId: formattedValues.roomId,
        startDate: formattedValues.startDate,
        endDate: formattedValues.endDate,
        specialNeeds: formattedValues.specialNeeds,
        urgency: formattedValues.urgency,
        patientId: formattedValues.patientId || undefined,
        patientName: isNewPatient ? formattedValues.patientName : undefined,
        patientGroup: isNewPatient ? formattedValues.patientGroup : undefined,
        patientBirthDate: isNewPatient ? formattedValues.patientBirthDate : undefined,
        patientPhoneNumber: isNewPatient ? formattedValues.patientPhoneNumber : undefined,
        screeningId: screeningData?.id || undefined,
      };

      const response = await registerAppointment(appointmentData);
      if (response.success) {
        showAlert('Agendamento criado com sucesso!', 'success');
        onSubmitSuccess();
        onClose();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert('Erro ao criar agendamento', 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} className="flex items-center justify-center">
      <Box className="bg-white p-4 rounded-md shadow-md w-full max-w-lg">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Novo Agendamento
        </Typography>
        <Formik
          initialValues={{
            patientId: screeningData?.patientId || null,
            patientName: screeningData?.patientId != null ? '' : screeningData?.name || '',
            patientBirthDate: screeningData?.patientId != null ? '' : screeningData?.birthDate.split('T')[0] || '',
            patientPhoneNumber: screeningData?.patientId != null ? '' : screeningData?.phoneNumber || '',
            patientGroup: PatientGroup.Adult,
            roomId: '',
            date: '',
            startTime: '',
            endTime: '',
            urgency: screeningData?.urgency || false,
            specialNeeds: screeningData?.specialNeeds || false,
          }}
          validationSchema={appointmentSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, touched, errors }) => (
            <Form>
              <Box mb={1}>
                <Typography variant="subtitle1" gutterBottom>
                  Paciente
                </Typography>
                <ToggleButtonGroup
                  value={isNewPatient ? 'new' : 'existing'}
                  exclusive
                  onChange={handlePatientToggle}
                  fullWidth
                  size="small"
                >
                  <ToggleButton value="existing">Selecionar Paciente</ToggleButton>
                  <ToggleButton value="new">Paciente Novo</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {!isNewPatient ? (
                <Autocomplete
                  options={patients}
                  getOptionLabel={(option) => option.name}
                  value={patients.find((p) => p.id === values.patientId) || null}
                  onChange={(event, newValue) => handlePatientSelection(newValue, setFieldValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Selecionar Paciente"
                      fullWidth
                      size="small"
                      margin="dense"
                      error={touched.patientId && Boolean(errors.patientId)}
                      helperText={touched.patientId && errors.patientId}
                    />
                  )}
                />
              ) : (
                <>
                  <TextField
                    label="Nome do Paciente"
                    name="patientName"
                    fullWidth
                    size="small"
                    margin="dense"
                    value={values.patientName}
                    onChange={handleChange}
                    error={touched.patientName && Boolean(errors.patientName)}
                    helperText={touched.patientName && errors.patientName}
                  />
                  <TextField
                    label="Data de Nascimento"
                    name="patientBirthDate"
                    type="date"
                    fullWidth
                    size="small"
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                    value={values.patientBirthDate}
                    onChange={handleChange}
                    error={touched.patientBirthDate && Boolean(errors.patientBirthDate)}
                    helperText={touched.patientBirthDate && errors.patientBirthDate}
                  />
                  <MaskedInput
                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    placeholder="(DDD) 00000-0000"
                    value={values.patientPhoneNumber}
                    onChange={(e) => setFieldValue('patientPhoneNumber', e.target.value)}
                    render={(ref, props) => (
                      <TextField
                        {...props}
                        inputRef={ref}
                        label="Telefone"
                        fullWidth
                        size="small"
                        margin="dense"
                        error={touched.patientPhoneNumber && Boolean(errors.patientPhoneNumber)}
                        helperText={touched.patientPhoneNumber && errors.patientPhoneNumber}
                      />
                    )}
                  />
                  <TextField
                    label="Grupo de Paciente"
                    name="patientGroup"
                    select
                    fullWidth
                    size="small"
                    margin="dense"
                    value={values.patientGroup}
                    onChange={(e) => setFieldValue('patientGroup', e.target.value)}
                    error={touched.patientGroup && Boolean(errors.patientGroup)}
                    helperText={touched.patientGroup && errors.patientGroup}
                  >
                    {Object.values(PatientGroup)
                      .filter((value) => typeof value === 'number')
                      .map((value) => (
                        <MenuItem key={value} value={value}>
                          {getTranslatedPatientGroup(value as PatientGroup)}
                        </MenuItem>
                      ))}
                  </TextField>
                </>
              )}

              <Divider className="my-2" />

              <Typography variant="subtitle1" gutterBottom>
                Agendamento
              </Typography>

              <TextField
                label="Data"
                name="date"
                type="date"
                fullWidth
                size="small"
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={values.date}
                onChange={handleChange}
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
              />
              <Box display="flex" gap={2} my={1}>
                <TextField
                  label="Hora Inicial"
                  name="startTime"
                  type="time"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={values.startTime}
                  onChange={handleChange}
                  error={touched.startTime && Boolean(errors.startTime)}
                  helperText={touched.startTime && errors.startTime}
                />
                <TextField
                  label="Hora Final"
                  name="endTime"
                  type="time"
                  fullWidth
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={values.endTime}
                  onChange={handleChange}
                  error={touched.endTime && Boolean(errors.endTime)}
                  helperText={touched.endTime && errors.endTime}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch checked={values.urgency} onChange={(e) => setFieldValue('urgency', e.target.checked)} />
                }
                label="Urgência"
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={values.specialNeeds}
                    onChange={(e) => handleSpecialNeedsChange(setFieldValue, e.target.checked)}
                  />
                }
                label="Necessidades Especiais"
              />

              <FormControl fullWidth size="small" margin="dense">
                <InputLabel>Sala</InputLabel>
                <Select
                  name="roomId"
                  value={values.roomId}
                  onChange={(e) => setFieldValue('roomId', e.target.value)}
                  error={touched.roomId && Boolean(errors.roomId)}
                >
                  {filteredRooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                <Button variant="outlined" onClick={onClose}>
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

export default NewAppointmentModal;
