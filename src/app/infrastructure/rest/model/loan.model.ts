import { VehicleReservationUser } from "./vehicle-reservation-user.model";


export class Loan {
  id: number;
  user: VehicleReservationUser;
  numberOfInstallments: number;
  approved: boolean;
  startDate: Date;
  endDate: Date;
  amount: number;
  status: UserEmploymentStatus;
  employmentStartDate: Date | null;
  employmentEndDate: Date | null;

  constructor(
    id: number,
    user: VehicleReservationUser,
    numberOfInstallments: number,
    approved: boolean,
    startDate: Date,
    endDate: Date,
    amount: number,
    status: UserEmploymentStatus,
    employmentStartDate: Date| null,
    employmentEndDate: Date| null
  ) {
    this.id = id;
    this.user = user;
    this.numberOfInstallments = numberOfInstallments;
    this.approved = approved;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.status = status;
    this.employmentStartDate = employmentStartDate;
    this.employmentEndDate = employmentEndDate;
  }
  
}
export enum UserEmploymentStatus {
    UNEMPLOYED = "UNEMPLOYED",
    TEMPORARY_EMPLOYMENT = "TEMPORARY_EMPLOYMENT",
    PERMANENT_EMPLOYMENT = "PERMANENT_EMPLOYMENT"
  }
  
