import { Excursion } from './excursion.model';
import { Arrangement } from './arrangement.model';

export interface Reservation {
    id: number,
    numberOfPeople: number;
    userId: number,
    totalPrice: number;
    arrangementId: number;
    arrangementName: string,
    chosenExcursions: Excursion[];
}
