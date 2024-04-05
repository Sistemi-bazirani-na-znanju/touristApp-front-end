import { DatePipe } from "@angular/common";
import { CompanyAdministrator } from "../../infrastructure/auth/model/company-administrator.model";


export class Company{
    id?: number;
    name: string;
    address: string;
    city: string;
    country: string;
    openingTime: string;
    closingTime: string;
    description: string;
    averageRating: number;
    companyAdministrators?: CompanyAdministrator[]
    imageUrl?: string;

    constructor() {
        this.id = -1;
        this.name = "";
        this.address = "";
        this.city = "";
        this.country = "";
        this.openingTime = "";
        this.closingTime = "";
        this.description = "";
        this.averageRating = 0;
        this.imageUrl = "";
    }
}