import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanyService } from '../../company/company.service';
import { CompanyAdministrator} from '../../infrastructure/auth/model/company-administrator.model';

import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'pd-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.css'] 
})
export class CompanyCalendarComponent {

    companyId: number | null = null;
    events: EventSourceInput | undefined;
    handoverAppointments: number[] = [];
    calendarTab: number = 1;
    

    constructor(
        private authService: AuthService,
        private companyService: CompanyService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.events = []
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.companyId = id ? parseInt(id, 10) : null;
        if (this.companyId !== null) {
            
        }
        });
    }

    calendarOptionsMonth: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: {}
        // events: this.events
    }

    calendarOptionsDay: CalendarOptions = {
        initialView: 'dayGridWeek',
        plugins: [dayGridPlugin],
        events: [
            {
              id: 'a',
              title: 'my event',
              start: '2023-12-14T14:30:00',
              end: '2023-12-14T15:30:00',
            },
            {
                id: 'b',
                title: 'any event',
                start: '2023-12-14T16:30:00',
                end: '2023-12-14T17:30:00'
            }
        ],
    }

    calendarOptionsYear: CalendarOptions = {
        initialView: 'dayGridYear',
        plugins: [dayGridPlugin],
        events: [
            {
              id: 'a',
              title: 'my event',
              start: '2023-12-14T14:30:00',
              end: '2023-12-14T15:30:00',
            },
            {
                id: 'b',
                title: 'any event',
                start: '2023-12-14T16:30:00',
                end: '2023-12-14T17:30:00'
            }
        ],
    }



}
