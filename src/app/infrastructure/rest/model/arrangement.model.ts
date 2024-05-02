import { dA } from '@fullcalendar/core/internal-common';
import { Excursion } from './excursion.model';
import { Rating } from './rating.model';

export class Arrangement {
    id: number;
    name: string;
    type: ArrangementType;
    price: number;
    averageRating: number;
    date: Date;
    excursions: Excursion[];
    ratings: Rating[];
    recommended?: boolean;



    constructor(id: number, name: string, type: ArrangementType, price: number, averageRating: number, date: Date, excursions: Excursion[], ratings: Rating[], recommended: boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.averageRating = averageRating;
        this.date = date;
        this.excursions = excursions;
        this.ratings = ratings;
        this.recommended = recommended
    }
}

export enum ArrangementType {
    INDIVIDUAL = "INDIVIDUAL",
    FAMILY = "FAMILY",
    GROUP = "GROUP"
}
