import { post } from './../api';
import { ApiResponse } from './../models/ApiResponse';
import { LoginRequest, LoginResponse } from './../models/Auth';

export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  return await post<LoginResponse, LoginRequest>('/Auth/login', data);
};
