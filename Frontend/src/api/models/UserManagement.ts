import { DayOfWeek, UserRole } from '../../models/Enums';

export interface UserListResponse {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}

export interface CreateUserRequest {
  name: string;
  surname: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email: string;
  period?: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  scheduleBlocks: ScheduleBlock[];
}

export interface GetUserResponse {
  name: string;
  surname: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email: string;
  period?: string;
  role: UserRole;
  isActive: boolean;
  scheduleBlocks: ScheduleBlock[];
}

export interface EditUserRequest {
  name: string;
  surname: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email: string;
  period?: string;
  role: UserRole;
  isActive: boolean;
  scheduleBlocks: ScheduleBlock[];
}

export interface ScheduleBlock {
  startTime: string;
  endTime: string;
  weekDay: DayOfWeek;
  observation: string;
}
