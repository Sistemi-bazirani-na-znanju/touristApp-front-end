export class SystemAdmin {
    id?: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor() {
      this.id = -1;
      this.email = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
    }
  }
