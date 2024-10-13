import { UserRole } from './Enums';

export interface User {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}
