import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ArrangementService } from '../../infrastructure/rest/arrangements.service';
import { Arrangement, ArrangementType } from '../../infrastructure/rest/model/arrangement.model';
import { Excursion, ExcursionType } from '../../infrastructure/rest/model/excursion.model';
import { S } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'pd-arrangement-creation',
  templateUrl: './arrangement-creation.component.html',
  styleUrls: ['./arrangement-creation.component.css'],
})
export class ArrangementCreationComponent {
  arrangementId: number | null = null;
  excursions: Excursion[] = [];
  creationError: String = "";

  constructor(
    private authService: AuthService,
    private arrangementService: ArrangementService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.arrangementId = id ? parseInt(id, 10) : null;
      if (this.arrangementId !== null) {
      }
    });
  }

  arrangementCreationForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, this.numberValidator]),
      type: new FormControl('', [Validators.required]),
    }
  );

  excursionCreationForm = new FormGroup(
    {
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required, this.numberValidator]),
        type: new FormControl('', [Validators.required]),
    }
    );


  numberValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;

    // Check if the value is null or undefined
    if (value === null || value === undefined) {
      return { invalidNumber: { value } };
    }

    // Check if the value is a valid number
    const valid = !isNaN(parseFloat(value));
    return valid ? null : { invalidNumber: { value } };
  }

  createArrangement(): void {
    if (this.arrangementCreationForm.valid) {
      if (this.excursions.length === 0) {
        // Set creationError if there are no excursions
        this.creationError = "You need at least one excursion in the arrangement";
        this.cdRef.detectChanges(); // Manually trigger change detection
        return; // Exit the method
      }
      
      const price = this.convertPriceToNumber(this.arrangementCreationForm.value.price);
      const type = this.convertTypeToArrangementEnum(this.arrangementCreationForm.value.type);
  
      const arrangement: Arrangement = {
        id: -1,
        name: this.arrangementCreationForm.value.name || '',
        type: type,
        price: price,
        averageRating: 0,
        excursions: this.excursions,
        ratings: []
      };
  
      console.log('Successfully filled out the form');
      this.arrangementService
        .create(arrangement)
        .subscribe({
          next: () => {
            // Navigate to '/arrangements' after successful arrangement creation
            this.router.navigate(['/arrangements']);
          },
          error: (error) => {
            console.error('Error occurred during registration:', error);
          },
        });
    }
  }


  addExcursion() {
    if (this.excursionCreationForm.valid) {
        console.log('Successfully filled out the form')
      const excursion = this.createExcursion();
      if (excursion !== null) {
        this.excursions.push(excursion); // Add new excursion to the array
        this.excursionCreationForm.reset(); // Reset the form after adding an excursion
        this.cdRef.detectChanges(); // Manually trigger change detection
      }
    }
  }


  createExcursion(): Excursion | null {
    if (this.excursionCreationForm.valid) {
    
        const price = this.convertPriceToNumber(this.excursionCreationForm.value.price);
        const type = this.convertTypeToExcursionEnum(this.excursionCreationForm.value.type);


        
        const excursion: Excursion = {
            id: -1,
            name: this.excursionCreationForm.value.name || '',
            type: type,
            price: price           
        };

        console.log('Excursion:')
        console.log(excursion)

        return excursion
    }
    return null;
  }

  convertPriceToNumber(priceValue: string | null | undefined): number{
    if (priceValue === null || priceValue === undefined) {
      return 0;
    }
  
    const price = parseFloat(priceValue);
    return isNaN(price) ? 0 : price;
  }

  convertTypeToArrangementEnum(typeString: string | null | undefined): ArrangementType {
    switch (typeString) {
      case 'INDIVIDUAL':
        return ArrangementType.INDIVIDUAL;
      case 'FAMILY':
        return ArrangementType.FAMILY;
      case 'GROUP':
        return ArrangementType.GROUP;
      default:
        return ArrangementType.INDIVIDUAL;
    }
  }


  convertTypeToExcursionEnum(typeString: string | null | undefined): ExcursionType {
    switch (typeString) {
      case "HISTORICAL":
        return ExcursionType.HISTORICAL;
      case "CULTURAL":
        return ExcursionType.CULTURAL;
      case "GASTRONOMIC":
        return ExcursionType.GASTRONOMIC;
      case "SPORTS":
        return ExcursionType.SPORTS;
      case "RELAXATION":
        return ExcursionType.RELAXATION;
      case "DIVING":
        return ExcursionType.DIVING;
      case "HIKING":
        return ExcursionType.HIKING;
      default:
        throw new Error("Invalid excursion type string");
    }
  }


  getExcursionTypeName(type: ExcursionType): string {
    switch (type) {
      case ExcursionType.HISTORICAL:
        return "Historical";
      case ExcursionType.CULTURAL:
        return "Cultural";
      case ExcursionType.GASTRONOMIC:
        return "Gastronomic";
      case ExcursionType.SPORTS:
        return "Sports";
      case ExcursionType.RELAXATION:
        return "Relaxation";
      case ExcursionType.DIVING:
        return "Diving";
      case ExcursionType.HIKING:
        return "Hiking";
      default:
        return "Unknown";
    }
  }
}
