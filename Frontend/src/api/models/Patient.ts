export interface Patient {
  id: number;
  name: string;
  birthDate: string;
  gender?: string;
  phoneNumber: string;
  email?: string;
  specialNeeds: boolean;
}
