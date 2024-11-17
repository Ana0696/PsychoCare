export interface ReportRequest {
  activeOnly: boolean;
  underMySupervision: boolean;
}

export interface ReportResponse {
  id: number;
  internName: string;
  internPeriod?: string;
  supervisorName: string;
  completedAppointment: number;
  appointmentHours: string;
}
