import { Excursion } from './excursion.model';
import { Rating } from './rating.model';

export class Arrangement {
    id: number;
    name: string;
    type: ArrangementType;
    price: number;
    averageRating: number;
    excursions: Excursion[];
    ratings: Rating[];

    constructor(id: number, name: string, type: ArrangementType, price: number, averageRating: number, excursions: Excursion[], ratings: Rating[]) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.averageRating = averageRating;
        this.excursions = excursions;
        this.ratings = ratings;
    }
}

export enum ArrangementType {
    INDIVIDUAL = "INDIVIDUAL",
    FAMILY = "FAMILY",
    GROUP = "GROUP"
}
