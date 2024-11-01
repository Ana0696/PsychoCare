export interface ScreeningListResponse {
  id: number;
  name: string;
  birthDate: string;
  phoneNumber: string;
  urgency: boolean;
  specialNeeds: boolean;
  contactDate: string;
}

export interface CreateScreeningRequest {
  patientId?: number;
  name: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  urgency: boolean;
  specialNeeds: boolean;
  observation?: string;
}

export interface GetScreeningResponse {
  id: number;
  patientId?: number;
  name: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  urgency: boolean;
  specialNeeds: boolean;
  observation?: string;
}

export interface EditScreeningRequest {
  patientId?: number;
  name: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  urgency: boolean;
  specialNeeds: boolean;
  observation?: string;
}
