export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  middleName: string;
  cash: number;
  role: UserRole;
}

export enum UserRole {
  ROLE_USER,
  ROLE_ADMIN
}
