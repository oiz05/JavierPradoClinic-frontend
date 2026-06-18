import { useEffect, useState } from 'react';
import { NextAppointment } from '../components/NextAppointment';
import { NextAppointments } from '../components/NextAppointments';
import type { UserDTO } from '../../authContext/types/dtos';
import type { Appointment } from '../types/dtos';
import { getMyAppointments } from '../api/patientApi';

export default function PatientDashboardPage() {
    const [firstName] = useState(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return '';
        try {
            const user = JSON.parse(userStr) as UserDTO;
            return user.firstName || '';
        } catch (e) {
            console.error(e);
            return '';
        }
    });
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadAppointments() {
        try {
            const data = await getMyAppointments();
            setAppointments(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            void loadAppointments();
        }, 0);
        return () => window.clearTimeout(timeoutId);
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-8 lg:p-12 flex flex-col gap-10">
            <div>
                <h1 className="text-[32px] font-extrabold text-[#191c1d] tracking-tight mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Hola de nuevo{firstName ? `, ${firstName}` : ''}
                </h1>
                <p className="text-[#424752] text-lg">Aquí tienes un resumen de tus próximas citas médicas</p>
            </div>

            <div className="flex flex-col gap-8">
                <NextAppointment appointments={appointments} loading={loading} onRefresh={loadAppointments} />
                <NextAppointments appointments={appointments} loading={loading} onRefresh={loadAppointments} />
            </div>
        </div>
    );
}
