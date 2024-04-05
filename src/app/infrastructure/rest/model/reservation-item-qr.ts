import { Equipment } from "./equipment.model";

export interface ReservationItem {
    id: number;
    equipment: Equipment;
    quantity:number;
}
