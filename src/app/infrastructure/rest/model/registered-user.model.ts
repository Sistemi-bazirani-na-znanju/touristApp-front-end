export class RegisteredUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  destinations: string[];
  excursionTypes: string[];

  constructor() {
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.destinations = [];
    this.excursionTypes = [];
  }
}
  