import { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { BookingModal, type BookingStatus } from '../components/BookingModal';

export function MakeAppointmentPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isReschedule = searchParams.get('reschedule') === 'true';

    const [selectedDate, setSelectedDate] = useState<number | null>(24);
    const [selectedTime, setSelectedTime] = useState<string | null>('10:00 AM');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [modalStatus, setModalStatus] = useState<BookingStatus>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const morningTimes = ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
    const afternoonTimes = ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'];

    // Calendar mock data for October 2023
    const daysInMonth = 31;
    const firstDayOfMonth = 0; // Sunday
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

    const handleConfirm = () => {
        if (!termsAccepted) return;

        // Simulate API call and randomly show success or error for demonstration
        // In a real app, this would be based on the actual API response
        const isSuccess = Math.random() > 0.3; // 70% chance of success
        setModalStatus(isSuccess ? 'success' : 'error');
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalStatus(null), 300);
    };

    const handlePrimaryAction = () => {
        if (modalStatus === 'success') {
            navigate('/patient/dashboard');
        } else {
            handleModalClose();
        }
    };

    const handleSecondaryAction = () => {
        if (modalStatus === 'success') {
            navigate('/patient/dashboard');
        } else {
            handleModalClose();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 lg:p-12 relative">
            <BookingModal
                isOpen={isModalOpen}
                status={modalStatus}
                isReschedule={isReschedule}
                onClose={handleModalClose}
                onPrimaryAction={handlePrimaryAction}
                onSecondaryAction={handleSecondaryAction}
                appointmentDetails={{
                    date: `Octubre ${selectedDate}, 2023`,
                    time: selectedTime || '',
                    location: 'Sede Principal San Isidro',
                    doctor: 'Dr. Sarah Jenkins'
                }}
            />
            <div className="mb-10">
                {isReschedule && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-sm font-bold border border-amber-200/50">
                        <Clock className="w-4 h-4" />
                        Reagendando cita médica
                    </div>
                )}
                <h1 className="text-[32px] font-extrabold text-[#191c1d] tracking-tight mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {isReschedule ? 'Reagendar cita' : 'Agendar cita'}
                </h1>
                <p className="text-[#424752] text-lg">
                    {isReschedule
                        ? 'Selecciona una nueva fecha y horario para tu cita.'
                        : 'Selecciona los detalles para tu próxima consulta médica.'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Selection Flow */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    {/* Filters Card */}
                    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50">
                        <h2 className="text-xl font-extrabold text-[#191c1d] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>¿Qué especialidad buscas?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Especialidad</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option>Cardiología</option>
                                        <option>Dermatología</option>
                                        <option>Medicina General</option>
                                        <option>Pediatría</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Sede</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option>Sede Principal San Isidro</option>
                                        <option>Sede Surco</option>
                                        <option>Sede La Molina</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Médico (Opcional)</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option>Cualquier médico</option>
                                        <option>Dr. Sarah Jenkins</option>
                                        <option>Dr. Roberto Carlos</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time Selection */}
                    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 flex flex-col md:flex-row gap-10">

                        {/* Calendar */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Fecha</h2>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 rounded-lg hover:bg-[#f8f9fa] text-[#475569] transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="font-bold text-[#191c1d]">Octubre 2023</span>
                                    <button className="p-1.5 rounded-lg hover:bg-[#f8f9fa] text-[#475569] transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {weekDays.map(day => (
                                    <div key={day} className="text-[12px] font-bold text-[#64748b] py-2">{day}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {blanks.map(blank => (
                                    <div key={`blank-${blank}`} className="p-2"></div>
                                ))}
                                {days.map(day => {
                                    const isSelected = selectedDate === day;
                                    const isPast = day < 20; // Mocking past days

                                    return (
                                        <button
                                            key={day}
                                            onClick={() => !isPast && setSelectedDate(day)}
                                            disabled={isPast}
                                            className={`
                        aspect-square flex items-center justify-center rounded-full text-sm font-semibold transition-all relative
                        ${isSelected ? 'bg-[#003f87] text-white shadow-md' : ''}
                        ${!isSelected && !isPast ? 'hover:bg-[#eff6ff] text-[#191c1d]' : ''}
                        ${isPast ? 'text-[#cbd5e1] cursor-not-allowed' : ''}
                      `}
                                        >
                                            {day}
                                            {isSelected && (
                                                <div className="absolute -bottom-1 w-1 h-1 bg-[#003f87] rounded-full"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="flex-[1.2] border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-8 md:pt-0 md:pl-10">
                            <h2 className="text-xl font-extrabold text-[#191c1d] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Hora disponible</h2>

                            <div className="mb-6">
                                <h3 className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#fcd34d]"></div>
                                    Mañana
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {morningTimes.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                        py-2.5 px-2 rounded-xl text-[13px] font-bold transition-all border
                        ${selectedTime === time
                                                    ? 'bg-[#eff6ff] border-[#003f87] text-[#003f87] shadow-sm'
                                                    : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#cbd5e1] hover:bg-slate-50'
                                                }
                      `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                                    Tarde
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {afternoonTimes.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`
                        py-2.5 px-2 rounded-xl text-[13px] font-bold transition-all border
                        ${selectedTime === time
                                                    ? 'bg-[#eff6ff] border-[#003f87] text-[#003f87] shadow-sm'
                                                    : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#cbd5e1] hover:bg-slate-50'
                                                }
                      `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Column: Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 overflow-hidden sticky top-8">
                        <div className="h-2 w-full bg-gradient-to-r from-[#003f87] to-[#3b82f6]"></div>

                        <div className="p-6 md:p-8 flex flex-col gap-6">
                            <h2 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Resumen de cita</h2>

                            {/* Doctor Info */}
                            <div className="flex items-center gap-4 pb-6 border-b border-[#e2e8f0]/60">
                                <div className="w-14 h-14 bg-[#eff6ff] text-[#003f87] rounded-full flex items-center justify-center shrink-0 border border-[#dbeafe]">
                                    <Stethoscope className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#191c1d] text-lg leading-tight">Dr. Sarah Jenkins</h3>
                                    <p className="text-[#64748b] font-medium text-sm mt-0.5">Cardiología</p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex flex-col gap-5 pb-6 border-b border-[#e2e8f0]/60">
                                <div className="flex items-start gap-4">
                                    <CalendarIcon className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Fecha y Hora</p>
                                        <p className="text-[#191c1d] font-semibold mt-0.5">
                                            Oct {selectedDate || '--'}, 2023 a las {selectedTime || '--'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Ubicación</p>
                                        <p className="text-[#191c1d] font-semibold mt-0.5">Sede Principal San Isidro</p>
                                        <p className="text-[#64748b] text-sm mt-0.5">Av. Javier Prado Este 1066</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <CreditCard className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Precio de consulta</p>
                                        <p className="text-[#191c1d] font-bold text-lg mt-0.5">S/ 150.00</p>
                                    </div>
                                </div>
                            </div>

                            {/* Confirmation terms */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="peer appearance-none w-5 h-5 border-2 border-[#cbd5e1] rounded-md checked:bg-[#003f87] checked:border-[#003f87] transition-all cursor-pointer"
                                    />
                                    <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-sm text-[#475569] leading-relaxed group-hover:text-[#191c1d] transition-colors">
                                    He revisado los detalles y acepto los <a href="#" className="text-[#003f87] font-semibold hover:underline" onClick={(e) => e.preventDefault()}>términos y condiciones</a> de la reserva.
                                </span>
                            </label>

                            {/* Main CTA */}
                            <button
                                onClick={handleConfirm}
                                disabled={!termsAccepted}
                                className={`w-full py-4 px-4 rounded-xl font-bold transition-all mt-2 flex items-center justify-center gap-2 text-[15px] ${termsAccepted
                                    ? 'bg-[#003f87] hover:bg-[#002f66] text-white shadow-[0_4px_12px_rgba(0,63,135,0.2)] transform hover:-translate-y-0.5'
                                    : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                                    }`}
                            >
                                {isReschedule ? 'Reagendar cita' : 'Confirmar cita'}
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
