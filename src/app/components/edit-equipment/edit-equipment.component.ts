import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'pd-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrl: './edit-equipment.component.css'
})
export class EditEquipmentComponent implements OnInit {
  equipmentId!: number;
  equipment?: Equipment;
  newEquipment: Equipment = new Equipment("", "", "", 0);
  errors: any;

  constructor(private service: EquipmentService, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.errors = {
      name: "",
      description: "",
      type: "",
      count: ""
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.equipmentId = params['id'];
      this.getEquipment();
    })
  }

  getEquipment() {
    this.service.getById(this.equipmentId).subscribe((result) => {
      this.equipment = result;
      const { ...newEq } = this.equipment;
      this.newEquipment = newEq;
      console.log(this.equipment.id);
    }) 
  }

  saveChanges(): void {
    if(this.validate()) {
      this.service.updateEquipment(this.equipmentId, this.newEquipment).subscribe({
        next: (result: Equipment) => {
          this.location.back();
        },
        error: (errData) => {
          console.log(errData);
        }
      })
    }
    
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors()

    if (this.newEquipment.name === "") {
      this.errors.name = "Name is required.";
      isValid = false;
    }
    if (this.newEquipment.description === "") {
      this.errors.description = "Description is required.";
      isValid = false;
    }
    if (this.newEquipment.type === "") {
      this.errors.type = "Type is required.";
      isValid = false;
    }
    if (this.newEquipment.stockCount < 0) {
      this.errors.count = "Stock count must be greater than 0.";
      isValid = false;
    }

    return isValid
  }

  resetErrors(): void {
    this.errors.name = "";
    this.errors.description = "";
    this.errors.type = "";
    this.errors.count = "";
  };
}
