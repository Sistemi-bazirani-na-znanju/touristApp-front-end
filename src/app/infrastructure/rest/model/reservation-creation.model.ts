import { Excursion } from './excursion.model';
import { Arrangement } from './arrangement.model';

export interface ReservationCreation {
    id: number,
    numberOfPeople: number;
    totalPrice: number;
    arrangementId: number;
    arrangementName: string,
    chosenExcursions: Excursion[];
}
