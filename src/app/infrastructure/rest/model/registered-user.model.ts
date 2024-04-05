export class RegisteredUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phoneNumber: string;
  workplace: string;
  companyName: string;
  penaltyPoints: number; 

  constructor() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.city = "";
    this.country = "";
    this.phoneNumber = "";
    this.workplace = "";
    this.companyName = "";
    this.penaltyPoints = 0; 
  }
}
  