export class CompanyAdmin {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phoneNumber: string;
    workplace: string;
    companyName: string;
    companyId: number;
    firstLogin: boolean;
  
    constructor() {
      this.id = -1;
      this.email = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
      this.city = "";
      this.country = "";
      this.phoneNumber = "";
      this.workplace = "";
      this.companyName = "";
      this.companyId = -1;
      this.firstLogin = false;
    }
  }
