import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import jsQR from 'jsqr'; 
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { Reservation } from '../../infrastructure/rest/model/reservation-qr';
import { ReservationItem } from '../../infrastructure/rest/model/reservation-item-qr';


@Component({
  selector: 'pd-reservation-takeover-qr',
  templateUrl: './reservation-takeover-qr.component.html',
  styleUrls: ['./reservation-takeover-qr.component.css'] 
})
export class ReservationTakeoverQRComponent {

    qrCodeValue: string = ''; // Set a default QR code value
    decodedResult: string | null = null;

    isDecoded: boolean = false;    
    reservationItems: ReservationItem[]=[];
    reservationId!: number;
    markAsTakenMessage: string = '';
    isSuccessfullyTaken: boolean = false;
    reservation!: Reservation;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private reservationService: ReservationService
    ) {}

    ngOnInit(): void {

    }


    

  onImageInputChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = img.width;
          canvas.height = img.height;

          context?.drawImage(img, 0, 0, img.width, img.height);

          const imageData = context?.getImageData(0, 0, img.width, img.height);

          if (imageData) {
            const decodedData = this.decodeQrCode(imageData.data, img.width, img.height);

            if (decodedData) {
                console.log('Decoded QR Code:', decodedData);
                this.decodedResult = decodedData;

                const match = decodedData.match(/Id: (\d+)/);
                if(match && match[1]){

                    const reservationId = match[1];                
                    this.reservationId = +reservationId;

                    this.reservationService.getById(this.reservationId)
                    .subscribe((reservation: Reservation) => {

                        this.reservation = reservation;

                        this.reservationService.getReservationItemsByReservationId(this.reservationId)
                        .subscribe((reservationItems: ReservationItem[]) => {
                            console.log('Reservation Items:', reservationItems);
                            this.reservationItems = reservationItems;
                            this.isDecoded = true;
                        });

                    });
                }
            } 
            else {
                console.log('No QR Code found in the image.');
                this.decodedResult = null;
            }



            } else {
              console.log('No QR Code found in the image.');
              this.decodedResult = null;
            }
          
        };

        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  private decodeQrCode(imageData: Uint8ClampedArray, width: number, height: number): string | null {
    const code = jsQR(imageData, width, height);
    return code ? code.data : null;
  }

  public onMarkAsTakenClicked(){

    this.reservationService.markAsTakenQR(this.reservationId)
      .subscribe(
        () => {
          console.log('Reservation marked as taken successfully.');
          this.markAsTakenMessage = "Reservation taken successfully!"
          this.isSuccessfullyTaken = true;
        },
        (error) => {
            this.isSuccessfullyTaken = false;
          if (error.status === 400) {
            console.error('Unauthorized. Redirecting to error page.');

            this.markAsTakenMessage = "Reservation not successfully taken!"
          } else if (error.status === 404) {
            console.error('Resource not found. Redirecting to error page.');

            this.markAsTakenMessage = "Reservation not successfully taken!"
          } else {
            console.error('Error marking reservation as taken:', error);
            this.markAsTakenMessage = "Reservation not successfully taken!"
          }
        }
      );
  }



}
