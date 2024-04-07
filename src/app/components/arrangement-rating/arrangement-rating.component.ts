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
import { Rating } from '../../infrastructure/rest/model/rating.model';

@Component({
  selector: 'pd-arrangement-rating',
  templateUrl: './arrangement-rating.component.html',
  styleUrls: ['./arrangement-rating.component.css'],
})
    export class ArrangementRatingComponent {
    arrangement: any;
    arrangementId: number | null = null;
    ratings: Rating[] = [];
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
            this.arrangementService.getById(this.arrangementId).subscribe({
            next: (arrangement: Arrangement) => {
                this.arrangement = arrangement;
                this.ratings = arrangement.ratings;
                this.cdRef.detectChanges(); // Manually trigger change detection
            },
            error: (error) => {
                console.error('Error occurred during arrangement retrieval:', error);
            },
            });
        }
        });
    }


    ratingCreationForm = new FormGroup(
        {
            ratingValue: new FormControl('', [Validators.required, this.numberValidator]),
        }
    );


    numberValidator(control: AbstractControl): { [key: string]: any } | null {
        const value = parseFloat(control.value);
    
        // Check if the value is null or undefined
        if (isNaN(value)) {
            return { invalidNumber: { value: control.value } };
        }
    
        // Check if the value is within the range
        if (value < 1 || value > 5) {
            return { invalidRange: { value: control.value } };
        }
    
        return null; // Valid number
    }
    

    createRating(): void {
        if (this.ratingCreationForm.valid) {

            const ratingValue = this.convertStringToNumber(this.ratingCreationForm.value.ratingValue);

            const rating: Rating = {
                id: -1,
                ratingValue: ratingValue
            };

            this.arrangement.ratings.push(rating);
            this.arrangement.averageRating = this.calculateAverageRating();

    
            if (this.arrangementId !== null) {
                this.arrangementService.updateRating(this.arrangementId, this.arrangement).subscribe({
                    next: (result: Arrangement) => {
                    this.arrangement = result;
                    this.ratings = result.ratings;
                    this.cdRef.detectChanges(); // Manually trigger change detection
                    this.router.navigate(['/arrangements']);
                    },
                    error: () => {
                    console.log('Error updating arrangement');
                    },
                });
            }
        }
        else{
            this.creationError = "Rating is required";
            this.cdRef.detectChanges(); 
        }
    }


    convertStringToNumber(priceValue: string | null | undefined): number{
        if (priceValue === null || priceValue === undefined) {
          return 0;
        }
      
        const price = parseFloat(priceValue);
        return isNaN(price) ? 0 : price;
    }
    
    getArrangementTypeName(type: ArrangementType): string {
        switch(type) {
          case ArrangementType.INDIVIDUAL:
            return "Individual";
          case ArrangementType.FAMILY:
            return "Family";
          case ArrangementType.GROUP:
            return "Group";
          default:
            return "Unknown";
        }
      }

      calculateAverageRating(): number {
        if (this.ratings.length === 0) {
            return 0;
        }
    
        const sum = this.ratings.reduce((acc, rating) => acc + rating.ratingValue, 0);
        const average = sum / this.ratings.length;
    
        // Round to two decimal places
        return parseFloat(average.toFixed(2));
    }
    

    formatDate(date: Date): string {
        const parsedDate = new Date(date);
        const day = parsedDate.getDate().toString().padStart(2, '0');
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = (parsedDate.getFullYear() + 1900).toString(); // Adjusted for getYear()
        const hours = parsedDate.getHours().toString().padStart(2, '0');
        const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
}
