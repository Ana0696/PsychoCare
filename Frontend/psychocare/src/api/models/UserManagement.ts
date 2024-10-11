import { UserRole } from '../../models/User';

export interface UserListResponse {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}
