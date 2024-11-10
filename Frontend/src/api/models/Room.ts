export interface RoomResponse {
  id: number;
  name: string;
  allowGroupSession: boolean;
  specialNeeds: boolean;
  pediatric: boolean;
  isActive: boolean;
}

export interface RoomAppointmentResponse {
  id: number;
  name: string;
  isActive?: boolean;
}

export interface CreateRoomRequest {
  name: string;
  allowGroupSession: boolean;
  specialNeeds: boolean;
  pediatric: boolean;
  isActive: boolean;
}
