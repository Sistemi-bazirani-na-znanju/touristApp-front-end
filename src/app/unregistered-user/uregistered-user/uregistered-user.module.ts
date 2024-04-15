import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
  ],
})
export class UregisteredUserModule { }
