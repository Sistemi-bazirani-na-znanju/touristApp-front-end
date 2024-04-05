import { Appointment } from "./appointmen.model";
import { RegisteredUser } from "./registered-user.model";

export interface Reservation {
    id: number;
    status: ReservationStatus;
    appointment: Appointment;
    registeredUserId: number;
    qrCode: string;   
}

export enum ReservationStatus {
    PENDING = 'PENDING',
    TAKEN = 'TAKEN',
    EXPIRED = 'EXPIRED'
  }