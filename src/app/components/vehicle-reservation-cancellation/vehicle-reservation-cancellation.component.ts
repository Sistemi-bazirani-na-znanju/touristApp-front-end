import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pd-vehicle-reservation-cancellation',
  templateUrl: './vehicle-reservation-cancellation.component.html',
  styleUrl: './vehicle-reservation-cancellation.component.css'
})
export class VehicleReservationCancellationComponent {

  reason: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(): void {
    this.submit.emit(this.reason);
  }


}
