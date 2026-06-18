import apiClient from '../../shared/apiClient';
import type { Appointment, AppointmentQuote, AppointmentType, AvailabilitySlot, Clinic, CreateAppointmentRequest, Doctor } from '../types/dtos';

export async function getDoctors() {
    const response = await apiClient.get<Doctor[]>('/doctors');
    return response.data;
}

export async function getClinics() {
    const response = await apiClient.get<Clinic[]>('/clinics');
    return response.data;
}

export async function getAppointmentTypes() {
    const response = await apiClient.get<AppointmentType[]>('/appointment-types');
    return response.data;
}

export async function getMyAppointments() {
    const response = await apiClient.get<Appointment[]>('/appointments/me');
    return response.data;
}

export async function getAvailability(params: {
    doctorProfileId: number;
    clinicId: number;
    appointmentTypeId: number;
    date: string;
}) {
    const response = await apiClient.get<AvailabilitySlot[]>('/appointments/availability', { params });
    return response.data;
}

export async function getAppointmentQuote(params: {
    doctorProfileId: number;
    appointmentTypeId: number;
    appointmentDate: string;
}) {
    const response = await apiClient.get<AppointmentQuote>('/appointments/quote', { params });
    return response.data;
}

export async function createAppointment(payload: CreateAppointmentRequest) {
    const response = await apiClient.post<Appointment>('/appointments', payload);
    return response.data;
}

export async function updateAppointmentStatus(id: number, status: Appointment['status']) {
    const response = await apiClient.patch<Appointment>(`/appointments/${id}/status`, { status });
    return response.data;
}

export async function rescheduleAppointment(id: number, appointmentDate: string) {
    const response = await apiClient.put<Appointment>(`/appointments/${id}/reschedule`, { appointmentDate });
    return response.data;
}
