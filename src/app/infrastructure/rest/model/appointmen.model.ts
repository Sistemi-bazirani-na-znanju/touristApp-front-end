export interface Appointment {
    id: number;
    startDateTime: string;
    duration: number;
    companyAdministratorFullName: string;
    status: string;
    qrCode: string;
}