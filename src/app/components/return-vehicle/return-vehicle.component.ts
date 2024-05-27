import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'pd-return-vehicle',
  templateUrl: './return-vehicle.component.html',
  styleUrl: './return-vehicle.component.css'
})
export class ReturnVehicleComponent {

  reason: string = '';

  @Output() cancelReturn = new EventEmitter<void>();
  @Output() submitReturn = new EventEmitter<string>();

  onCancel(): void {
    this.cancelReturn.emit();
  }

  onSubmit(): void {
    this.submitReturn.emit(this.reason);
  }

}
