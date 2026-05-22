import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle } from 'lucide-react';

interface DecisionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReschedule: () => void;
    onCancel: () => void;
}

export function DecisionModal({ isOpen, onClose, onReschedule, onCancel }: DecisionModalProps) {
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
                    <div className="h-1.5 w-full bg-[#003f87]" />

                    <div className="p-8 flex flex-col items-center text-center">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-[#eff6ff] text-[#003f87]">
                            <HelpCircle className="w-8 h-8" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <h2 className="text-[22px] font-extrabold text-[#191c1d] mb-3 leading-tight tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                            No podrás asistir a esta cita
                        </h2>

                        <p className="text-[#424752] text-[15px] mb-8 leading-relaxed">
                            Puedes cancelar la cita o seleccionar una nueva fecha para reagendarla.
                        </p>

                        {/* Actions */}
                        <div className="w-full flex flex-col gap-3">
                            <button
                                onClick={onReschedule}
                                className="w-full py-3.5 px-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px] shadow-[0_4px_12px_rgba(0,63,135,0.2)] bg-[#003f87] hover:bg-[#002f66] text-white"
                            >
                                Reagendar cita
                            </button>

                            <button
                                onClick={onCancel}
                                className="w-full py-3.5 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-[15px] bg-white border border-[#e2e8f0] text-[#ba1a1a] hover:bg-rose-50"
                            >
                                Cancelar cita
                            </button>

                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-[14px] text-[#64748b] hover:text-[#191c1d] hover:bg-slate-50"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
