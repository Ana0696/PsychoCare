import { del, get, getFile, post, postFile, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { CreatePatientRequest, EditSessionRequest, PatientListResponse, PatientResponse } from '../models/Patient';

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

export const putSession = async (id: number, data: EditSessionRequest): Promise<ApiResponse> => {
  return await put<void, EditSessionRequest>(`/Patient/session/${id}`, data);
};

export const deleteFile = async (id: number): Promise<ApiResponse> => {
  return await del<void>(`/Patient/file/${id}`);
};

export const uploadFile = async (id: number, file: File): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return await postFile<void, FormData>(`/Patient/${id}/file`, formData);
};

export const downloadFile = async (fileId: number): Promise<Blob> => {
  try {
    const response = await getFile<Blob>(`/Patient/file/${fileId}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    throw new Error('Erro ao baixar o arquivo.');
  }
};
