export class Equipment{
    id?: number;
    name: string;
    description: string;
    type: string;
    stockCount: number;
    averageRating?:string;
    quantity = 1;


    constructor(name: string, description: string, type: string, stockCount: number) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.stockCount = stockCount;
        this.quantity = 1;
    }
}