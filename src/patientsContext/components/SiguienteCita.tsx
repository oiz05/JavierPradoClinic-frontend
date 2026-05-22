import { CalendarDays, User, Stethoscope } from 'lucide-react';

export function SiguienteCita() {
    return (
        <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
            {/* Soft gradient background variation for a premium feel */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#eff6ff] to-transparent rounded-full opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>

            <div className="flex items-start gap-6 relative z-10">
                <div className="bg-[#eff6ff] text-[#003f87] p-4 rounded-2xl shrink-0 shadow-sm border border-[#dbeafe]">
                    <CalendarDays className="w-8 h-8" />
                </div>

                <div className="flex flex-col justify-center h-full pt-1">
                    <h3 className="text-sm font-extrabold text-[#003f87] tracking-wider uppercase mb-1.5 opacity-90" style={{ fontFamily: "'Manrope', sans-serif" }}>Siguiente Cita</h3>
                    <p className="text-[22px] font-bold text-[#191c1d] mb-2.5 leading-none">Mañana a las 10:00 AM</p>
                    <div className="flex items-center gap-4 text-[#424752] text-sm">
                        <div className="flex items-center gap-1.5 font-medium">
                            <User className="w-4 h-4 text-[#64748b]" />
                            <span>Dr. Sarah Jenkins</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-[#cbd5e1]"></div>
                        <div className="flex items-center gap-1.5 font-medium">
                            <Stethoscope className="w-4 h-4 text-[#64748b]" />
                            <span className="text-[#424752]">Cardiología</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
                <button className="flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold text-[#475569] bg-white border border-[#e2e8f0] hover:bg-slate-50 hover:text-[#191c1d] transition-all shadow-sm hover:border-[#cbd5e1]">
                    No podré asistir
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold text-white bg-[#003f87] hover:bg-[#002f66] shadow-[0_4px_12px_rgba(0,63,135,0.2)] transition-all hover:shadow-[0_6px_16px_rgba(0,63,135,0.3)] hover:-translate-y-0.5">
                    Confirmar asistencia
                </button>
            </div>
        </div>
    );
}
