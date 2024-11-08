import { get, post, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { CreatePatientRequest, PatientListResponse, PatientResponse } from '../models/Patient';

export const getPatientsScreening = async (): Promise<ApiResponse<PatientListResponse[]>> => {
  return await get<PatientListResponse[]>('/Patient/list/screening');
};

export const getPatients = async (): Promise<ApiResponse<PatientListResponse[]>> => {
  return await get<PatientListResponse[]>('/Patient/list');
};

export const registerPatient = async (data: CreatePatientRequest): Promise<ApiResponse> => {
  return await post<void, CreatePatientRequest>('/Patient/register', data);
};

export const getPatient = async (id: number): Promise<ApiResponse<PatientResponse>> => {
  return await get<PatientResponse>(`/Patient/${id}`);
};

export const putPatient = async (id: number, data: CreatePatientRequest): Promise<ApiResponse> => {
  return await put<void, CreatePatientRequest>(`/Patient/${id}`, data);
};
