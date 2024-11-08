import { PatientGroup } from '../../models/Enums';

export interface PatientListResponse {
  id: number;
  name: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  specialNeeds: boolean;
}

export interface CreatePatientRequest {
  name: string;
  group: PatientGroup;
  birthDate: string;
  phoneNumber: string;
  specialNeeds: boolean;
  email?: string;
  document?: string;
  gender?: string;
  observations?: string;
  profession?: string;
  guardianName?: string;
  guardianBirthDate?: string;
  guardianPhoneNumber?: string;
  guardianDocument?: string;
  guardianGender?: string;
}

export interface PatientResponse {
  id: number;
  name: string;
  group: PatientGroup;
  birthDate: string;
  phoneNumber: string;
  specialNeeds: boolean;
  email?: string;
  document?: string;
  gender?: string;
  observations?: string;
  profession?: string;
  guardianName?: string;
  guardianBirthDate?: string;
  guardianPhoneNumber?: string;
  guardianDocument?: string;
  guardianGender?: string;
  sessions: SessionResponse[];
  files: PatientFileResponse[];
}

export interface SessionResponse {
  id: number;
  professionalName: string;
  roomName: string;
  evolution?: string;
  observation?: string;
  date: string;
}

export interface PatientFileResponse {
  id: number;
  name: string;
  date: string;
}

export interface EditSessionRequest {
  evolution: string;
  observation?: string;
}
