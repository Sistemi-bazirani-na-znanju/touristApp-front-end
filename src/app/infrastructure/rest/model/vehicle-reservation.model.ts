import { VehicleReservationUser } from "./vehicle-reservation-user.model";
import { Vehicle } from "./vehicle.model";

export class VehicleReservation {
    id: number;
    vehicle : Vehicle;
    user : VehicleReservationUser;
    reservationTime : Date;
    scheduledPickupTime : Date;
    scheduledReturnTime : Date;
    status : ReservationStatus;
  
        constructor(id: number, vehicle: Vehicle, user: VehicleReservationUser, reservationTime : Date, scheduledPickupTime : Date, scheduledReturnTime : Date, status : ReservationStatus) {
            this.id = id;
            this.vehicle = vehicle;
            this.user = user;
            this.reservationTime = reservationTime;
            this.scheduledPickupTime = scheduledPickupTime;
            this.scheduledReturnTime = scheduledReturnTime;
            this.status = status
        }
    }
    
    export enum ReservationStatus {
        SCHEDULED = "SCHEDULED",
        CANCELLED = "CANCELLED",
        TAKEN = "TAKEN",
        RETURNED = "RETURNED"
    }