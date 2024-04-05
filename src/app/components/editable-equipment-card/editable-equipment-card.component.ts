import { Component, Input } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'pd-editable-equipment-card',
  templateUrl: './editable-equipment-card.component.html',
  styleUrl: './editable-equipment-card.component.css'
})
export class EditableEquipmentCardComponent {
  @Input() equipment!: Equipment;
  @Input() isAdded!: boolean;
  @Input() companyId!: number;

  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;

  constructor(private service: CompanyService) {
    
  }

  
}
