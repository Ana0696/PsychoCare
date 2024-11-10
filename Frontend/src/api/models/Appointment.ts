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
}
