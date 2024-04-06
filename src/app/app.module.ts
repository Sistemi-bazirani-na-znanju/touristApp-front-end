import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './infrastructure/auth/auth.service';
import { UregisteredUserModule } from './unregistered-user/uregistered-user/uregistered-user.module';
import { ApiService } from './infrastructure/auth';
import { FullCalendarModule } from '@fullcalendar/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { ArragementReservationComponent } from './arragement-reservation/arragement-reservation.component';

@NgModule({
  declarations: [AppComponent, ArragementReservationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UregisteredUserModule,
    QRCodeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    }),
    FullCalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
