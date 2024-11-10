import { get } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { AppointmentResponse } from '../models/Appointment';

export const getAppointments = async (): Promise<ApiResponse<AppointmentResponse[]>> => {
  return await get<AppointmentResponse[]>('/Appointment/list');
};
