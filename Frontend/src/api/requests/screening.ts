import { del, get, post, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import {
  CreateScreeningRequest,
  EditScreeningRequest,
  GetScreeningResponse,
  ScreeningListResponse,
} from '../models/Screening';

export const getScreenins = async (): Promise<ApiResponse<ScreeningListResponse[]>> => {
  return await get<ScreeningListResponse[]>('/Screening/list');
};

export const createScreening = async (data: CreateScreeningRequest): Promise<ApiResponse> => {
  return await post<void, CreateScreeningRequest>('/Screening/register', data);
};

export const getScreening = async (id: number): Promise<ApiResponse<GetScreeningResponse>> => {
  return await get<GetScreeningResponse>(`/Screening/${id}`);
};

export const putScreening = async (id: number, data: EditScreeningRequest): Promise<ApiResponse> => {
  return await put<void, EditScreeningRequest>(`/Screening/${id}`, data);
};

export const cancelScreening = async (id: number): Promise<ApiResponse> => {
  return await del<void>(`/Screening/${id}`);
};
