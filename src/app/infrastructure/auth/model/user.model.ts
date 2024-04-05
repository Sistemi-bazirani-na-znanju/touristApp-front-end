export interface User {
  id: number;
  email: string;
  roles: Role[]; 
}
export interface Role {
  id: number;
  name: string;
}
