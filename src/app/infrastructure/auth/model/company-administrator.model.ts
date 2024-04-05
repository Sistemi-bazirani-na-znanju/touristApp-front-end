export interface CompanyAdministrator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  lastPasswordResetDate: Date;
  city: string;
  country: string;
  phoneNumber: string;
  workplace: string;
  companyName: string;
}
