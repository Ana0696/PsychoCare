import { get } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { ScreeningListResponse } from '../models/Screening';

export const getScreenins = async (): Promise<ApiResponse<ScreeningListResponse[]>> => {
  return await get<ScreeningListResponse[]>('/Screening/list');
};
