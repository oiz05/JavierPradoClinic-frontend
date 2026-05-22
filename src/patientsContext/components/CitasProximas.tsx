import { useState } from 'react';
import { Filter, Calendar as CalendarIcon, Clock, Stethoscope, HeartPulse, Activity, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { CancelModal } from './CancelModal';
import { DecisionModal } from './DecisionModal';

const initialCitas = [
    {
        id: 1,
        especialidad: 'Cardiología',
        doctor: 'Dr. Sarah Jenkins',
        fecha: 'Oct 24, 2023',
        hora: '10:00 AM',
        estado: 'Asistencia confirmada',
        estadoColor: 'bg-[#80f98b]/20 text-[#007327] border-[#80f98b]/40',
        icon: HeartPulse,
        iconColor: 'text-[#003f87] bg-[#eff6ff]',
    },
    {
        id: 2,
        especialidad: 'Dermatología',
        doctor: 'Dr. Michael Chen',
        fecha: 'Nov 02, 2023',
        hora: '02:15 PM',
        estado: 'Asistencia no confirmada',
        estadoColor: 'bg-[#e1e3e4]/60 text-[#424752] border-[#e1e3e4]',
        icon: Activity,
        iconColor: 'text-[#475569] bg-[#f8f9fa]',
    },
    {
        id: 3,
        especialidad: 'Médico General',
        doctor: 'Dr. Emily Stone',
        fecha: 'Nov 15, 2023',
        hora: '09:00 AM',
        estado: 'Asistencia confirmada',
        estadoColor: 'bg-[#80f98b]/20 text-[#007327] border-[#80f98b]/40',
        icon: Stethoscope,
        iconColor: 'text-[#003f87] bg-[#eff6ff]',
    }
];

export function CitasProximas() {
    const navigate = useNavigate();
    const [citas, setCitas] = useState(initialCitas);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
    const [selectedCitaId, setSelectedCitaId] = useState<number | null>(null);

    const handleCancelClick = (id: number) => {
        setSelectedCitaId(id);
        setIsCancelModalOpen(true);
    };

    const handleDecisionClick = (id: number) => {
        setSelectedCitaId(id);
        setIsDecisionModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (selectedCitaId !== null) {
            setCitas(current => current.map(cita => {
                if (cita.id === selectedCitaId) {
                    return {
                        ...cita,
                        estado: 'Cita cancelada',
                        estadoColor: 'bg-rose-50 text-rose-600 border-rose-200'
                    };
                }
                return cita;
            }));
        }
        setIsCancelModalOpen(false);
        setSelectedCitaId(null);
    };

    const handleReschedule = () => {
        // Navigate to reschedule flow
        navigate('/agendar?reschedule=true');
    };

    const handleConfirmAttendance = (id: number) => {
        setCitas(current => current.map(cita => {
            if (cita.id === id) {
                return {
                    ...cita,
                    estado: 'Asistencia confirmada',
                    estadoColor: 'bg-[#80f98b]/20 text-[#007327] border-[#80f98b]/40',
                };
            }
            return cita;
        }));

        toast.success('Asistencia confirmada correctamente', {
            icon: <CheckCircle2 className="w-5 h-5 text-[#007327]" />,
            style: {
                background: '#f0fdf4',
                borderColor: '#bbf7d0',
            }
        });
    };
    return (
        <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#e1e3e4]/50 flex justify-between items-center bg-white relative z-10">
                <h3 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Citas Próximas</h3>
                <button className="flex items-center gap-2 text-[13px] font-bold text-[#003f87] bg-[#eff6ff] hover:bg-[#dbeafe] px-4 py-2 rounded-xl transition-colors tracking-wide">
                    <Filter className="w-4 h-4" />
                    FILTROS
                </button>
            </div>

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
                        {citas.map((cita) => (
                            <tr key={cita.id} className="hover:bg-[#f8f9fa]/80 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-3 rounded-[14px] ${cita.iconColor} shadow-sm border border-black/5`}>
                                            <cita.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-[#191c1d] text-[15px]">{cita.especialidad}</div>
                                            <div className="text-[14px] text-[#424752] mt-0.5">{cita.doctor}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2 text-[14px] font-semibold text-[#191c1d]">
                                            <CalendarIcon className="w-4 h-4 text-[#64748b]" />
                                            {cita.fecha}
                                        </div>
                                        <div className="flex items-center gap-2 text-[14px] text-[#424752]">
                                            <Clock className="w-4 h-4 text-[#64748b]" />
                                            {cita.hora}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6">
                                    <motion.div layout className="inline-block">
                                        <motion.span
                                            key={cita.estado}
                                            initial={{ opacity: 0.5, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[12px] font-bold border transition-colors duration-500 ${cita.estadoColor}`}
                                        >
                                            {cita.estado}
                                        </motion.span>
                                    </motion.div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                        {cita.estado !== 'Cita cancelada' && (
                                            <>
                                                {cita.estado === 'Asistencia no confirmada' ? (
                                                    <button
                                                        onClick={() => handleConfirmAttendance(cita.id)}
                                                        className="text-[12px] font-bold text-[#003f87] hover:text-[#002f66] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#dbeafe]"
                                                    >
                                                        CONFIRMAR
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleReschedule}
                                                        className="text-[12px] font-bold text-[#003f87] hover:text-[#002f66] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#dbeafe]"
                                                    >
                                                        REAGENDAR
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => cita.estado === 'Asistencia no confirmada' ? handleDecisionClick(cita.id) : handleCancelClick(cita.id)}
                                                    className="text-[12px] font-bold text-[#ba1a1a] hover:text-[#931212] hover:bg-[#ba1a1a]/10 px-4 py-2.5 rounded-xl transition-all border border-transparent hover:border-[#ba1a1a]/20"
                                                >
                                                    {cita.estado === 'Asistencia no confirmada' ? 'NO ASISTIRÉ' : 'CANCELAR'}
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

            <CancelModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleConfirmCancel}
            />

            <DecisionModal
                isOpen={isDecisionModalOpen}
                onClose={() => setIsDecisionModalOpen(false)}
                onReschedule={() => {
                    setIsDecisionModalOpen(false);
                    handleReschedule();
                }}
                onCancel={() => {
                    setIsDecisionModalOpen(false);
                    setIsCancelModalOpen(true);
                }}
            />
        </div>
    );
}
