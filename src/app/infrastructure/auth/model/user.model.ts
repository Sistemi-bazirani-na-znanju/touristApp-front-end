export interface User {
  id: number;
  firstName : string;
  lastName : string;
  email: string;
  roles: Role[]; 
}
export interface Role {
  id: number;
  name: string;
}
