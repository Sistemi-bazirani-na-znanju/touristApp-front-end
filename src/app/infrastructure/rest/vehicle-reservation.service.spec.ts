import { TestBed } from '@angular/core/testing';

import { VehicleReservationService } from './vehicle-reservation.service';

describe('VehicleReservationService', () => {
  let service: VehicleReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
