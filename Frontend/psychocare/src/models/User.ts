export interface User {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  intern = 1,
  secretary,
  psychologist,
  supervisor,
}
