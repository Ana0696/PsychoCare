import { get } from '../api';
import { ApiResponse } from '../models/ApiResponse';
import { RoomResponse } from '../models/Room';

export const getRooms = async (): Promise<ApiResponse<RoomResponse[]>> => {
  return await get<RoomResponse[]>('/Room/list');
};
