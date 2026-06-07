import { motion, AnimatePresence } from 'motion/react';
import { Check, AlertCircle, Calendar } from 'lucide-react';

export type BookingStatus = 'success' | 'error' | null;

interface BookingModalProps {
    isOpen: boolean;
    status: BookingStatus;
    isReschedule?: boolean;
    appointmentDetails?: {
        date: string;
        time: string;
        location: string;
        doctor: string;
    };
    onClose: () => void;
    onPrimaryAction: () => void;
    onSecondaryAction: () => void;
}

export function BookingModal({
    isOpen,
    status,
    isReschedule,
    appointmentDetails,
    onClose,
    onPrimaryAction,
    onSecondaryAction,
}: BookingModalProps) {
    if (!isOpen || !status) return null;

    const isSuccess = status === 'success';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300
                    }}
                    className="relative w-full max-w-md bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
                >
                    {/* Top subtle border/accent */}
                    <div className={`h-1.5 w-full ${isSuccess ? 'bg-emerald-500' : 'bg-amber-500'}`} />

                    <div className="p-8 flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                            {isSuccess ? (
                                <Check className="w-8 h-8" strokeWidth={2.5} />
                            ) : (
                                <AlertCircle className="w-8 h-8" strokeWidth={2.5} />
                            )}
                        </div>

                        {/* Content */}
                        <h2 className="text-[22px] font-extrabold text-[#191c1d] mb-3 leading-tight tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            {isSuccess
                                ? (isReschedule ? 'Cita reagendada con éxito' : '¡Cita agendada con éxito!')
                                : (isReschedule ? 'No pudimos reagendar tu cita' : 'No pudimos agendar tu cita')
                            }
                        </h2>

                        <p className="text-[#424752] text-[15px] mb-2 leading-relaxed">
                            {isSuccess
                                ? (isReschedule
                                    ? 'La fecha y hora de tu cita fueron actualizadas correctamente.'
                                    : 'Tu cita médica ha sido registrada correctamente. Hemos enviado la confirmación a tu correo electrónico.')
                                : (isReschedule
                                    ? 'Ocurrió un problema al actualizar la cita. Por favor, intenta nuevamente.'
                                    : 'Ocurrió un problema al intentar registrar la cita. Por favor, intenta nuevamente en unos momentos.')
                            }
                        </p>

                        <p className="text-[#64748b] text-[13px] mb-8">
                            {isSuccess
                                ? 'También recibirás recordatorios antes de la cita.'
                                : 'Si el problema continúa, comunícate con soporte.'}
                        </p>

                        {/* Optional Summary Preview for Success */}
                        {isSuccess && appointmentDetails && (
                            <div className="w-full bg-[#f8f9fa] rounded-xl p-4 mb-8 border border-[#e2e8f0]/60 text-left flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#eff6ff] text-[#003f87] flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#64748b] uppercase tracking-wide">Fecha y Hora</p>
                                        <p className="text-[13px] font-semibold text-[#191c1d]">{appointmentDetails.date} a las {appointmentDetails.time}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="w-full flex flex-col gap-3">
                            <button
                                onClick={onPrimaryAction}
                                className={`w-full py-3.5 px-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px] shadow-sm ${isSuccess
                                        ? 'bg-[#003f87] hover:bg-[#002f66] text-white'
                                        : 'bg-[#003f87] hover:bg-[#002f66] text-white'
                                    }`}
                            >
                                {isSuccess ? 'Ver mis citas' : 'Intentar nuevamente'}
                            </button>

                            <button
                                onClick={onSecondaryAction}
                                className="w-full py-3.5 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-[15px] bg-white border border-[#e2e8f0] text-[#475569] hover:bg-slate-50 hover:text-[#191c1d]"
                            >
                                {isSuccess ? 'Volver al dashboard' : 'Volver'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
