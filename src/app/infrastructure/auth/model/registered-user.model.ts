export interface RegisteredUser {
    id: number;
    active: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
    roles: Role[]; 
  }
  
  export interface Role {
    id: number;
    name: string;
  }
  