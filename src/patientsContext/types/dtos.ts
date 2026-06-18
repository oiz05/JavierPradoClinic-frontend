export interface Doctor {
    id: number;
    cmp: string;
    medicalSpecialty: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePhoto: string | null;
}

export interface Clinic {
    id: number;
    name: string;
    address: string;
}

export interface AppointmentType {
    id: number;
    name: string;
    description: string;
    durationMinutes: number;
}

export interface Appointment {
    id: number;
    doctorProfileId: number;
    doctorName: string;
    medicalSpecialty: string;
    clinicId: number;
    clinicName: string;
    clinicAddress: string;
    appointmentTypeId: number;
    appointmentTypeName: string;
    durationMinutes: number;
    appointmentDate: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    price: number;
    currency: string;
}

export interface AvailabilitySlot {
    startAt: string;
    endAt: string;
    available: boolean;
    price: number | null;
    currency: string | null;
}

export interface AppointmentQuote {
    doctorProfileId: number;
    medicalSpecialty: string;
    appointmentTypeId: number;
    appointmentTypeName: string;
    price: number;
    currency: string;
    durationMinutes: number;
}

export interface CreateAppointmentRequest {
    doctorProfileId: number;
    clinicId: number;
    appointmentTypeId: number;
    appointmentDate: string;
}
