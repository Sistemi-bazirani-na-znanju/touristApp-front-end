import { ExcursionType } from "../../rest/model/excursion.model";

export interface Registration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    destinations: string[];
    excursionTypes: ExcursionType[];
  }
  