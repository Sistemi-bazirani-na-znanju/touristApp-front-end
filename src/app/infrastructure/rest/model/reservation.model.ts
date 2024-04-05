import { Appointment } from './appointmen.model';
import { RegisteredUser } from './registered-user.model';

export interface Reservation {
  id: number;
  status: string;
  registeredUser: RegisteredUser;
  appointment: Appointment;
}
