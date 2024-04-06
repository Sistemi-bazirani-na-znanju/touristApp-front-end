export class Excursion {
    id: number;
    name: string;
    price: number;
    numberOfPeopleRegistered: number;
    type: ExcursionType;
    totalPrice: number;

    constructor(id: number, name: string, price: number, numberOfPeopleRegistered: number, type: ExcursionType, totalPrice: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.numberOfPeopleRegistered = numberOfPeopleRegistered;
        this.type = type;
        this.totalPrice = totalPrice;
    }
}

export enum ExcursionType {
    HISTORICAL = "HISTORICAL",
    CULTURAL = "CULTURAL",
    GASTRONOMIC = "GASTRONOMIC",
    SPORTS = "SPORTS",
    RELAXATION = "RELAXATION",
    DIVING = "DIVING",
    HIKING = "HIKING"
}

