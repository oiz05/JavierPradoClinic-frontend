import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CalendarX2 } from 'lucide-react';

interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function CancelModal({ isOpen, onClose, onConfirm }: CancelModalProps) {
    if (!isOpen) return null;

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
                    {/* Top subtle border */}
                    <div className="h-1.5 w-full bg-rose-400" />

                    <div className="p-8 flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-rose-50 text-rose-500">
                            <CalendarX2 className="w-8 h-8" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <h2 className="text-[22px] font-extrabold text-[#191c1d] mb-3 leading-tight tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            ¿Deseas cancelar esta cita?
                        </h2>

                        <p className="text-[#424752] text-[15px] mb-8 leading-relaxed">
                            Esta acción cancelará la cita médica programada. Puedes reagendar otra cita en cualquier momento.
                        </p>

                        {/* Actions */}
                        <div className="w-full flex flex-col gap-3">
                            <button
                                onClick={onConfirm}
                                className="w-full py-3.5 px-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px] shadow-sm bg-rose-500 hover:bg-rose-600 text-white"
                            >
                                Sí, cancelar cita
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full py-3.5 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-[15px] bg-white border border-[#e2e8f0] text-[#475569] hover:bg-slate-50 hover:text-[#191c1d]"
                            >
                                Mantener cita
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
