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
  selector: 'pd-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css',
})
export class CompanyProfileComponent implements OnInit {
  companyId: number = -1;
  company: Company = new Company();
  equipment?: CompanyEquipment[];
  canEdit: boolean = false;
  companyCopy?: any;
  errors: any;
  companyAdministrators?: CompanyAdministrator[];
  appointments: Appointment[] = [];
  user: any;
  searchText: string = '';
  equipmentSearched: CompanyEquipment[] = [];

  faHouse = faHouse;
  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;

  optionsMonthSelected: boolean = true;
  optionsDaySelected: boolean = false;
  optionsYearSelected: boolean = false;

  calendarOptionsMonth: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
  };

  calendarOptionsDay: CalendarOptions = {
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin],
    events: [],
  };

  calendarOptionsYear: CalendarOptions = {
    initialView: 'dayGridYear',
    plugins: [dayGridPlugin],
    events: [],
  };

  constructor(
    private companyService: CompanyService,
    private equipmentService: EquipmentService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private companyAdminService: CompanyAdminService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialog
  ) {
    this.companyCopy = {
      name: '',
      address: '',
      city: '',
      country: '',
      openingTime: '',
      closingTime: '',
      description: '',
    };

    this.errors = {
      name: '',
      address: '',
      city: '',
      country: '',
      openingTime: '',
      closingTime: '',
      description: '',
    };
  }

  ngOnInit(): void {
    this.setInputReadOnly(true);
    // this.route.params.subscribe(params => {
    // this.companyId = params['id'];
    // this.getCompanyById(this.companyId);
    this.fetchCompany();
    // })
  }

  fetchCompany(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (!user.id) return;
      let userId = user.id;
      this.companyAdminService.getById(userId).subscribe((registeredUser) => {
        this.companyId = registeredUser.companyId;
        this.user = registeredUser;
        this.getCompanyById(this.companyId);
      });
    });
  }

  getCompanyById(id: number): void {
    this.companyService.getById(id).subscribe((result) => {
      this.company = result;
      console.log(this.company);
      this.companyAdministrators = this.company.companyAdministrators;
      this.getCompanyEquipmentByCompanyId(this.companyId);
      this.getAppointments(this.companyId);
      this.makeCompanyCopy();
    });
  }

  getCompanyEquipmentByCompanyId(id: number) {
    this.companyService
      .getCompanyEquipmentByCompanyId(id)
      .subscribe((results) => {
        this.equipment = results;
        this.equipmentSearched = results;
        if (this.equipment !== undefined) {
          this.equipment.forEach((eq) => {
            eq.isAdded = true;
          });
        }
      });
  }

  getAppointments(companyId: number): void {
    this.appointmentService
      .getAppointmentsByCompanyId(companyId)
      .subscribe((result) => {
        this.appointments = result;
        this.makeCalendar();
      });
  }

  saveChanges(): void {
    if (this.validate()) {
      this.companyCopy.openingTime += ':00';
      this.companyCopy.closingTime += ':00';
      this.companyService.update(this.companyId, this.companyCopy).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.makeCompanyCopy();
        },
        error: (errData) => {
          console.log(errData);
        },
      });
      this.endEditing();
    }
  }

  makeCompanyCopy(): void {
    const { ...companyCopy } = this.company;
    this.companyCopy = companyCopy;
  }

  startEditing(): void {
    this.canEdit = true;
    this.setInputReadOnly(false);
  }

  endEditing(): void {
    this.canEdit = false;
    this.resetErrors();
    this.setInputReadOnly(true);
    this.makeCompanyCopy();
  }

  setInputReadOnly(readOnly: boolean): void {
    var inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(function (input) {
      const inputElement = input as HTMLInputElement;
      inputElement.readOnly = readOnly;
    });
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors();

    if (this.companyCopy.name === '') {
      this.errors.name = 'Name is required.';
      isValid = false;
    }

    if (this.companyCopy.description === '') {
      this.errors.description = 'Description is required.';
      isValid = false;
    }

    if (this.companyCopy.country === '') {
      this.errors.country = 'Country is required.';
      isValid = false;
    }

    if (this.companyCopy.city === '') {
      this.errors.city = 'City is required.';
      isValid = false;
    }

    if (this.companyCopy.address === '') {
      this.errors.address = 'Address is required.';
      isValid = false;
    }

    if (this.companyCopy.openingTime === '') {
      this.errors.openingTime = 'Opening time is required';
      isValid = false;
    }

    if (this.companyCopy.closingTime === '') {
      this.errors.closingTime = 'Closing time is required';
      isValid = false;
    }

    return isValid;
  }

  resetErrors(): void {
    this.errors.name = '';
    this.errors.address = '';
    this.errors.city = '';
    this.errors.country = '';
    this.errors.openingTime = '';
    this.errors.closingTime = '';
    this.errors.description = '';
  }

  addEquipment() {
    this.router.navigate(['add-equipment/']);
  }

  removeEquipment(eq: CompanyEquipment) {
    this.companyService
      .removeEquimpentFromCompany(this.companyId, eq.id!)
      .subscribe((result) => {
        this.getCompanyEquipmentByCompanyId(this.companyId);
      });
  }

  editEquipment(eq: CompanyEquipment) {
    this.router.navigate(['edit-equipment/' + eq.id]);
  }

  addAppointment() {
    this.dialogRef.open(AppointmentFormComponent, {
      data: this.companyAdministrators,
    });
  }

  searchEquipment() {
    this.equipmentSearched = [];
    this.equipment?.forEach((eq) => {
      if (eq.name.toLowerCase().includes(this.searchText.toLowerCase())) {
        this.equipmentSearched.push(eq);
      }
    });
  }

  selectOptionsMonth() {
    this.optionsMonthSelected = true;
    this.optionsDaySelected = false;
    this.optionsYearSelected = false;
  }
  selectOptionsDay() {
    this.optionsMonthSelected = false;
    this.optionsDaySelected = true;
    this.optionsYearSelected = false;
  }
  selectOptionsYear() {
    this.optionsMonthSelected = false;
    this.optionsDaySelected = false;
    this.optionsYearSelected = true;
  }

  makeCalendar() {
    const newEvents: any[] = [];

    this.appointments.forEach((appointment) => {
      const startDateTime = new Date(appointment.startDateTime);
      const endDateTime = new Date(
        startDateTime.getTime() + appointment.duration * 60000
      );

      const newEvent = {
        title:
          appointment.companyAdministratorFullName +
          ' ' +
          appointment.duration +
          ' Minutes',
        start: appointment.startDateTime.toString(),
        end: endDateTime.toISOString(),
      };
      newEvents.push(newEvent);
      console.log(newEvents);
    });

    this.calendarOptionsMonth.events = [...newEvents];
    this.calendarOptionsDay.events = [...newEvents];
    this.calendarOptionsYear.events = [...newEvents];
  }
}
