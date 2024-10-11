import { get } from './api';
import { ApiResponse } from './models/ApiResponse';
import { UserListResponse } from './models/UserManagement';

export const getUsers = async (): Promise<ApiResponse<UserListResponse[]>> => {
  return await get<UserListResponse[]>('/UserManagement/list');
};
