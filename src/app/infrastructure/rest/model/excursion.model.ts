export class Excursion {
    id: number;
    name: string;
    price: number;
    type: ExcursionType;

    constructor(id: number, name: string, price: number, type: ExcursionType) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
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

