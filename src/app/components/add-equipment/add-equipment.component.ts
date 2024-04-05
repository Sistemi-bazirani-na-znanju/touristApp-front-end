import { Component, Inject, Input, OnInit } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { Router } from '@angular/router';
import { EquipmentRequest } from '../../infrastructure/rest/model/equipment-request.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { CompanyService } from '../../company/company.service';
import { User } from '../../infrastructure/auth/model/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'pd-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent implements OnInit {
  
  newEquipment?: EquipmentRequest;
  errors: any;
  companyId: number = -1;
  user: any;
  company: any;

  constructor(private service: EquipmentService,
              private router: Router,
              private authService: AuthService,
              private companyAdminService: CompanyAdminService,
              private companyService: CompanyService,
              private location: Location) {
    this.newEquipment = {
      companyId: -1,
      description: '',
      name: '',
      stockCount: 0,
      type: '',
    }
    this.errors = {
      name: "",
      description: "",
      type: ""
    };
    this
  }

  ngOnInit(): void {
    this.fetchCompany();
  }

  fetchCompany(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      let userId = user.id;

      this.companyAdminService.getById(userId).subscribe(registeredUser => {
        this.companyId = registeredUser.companyId;
        this.user = registeredUser;
        this.companyService.getById(registeredUser.companyId).subscribe(result => {
          this.company = result;
          this.companyId = result.id!;
          this.newEquipment!.companyId = this.companyId;
        })
      })
    });
  }

  saveChanges(): void {
    if(this.validate()) {
      this.service.addNewEquipment(this.newEquipment!).subscribe({
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

    if (this.newEquipment!.name === "") {
      this.errors.password = "Name is required.";
      isValid = false;
    }
    if (this.newEquipment!.description === "") {
      this.errors.password = "Description is required.";
      isValid = false;
    }
    if (this.newEquipment!.type === "") {
      this.errors.password = "Type is required.";
      isValid = false;
    }
    if (this.newEquipment!.stockCount < 0) {
      this.errors.count = "Stock count must be greater than 0.";
      isValid = false;
    }

    return isValid
  }

  resetErrors(): void {
    this.errors.name = "";
    this.errors.description = "";
    this.errors.type = "";
  };
}
