import { useState } from 'react';
import { Filter, Calendar as CalendarIcon, Clock, Stethoscope, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { CancelModal } from './CancelModal';
import { DecisionModal } from './DecisionModal';
import type { Appointment } from '../types/dtos';
import { updateAppointmentStatus } from '../api/patientApi';

interface NextAppointmentsProps {
    appointments: Appointment[];
    loading: boolean;
    onRefresh: () => Promise<void>;
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(value));
}

function formatTime(value: string) {
    return new Intl.DateTimeFormat('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}

function getStatusLabel(status: Appointment['status']) {
    if (status === 'CONFIRMED') return 'Asistencia confirmada';
    if (status === 'CANCELLED') return 'Cita cancelada';
    if (status === 'COMPLETED') return 'Cita completada';
    return 'Asistencia no confirmada';
}

function getStatusColor(status: Appointment['status']) {
    if (status === 'CONFIRMED') return 'bg-[#80f98b]/20 text-[#007327] border-[#80f98b]/40';
    if (status === 'CANCELLED') return 'bg-rose-50 text-rose-600 border-rose-200';
    if (status === 'COMPLETED') return 'bg-[#eff6ff] text-[#003f87] border-[#dbeafe]';
    return 'bg-[#e1e3e4]/60 text-[#424752] border-[#e1e3e4]';
}

export function NextAppointments({ appointments, loading, onRefresh }: NextAppointmentsProps) {
    const navigate = useNavigate();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

    const selectedAppointment = appointments.find((appointment) => appointment.id === selectedAppointmentId);

    function handleCancelClick(id: number) {
        setSelectedAppointmentId(id);
        setIsCancelModalOpen(true);
    }

    function handleDecisionClick(id: number) {
        setSelectedAppointmentId(id);
        setIsDecisionModalOpen(true);
    }

    async function handleConfirmCancel() {
        if (selectedAppointmentId === null) return;
        try {
            await updateAppointmentStatus(selectedAppointmentId, 'CANCELLED');
            await onRefresh();
            toast.success('Cita cancelada correctamente');
        } catch (error) {
            console.error(error);
            toast.error('No se pudo cancelar la cita');
        } finally {
            setIsCancelModalOpen(false);
            setSelectedAppointmentId(null);
        }
    }

    function handleReschedule(id: number) {
        navigate(`/patient/appointment?reschedule=true&appointmentId=${id}`);
    }

    async function handleConfirmAttendance(id: number) {
        try {
            await updateAppointmentStatus(id, 'CONFIRMED');
            await onRefresh();
            toast.success('Asistencia confirmada correctamente', {
                icon: <CheckCircle2 className="w-5 h-5 text-[#007327]" />,
                style: {
                    background: '#f0fdf4',
                    borderColor: '#bbf7d0',
                }
            });
        } catch (error) {
            console.error(error);
            toast.error('No se pudo confirmar la asistencia');
        }
    }

    return (
        <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#e1e3e4]/50 flex justify-between items-center bg-white relative z-10">
                <h3 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Citas Próximas</h3>
                <button className="flex items-center gap-2 text-[13px] font-bold text-[#003f87] bg-[#eff6ff] hover:bg-[#dbeafe] px-4 py-2 rounded-xl transition-colors tracking-wide">
                    <Filter className="w-4 h-4" />
                    FILTROS
                </button>
            </div>

            {loading ? (
                <div className="p-8 text-[#424752] font-semibold">Cargando citas...</div>
            ) : appointments.length === 0 ? (
                <div className="p-8 text-[#424752] font-semibold">No tienes citas próximas.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#f8f9fa]/50 border-b border-[#e1e3e4]/50 text-[12px] font-bold text-[#64748b] uppercase tracking-wider">
                                <th className="px-8 py-5">Especialidad y Doctor</th>
                                <th className="px-6 py-5">Fecha y Hora</th>
                                <th className="px-6 py-5">Estado</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e1e3e4]/40">
                            {appointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-[#f8f9fa]/80 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="p-3 rounded-[14px] text-[#003f87] bg-[#eff6ff] shadow-sm border border-black/5">
                                                <Stethoscope className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#191c1d] text-[15px]">{appointment.medicalSpecialty}</div>
                                                <div className="text-[14px] text-[#424752] mt-0.5">{appointment.doctorName}</div>
                                                <div className="text-[12px] text-[#64748b] mt-1">{appointment.appointmentTypeName} · {appointment.clinicName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-[14px] font-semibold text-[#191c1d]">
                                                <CalendarIcon className="w-4 h-4 text-[#64748b]" />
                                                {formatDate(appointment.appointmentDate)}
                                            </div>
                                            <div className="flex items-center gap-2 text-[14px] text-[#424752]">
                                                <Clock className="w-4 h-4 text-[#64748b]" />
                                                {formatTime(appointment.appointmentDate)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <motion.div layout className="inline-block">
                                            <motion.span
                                                key={appointment.status}
                                                initial={{ opacity: 0.5, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-colors duration-500 ${getStatusColor(appointment.status)}`}
                                            >
                                                {getStatusLabel(appointment.status)}
                                            </motion.span>
                                        </motion.div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                            {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
                                                <>
                                                    {appointment.status === 'PENDING' ? (
                                                        <button
                                                            onClick={() => void handleConfirmAttendance(appointment.id)}
                                                            className="text-[12px] font-bold text-[#003f87] hover:text-[#002f66] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#dbeafe]"
                                                        >
                                                            CONFIRMAR
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleReschedule(appointment.id)}
                                                            className="text-[12px] font-bold text-[#003f87] hover:text-[#002f66] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#dbeafe]"
                                                        >
                                                            REAGENDAR
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => appointment.status === 'PENDING' ? handleDecisionClick(appointment.id) : handleCancelClick(appointment.id)}
                                                        className="text-[12px] font-bold text-[#ba1a1a] hover:text-[#931212] hover:bg-[#ba1a1a]/10 px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#ba1a1a]/20"
                                                    >
                                                        {appointment.status === 'PENDING' ? 'NO ASISTIRÉ' : 'CANCELAR'}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <CancelModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={() => void handleConfirmCancel()}
            />

            <DecisionModal
                isOpen={isDecisionModalOpen}
                onClose={() => setIsDecisionModalOpen(false)}
                onReschedule={() => {
                    setIsDecisionModalOpen(false);
                    if (selectedAppointment) handleReschedule(selectedAppointment.id);
                }}
                onCancel={() => {
                    setIsDecisionModalOpen(false);
                    setIsCancelModalOpen(true);
                }}
            />
        </div>
    );
}
