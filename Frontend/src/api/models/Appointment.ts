import { AppointmentStatus } from '../../models/Enums';

export interface AppointmentResponse {
  id?: number;
  patientId?: number;
  patientName?: string;
  roomId: number;
  roomName: string;
  userId?: number;
  userName?: string;
  startDate: string;
  endDate: string;
  specialNeeds?: boolean;
  urgency?: boolean;
  status?: AppointmentStatus;
}

export interface EditAppointmentRequest {
  startDate: string;
  endDate: string;
}

export interface EditAppointmentStatusRequest {
  status: AppointmentStatus;
}
