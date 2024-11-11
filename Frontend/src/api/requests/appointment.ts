import { del, get, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { AppointmentResponse, EditAppointmentRequest, EditAppointmentStatusRequest } from '../models/Appointment';

export const getAppointments = async (): Promise<ApiResponse<AppointmentResponse[]>> => {
  return await get<AppointmentResponse[]>('/Appointment/list');
};

export const cancelAppointment = async (id: number): Promise<ApiResponse> => {
  return await del<void>(`/Appointment/${id}`);
};

export const editAppointment = async (id: number, data: EditAppointmentRequest): Promise<ApiResponse> => {
  return await put<void, EditAppointmentRequest>(`/Appointment/${id}`, data);
};

export const editAppointmentStatus = async (id: number, data: EditAppointmentStatusRequest): Promise<ApiResponse> => {
  return await put<void, EditAppointmentStatusRequest>(`/Appointment/${id}/status`, data);
};
