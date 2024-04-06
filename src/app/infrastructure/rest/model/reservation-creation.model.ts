import { Excursion } from './excursion.model';
import { Arrangement } from './arrangement.model';

export class ReservationCreation {
    numberOfPeople: number;
    totalPrice: number;
    arrangement:Arrangement;
    chosenExcursions: Excursion[];

    constructor(numberOfPeople: number, totalPrice:number, arrangement:Arrangement,chosenExcursions: Excursion[]) {
        this.numberOfPeople=numberOfPeople;
        this.totalPrice=totalPrice;
        this.arrangement=arrangement;
        this.chosenExcursions=chosenExcursions;
    }
}
