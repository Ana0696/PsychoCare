import { get, post, put } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { CreateRoomRequest, RoomAppointmentResponse, RoomResponse } from '../models/Room';

export const getRooms = async (): Promise<ApiResponse<RoomResponse[]>> => {
  return await get<RoomResponse[]>('/Room/list');
};

export const getAppointmentRooms = async (): Promise<ApiResponse<RoomAppointmentResponse[]>> => {
  return await get<RoomAppointmentResponse[]>('/Room/list');
};

export const registerRoom = async (data: CreateRoomRequest): Promise<ApiResponse> => {
  return await post<void, CreateRoomRequest>('/Room/register', data);
};

export const getRoom = async (id: number): Promise<ApiResponse<RoomResponse>> => {
  return await get<RoomResponse>(`/Room/${id}`);
};

export const putRoom = async (id: number, data: CreateRoomRequest): Promise<ApiResponse> => {
  return await put<void, CreateRoomRequest>(`/Room/${id}`, data);
};
