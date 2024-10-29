import { get, post, put } from './api';
import { ApiResponse } from './models/ApiResponse';
import { CreateUserRequest, EditUserRequest, GetUserResponse, UserListResponse } from './models/UserManagement';

export const getUsers = async (): Promise<ApiResponse<UserListResponse[]>> => {
  return await get<UserListResponse[]>('/UserManagement/list');
};

export const registerUser = async (data: CreateUserRequest): Promise<ApiResponse> => {
  return await post<void, CreateUserRequest>('/UserManagement/register', data);
};

export const getUser = async (id: number): Promise<ApiResponse<GetUserResponse>> => {
  return await get<GetUserResponse>(`/UserManagement/${id}`);
};

export const putUser = async (id: number, data: EditUserRequest): Promise<ApiResponse> => {
  return await put<void, GetUserResponse>(`/UserManagement/${id}`, data);
};
