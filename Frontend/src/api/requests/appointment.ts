import { del, get, post, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import {
  AppointmentResponse,
  CreateAppointmentRequest,
  CreateSessionRequest,
  EditAppointmentRequest,
  EditAppointmentStatusRequest,
} from '../models/Appointment';

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

export const getSessionByAppointmentId = async (id: number): Promise<ApiResponse<CreateSessionRequest>> => {
  return await get<CreateSessionRequest>(`/Appointment/${id}/session`);
};

export const registerSessionByAppointmentId = async (id: number, data: CreateSessionRequest): Promise<ApiResponse> => {
  return await post<void, CreateSessionRequest>(`/Appointment/${id}/session`, data);
};

export const registerAppointment = async (data: CreateAppointmentRequest): Promise<ApiResponse> => {
  return await post<void, CreateAppointmentRequest>(`/Appointment/register`, data);
};
