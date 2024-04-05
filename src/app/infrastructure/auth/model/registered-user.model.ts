export interface RegisteredUser {
    id: number;
    active: boolean;
    lastPasswordResetDate: Date;
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
    city: string;
    country: string;
    phoneNumber: string;
    workplace: string;
    companyName: string;
    roles: Role[]; 
    penaltyPoints: number; 
  }
  
  export interface Role {
    id: number;
    name: string;
  }
  