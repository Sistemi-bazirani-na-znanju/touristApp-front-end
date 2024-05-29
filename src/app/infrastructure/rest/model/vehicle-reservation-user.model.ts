export class VehicleReservationUser {
    id : number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role : string;
    suspicious : boolean;
  
    constructor() {
        this.id = 0;
        this.email = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.role = "";
        this.suspicious = false;
    }
  }