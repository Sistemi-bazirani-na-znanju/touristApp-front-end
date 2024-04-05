export class Coordinates {
  latitude: number;
  longitude: number;
  deliveryId: number;

  constructor(latitude: number, longitude: number, deliveryId: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.deliveryId = deliveryId;
  }
}
