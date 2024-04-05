import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import {
  faHouse,
  faPlus,
  faMinus,
  faEdit,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import { CompanyAdministrator } from '../../infrastructure/auth/model/company-administrator.model';
import { CompanyEquipment } from '../../infrastructure/rest/model/company-equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { eq } from '@fullcalendar/core/internal-common';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'pd-map-delivery',
  templateUrl: './map-delivery.component.html',
  styleUrl: './map-delivery.component.css',
})
export class MapDeliveryComponent implements OnInit {
  faHouse = faHouse;
  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;

  deliveryId: number = -1;

  constructor() {}

  ngOnInit(): void {}
}
