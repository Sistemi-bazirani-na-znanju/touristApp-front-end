export class Vehicle {
  id: number;
  modelName: string;
  currentState: VehiclecurrentState;
  price: number;
  imageURL: string;

  constructor(id: number, modelName: string, currentState: VehiclecurrentState, price: number, imageURL: string) {
      this.id = id;
      this.modelName = modelName;
      this.currentState = currentState;
      this.price = price;
      this.imageURL = imageURL;
  }
  }
  export enum VehiclecurrentState {
    CLEAN = "CLEAN",
    DIRTY = "DIRTY",
    DAMAGED = "DAMAGED",
    NEEDS_MAINTENANCE = "NEEDS_MAINTENANCE",
    FULLY_FUNCTIONAL = "FULLY_FUNCTIONAL",
    IN_REPAIR = "IN_REPAIR",
    LOST = "LOST",
    STOLEN = "STOLEN",
    OTHER = "OTHER"
}
