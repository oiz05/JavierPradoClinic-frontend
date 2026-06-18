import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, MapPin, Calendar as CalendarIcon, Clock, CreditCard, Stethoscope, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { BookingModal, type BookingStatus } from '../components/BookingModal';
import type { Appointment, AppointmentQuote, AppointmentType, AvailabilitySlot, Clinic, Doctor } from '../types/dtos';
import { createAppointment, getAppointmentQuote, getAppointmentTypes, getAvailability, getClinics, getDoctors, getMyAppointments, rescheduleAppointment } from '../api/patientApi';

function toDateInputValue(date: Date) {
    return date.toISOString().slice(0, 10);
}

function toDateTimeInputValue(date: string, time: string) {
    return `${date}T${time}`;
}

function formatMonth(date: Date) {
    return new Intl.DateTimeFormat('es-PE', { month: 'long', year: 'numeric' }).format(date);
}

function formatDateLabel(value: string) {
    return new Intl.DateTimeFormat('es-PE', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
}

function formatTime(value: string) {
    return value.slice(11, 16);
}

function timeValue(value: string) {
    return value.slice(11, 16);
}

function hourValue(value: string) {
    return Number(timeValue(value).slice(0, 2));
}

export function MakeAppointmentPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isReschedule = searchParams.get('reschedule') === 'true';
    const appointmentId = Number(searchParams.get('appointmentId')) || null;

    const today = useMemo(() => new Date(), []);
    const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(toDateInputValue(today));
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
    const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
    const [quote, setQuote] = useState<AppointmentQuote | null>(null);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | ''>('');
    const [selectedClinicId, setSelectedClinicId] = useState<number | ''>('');
    const [selectedAppointmentTypeId, setSelectedAppointmentTypeId] = useState<number | ''>('');
    const [existingAppointment, setExistingAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [modalStatus, setModalStatus] = useState<BookingStatus>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const specialties = useMemo(() => Array.from(new Set(doctors.map((doctor) => doctor.medicalSpecialty))).sort(), [doctors]);
    const filteredDoctors = useMemo(() => selectedSpecialty ? doctors.filter((doctor) => doctor.medicalSpecialty === selectedSpecialty) : [], [doctors, selectedSpecialty]);
    const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId);
    const selectedClinic = clinics.find((clinic) => clinic.id === selectedClinicId);
    const selectedAppointmentType = appointmentTypes.find((type) => type.id === selectedAppointmentTypeId);
    const selectedSlot = availability.find((slot) => timeValue(slot.startAt) === selectedTime);
    const price = selectedSlot?.price ?? quote?.price;
    const currency = selectedSlot?.currency ?? quote?.currency ?? 'PEN';
    const canLoadAvailability = Boolean(selectedDoctorId && selectedClinicId && selectedAppointmentTypeId && selectedDate);

    const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
    const availableSlots = availability.filter((slot) => slot.available);
    const morningSlots = availableSlots.filter((slot) => hourValue(slot.startAt) < 12);
    const afternoonSlots = availableSlots.filter((slot) => hourValue(slot.startAt) >= 12);

    useEffect(() => {
        async function loadCatalogs() {
            setLoading(true);
            try {
                const [doctorsData, clinicsData, appointmentTypesData, appointmentsData] = await Promise.all([
                    getDoctors(),
                    getClinics(),
                    getAppointmentTypes(),
                    appointmentId ? getMyAppointments() : Promise.resolve([]),
                ]);

                setDoctors(doctorsData);
                setClinics(clinicsData);
                setAppointmentTypes(appointmentTypesData);

                const appointment = appointmentsData.find((item) => item.id === appointmentId) ?? null;
                setExistingAppointment(appointment);

                if (isReschedule && appointment) {
                    const appointmentDate = appointment.appointmentDate.slice(0, 10);
                    setSelectedSpecialty(appointment.medicalSpecialty);
                    setSelectedDoctorId(appointment.doctorProfileId);
                    setSelectedClinicId(appointment.clinicId);
                    setSelectedAppointmentTypeId(appointment.appointmentTypeId);
                    setSelectedDate(appointmentDate);
                    setSelectedTime(appointment.appointmentDate.slice(11, 16));
                    setVisibleMonth(new Date(`${appointmentDate}T00:00:00`));
                } else {
                    setSelectedSpecialty('');
                    setSelectedDoctorId('');
                    setSelectedClinicId('');
                    setSelectedAppointmentTypeId('');
                    setSelectedTime(null);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        void loadCatalogs();
    }, [appointmentId, isReschedule]);

    useEffect(() => {
        if (!canLoadAvailability) {
            setAvailability([]);
            setQuote(null);
            setLoadingAvailability(false);
            return;
        }

        let ignore = false;

        async function loadAvailability() {
            setLoadingAvailability(true);
            try {
                const slots = await getAvailability({
                    doctorProfileId: Number(selectedDoctorId),
                    clinicId: Number(selectedClinicId),
                    appointmentTypeId: Number(selectedAppointmentTypeId),
                    date: selectedDate,
                });
                if (ignore) return;
                setAvailability(slots);
            } catch (error) {
                if (ignore) return;
                console.error(error);
                setAvailability([]);
                setSelectedTime(null);
            } finally {
                if (!ignore) setLoadingAvailability(false);
            }
        }

        async function loadQuote() {
            try {
                const quoteData = await getAppointmentQuote({
                    doctorProfileId: Number(selectedDoctorId),
                    appointmentTypeId: Number(selectedAppointmentTypeId),
                    appointmentDate: selectedDate,
                });
                if (ignore) return;
                setQuote(quoteData);
            } catch (error) {
                if (ignore) return;
                console.error(error);
                setQuote(null);
            }
        }

        void loadAvailability();
        void loadQuote();

        return () => {
            ignore = true;
        };
    }, [canLoadAvailability, selectedAppointmentTypeId, selectedClinicId, selectedDate, selectedDoctorId]);

    function clearAvailabilitySelection() {
        setSelectedTime(null);
        setAvailability([]);
        setQuote(null);
    }

    function handleSpecialtyChange(value: string) {
        setSelectedSpecialty(value);
        setSelectedDoctorId('');
        clearAvailabilitySelection();
    }

    function handleClinicChange(value: string) {
        setSelectedClinicId(value ? Number(value) : '');
        clearAvailabilitySelection();
    }

    function handleDoctorChange(value: string) {
        setSelectedDoctorId(value ? Number(value) : '');
        clearAvailabilitySelection();
    }

    function handleAppointmentTypeChange(value: string) {
        setSelectedAppointmentTypeId(value ? Number(value) : '');
        clearAvailabilitySelection();
    }

    async function handleConfirm() {
        if (!termsAccepted || !selectedDoctorId || !selectedClinicId || !selectedAppointmentTypeId || !selectedTime) return;
        setSubmitting(true);
        try {
            const appointmentDate = toDateTimeInputValue(selectedDate, selectedTime);
            if (isReschedule && existingAppointment) {
                await rescheduleAppointment(existingAppointment.id, appointmentDate);
            } else {
                await createAppointment({
                    doctorProfileId: Number(selectedDoctorId),
                    clinicId: Number(selectedClinicId),
                    appointmentTypeId: Number(selectedAppointmentTypeId),
                    appointmentDate,
                });
            }
            setModalStatus('success');
        } catch (error) {
            console.error(error);
            setModalStatus('error');
        } finally {
            setSubmitting(false);
            setIsModalOpen(true);
        }
    }

    function handleModalClose() {
        setIsModalOpen(false);
        setTimeout(() => setModalStatus(null), 300);
    }

    function handlePrimaryAction() {
        if (modalStatus === 'success') {
            navigate('/patient/dashboard');
        } else {
            handleModalClose();
        }
    }

    function handleSecondaryAction() {
        if (modalStatus === 'success') {
            navigate('/patient/dashboard');
        } else {
            handleModalClose();
        }
    }

    function selectDay(day: number) {
        const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day);
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
        setSelectedDate(toDateInputValue(date));
        clearAvailabilitySelection();
    }

    function renderSlots(slots: AvailabilitySlot[]) {
        if (!slots.length) {
            return <p className="text-sm text-[#64748b]">No hay horarios configurados.</p>;
        }

        return (
            <div className="grid grid-cols-3 gap-3">
                {slots.map((slot) => {
                    const value = timeValue(slot.startAt);
                    return (
                        <button
                            key={slot.startAt}
                            onClick={() => slot.available && setSelectedTime(value)}
                            disabled={!slot.available}
                            className={`py-2.5 px-2 rounded-xl text-[13px] font-bold transition-all border ${selectedTime === value
                                ? 'bg-[#eff6ff] border-[#003f87] text-[#003f87] shadow-sm'
                                : slot.available
                                    ? 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#cbd5e1] hover:bg-slate-50'
                                    : 'bg-[#f8f9fa] border-[#e2e8f0] text-[#cbd5e1] cursor-not-allowed'
                                }`}
                        >
                            {formatTime(slot.startAt)}
                        </button>
                    );
                })}
            </div>
        );
    }

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
                    date: formatDateLabel(selectedDate),
                    time: selectedTime || '',
                    location: selectedClinic?.name || '',
                    doctor: selectedDoctor ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}` : ''
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
                    {isReschedule ? 'Selecciona una nueva fecha y horario para tu cita.' : 'Selecciona los detalles para tu próxima consulta médica.'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50">
                        <h2 className="text-xl font-extrabold text-[#191c1d] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>¿Qué especialidad buscas?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Especialidad</label>
                                <div className="relative">
                                    <select value={selectedSpecialty} onChange={(event) => handleSpecialtyChange(event.target.value)} className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option value="">Selecciona una especialidad</option>
                                        {specialties.map((specialty) => <option key={specialty} value={specialty}>{specialty}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Sede</label>
                                <div className="relative">
                                    <select value={selectedClinicId} onChange={(event) => handleClinicChange(event.target.value)} className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option value="">Selecciona una sede</option>
                                        {clinics.map((clinic) => <option key={clinic.id} value={clinic.id}>{clinic.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Médico</label>
                                <div className="relative">
                                    <select value={selectedDoctorId} onChange={(event) => handleDoctorChange(event.target.value)} disabled={!selectedSpecialty} className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer disabled:cursor-not-allowed disabled:text-[#94a3b8]">
                                        <option value="">Selecciona un médico</option>
                                        {filteredDoctors.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.firstName} {doctor.lastName}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide">Tipo</label>
                                <div className="relative">
                                    <select value={selectedAppointmentTypeId} onChange={(event) => handleAppointmentTypeChange(event.target.value)} className="w-full appearance-none bg-[#f8f9fa] border border-[#e2e8f0] text-[#191c1d] font-semibold rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#003f87]/20 focus:border-[#003f87] transition-all cursor-pointer">
                                        <option value="">Selecciona un tipo</option>
                                        {appointmentTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 flex flex-col md:flex-row gap-10">
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Fecha</h2>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))} className="p-1.5 rounded-lg hover:bg-[#f8f9fa] text-[#475569] transition-colors">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="font-bold text-[#191c1d] capitalize">{formatMonth(visibleMonth)}</span>
                                    <button onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))} className="p-1.5 rounded-lg hover:bg-[#f8f9fa] text-[#475569] transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {weekDays.map(day => <div key={day} className="text-[12px] font-bold text-[#64748b] py-2">{day}</div>)}
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center">
                                {blanks.map(blank => <div key={`blank-${blank}`} className="p-2"></div>)}
                                {days.map(day => {
                                    const value = toDateInputValue(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day));
                                    const isSelected = selectedDate === value;
                                    const isPast = new Date(`${value}T00:00:00`) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => selectDay(day)}
                                            disabled={isPast}
                                            className={`aspect-square flex items-center justify-center rounded-full text-sm font-semibold transition-all relative ${isSelected ? 'bg-[#003f87] text-white shadow-md' : ''} ${!isSelected && !isPast ? 'hover:bg-[#eff6ff] text-[#191c1d]' : ''} ${isPast ? 'text-[#cbd5e1] cursor-not-allowed' : ''}`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-[1.2] border-t md:border-t-0 md:border-l border-[#e2e8f0] pt-8 md:pt-0 md:pl-10">
                            <h2 className="text-xl font-extrabold text-[#191c1d] mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>Hora disponible</h2>
                            {loading ? <p className="text-sm text-[#64748b]">Cargando catálogos...</p> : null}
                            {!loading && !canLoadAvailability ? <p className="text-sm text-[#64748b]">Selecciona especialidad, sede, médico y tipo para ver horarios disponibles.</p> : null}
                            {loadingAvailability ? <p className="text-sm text-[#64748b]">Cargando disponibilidad...</p> : null}
                            {!loadingAvailability && canLoadAvailability && !availableSlots.length ? <p className="text-sm text-[#64748b]">No hay horarios disponibles para esta combinación.</p> : null}
                            {!loadingAvailability && availableSlots.length ? (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#fcd34d]"></div>
                                            Mañana
                                        </h3>
                                        {renderSlots(morningSlots)}
                                    </div>

                                    <div>
                                        <h3 className="text-[13px] font-bold text-[#64748b] uppercase tracking-wide mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[#f97316]"></div>
                                            Tarde
                                        </h3>
                                        {renderSlots(afternoonSlots)}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e1e3e4]/50 overflow-hidden sticky top-8">
                        <div className="h-2 w-full bg-gradient-to-r from-[#003f87] to-[#3b82f6]"></div>
                        <div className="p-6 md:p-8 flex flex-col gap-6">
                            <h2 className="text-xl font-extrabold text-[#191c1d]" style={{ fontFamily: "'Manrope', sans-serif" }}>Resumen de cita</h2>
                            <div className="flex items-center gap-4 pb-6 border-b border-[#e2e8f0]/60">
                                <div className="w-14 h-14 bg-[#eff6ff] text-[#003f87] rounded-full flex items-center justify-center shrink-0 border border-[#dbeafe]">
                                    <Stethoscope className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#191c1d] text-lg leading-tight">{selectedDoctor ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}` : 'Selecciona un médico'}</h3>
                                    <p className="text-[#64748b] font-medium text-sm mt-0.5">{selectedDoctor?.medicalSpecialty || '--'}</p>
                                    <p className="text-[#64748b] text-sm mt-0.5">{selectedAppointmentType?.name || '--'}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 pb-6 border-b border-[#e2e8f0]/60">
                                <div className="flex items-start gap-4">
                                    <CalendarIcon className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Fecha y Hora</p>
                                        <p className="text-[#191c1d] font-semibold mt-0.5">{formatDateLabel(selectedDate)} a las {selectedTime || '--'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Ubicación</p>
                                        <p className="text-[#191c1d] font-semibold mt-0.5">{selectedClinic?.name || '--'}</p>
                                        <p className="text-[#64748b] text-sm mt-0.5">{selectedClinic?.address || '--'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <CreditCard className="w-5 h-5 text-[#003f87] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold text-[#64748b] uppercase tracking-wide">Precio de consulta</p>
                                        <p className="text-[#191c1d] font-bold text-lg mt-0.5">{price != null ? `${currency === 'PEN' ? 'S/' : currency} ${Number(price).toFixed(2)}` : '--'}</p>
                                    </div>
                                </div>
                            </div>

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

                            <button
                                onClick={() => void handleConfirm()}
                                disabled={!termsAccepted || !selectedTime || submitting}
                                className={`w-full py-4 px-4 rounded-xl font-bold transition-all mt-2 flex items-center justify-center gap-2 text-[15px] ${termsAccepted && selectedTime && !submitting
                                    ? 'bg-[#003f87] hover:bg-[#002f66] text-white shadow-[0_4px_12px_rgba(0,63,135,0.2)] transform hover:-translate-y-0.5'
                                    : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                                    }`}
                            >
                                {submitting ? 'Procesando...' : isReschedule ? 'Reagendar cita' : 'Confirmar cita'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
