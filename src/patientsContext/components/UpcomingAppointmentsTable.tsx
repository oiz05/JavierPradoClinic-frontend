import { Heart, Stethoscope, Plus, Filter } from 'lucide-react';

const UpcomingAppointmentsTable = () => {
    const appointments = [
        {
            icon: Heart,
            iconClassName: 'text-[#0d5db8]',
            iconWrapperClassName: 'bg-[#eaf2ff]',
            specialty: 'Cardiology',
            doctor: 'Dr. Sarah Jenkins',
            date: 'Oct 24, 2023',
            time: '10:00 AM',
            status: 'Confirmed',
            statusClassName: 'bg-[#80f98b] text-[#007327]',
            actions: [
                { label: 'RESCHEDULE', className: 'text-[#003f87]' },
                { label: 'CANCEL', className: 'text-[#ba1a1a]' },
            ],
        },
        {
            icon: Stethoscope,
            iconClassName: 'text-[#6b7280]',
            iconWrapperClassName: 'bg-[#f3f4f6]',
            specialty: 'Dermatology',
            doctor: 'Dr. Michael Chen',
            date: 'Nov 02, 2023',
            time: '02:15 PM',
            status: 'Pending',
            statusClassName: 'bg-[#e1e3e4] text-[#424752]',
            actions: [{ label: 'CONTACT', className: 'text-[#003f87]' }],
        },
        {
            icon: Plus,
            iconClassName: 'text-[#0d5db8]',
            iconWrapperClassName: 'bg-[#eaf2ff]',
            specialty: 'General Practice',
            doctor: 'Dr. Emily Stone',
            date: 'Nov 15, 2023',
            time: '09:00 AM',
            status: 'Confirmed',
            statusClassName: 'bg-[#80f98b] text-[#007327]',
            actions: [
                { label: 'RESCHEDULE', className: 'text-[#003f87]' },
                { label: 'CANCEL', className: 'text-[#ba1a1a]' },
            ],
        },
    ];

    return (
        <div className="rounded-lg border border-[#e1e3e4] bg-white shadow-[0px_4px_12px_#0000000d] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#e1e3e4] p-6">
                <h2 className="text-xl font-semibold leading-7 text-[#191c1d]">
                    Upcoming Appointments
                </h2>
                <button className="flex items-center gap-1 px-0 py-0 text-xs font-normal tracking-[0.60px] text-[#003f87] hover:text-[#003f87] transition-colors">
                    <Filter className="h-3.5 w-3.5" />
                    FILTER
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[#e1e3e4] bg-[#f8f9fa]">
                            <th className="min-w-[260px] px-6 py-4 text-left text-xs font-normal tracking-[0.60px] text-[#424752]">
                                Specialty & Doctor
                            </th>
                            <th className="min-w-[160px] px-6 py-4 text-left text-xs font-normal tracking-[0.60px] text-[#424752]">
                                Date & Time
                            </th>
                            <th className="min-w-[140px] px-6 py-4 text-left text-xs font-normal tracking-[0.60px] text-[#424752]">
                                Status
                            </th>
                            <th className="min-w-[220px] px-6 py-4 text-right text-xs font-normal tracking-[0.60px] text-[#424752]">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => {
                            const Icon = appointment.icon;
                            return (
                                <tr
                                    key={index}
                                    className="border-b border-[#e1e3e4] hover:bg-[#f8f9fa] transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${appointment.iconWrapperClassName}`}
                                            >
                                                <Icon
                                                    className={`h-4 w-4 ${appointment.iconClassName}`}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-medium leading-6 text-[#191c1d]">
                                                    {appointment.specialty}
                                                </span>
                                                <span className="text-sm font-normal leading-5 text-[#424752]">
                                                    {appointment.doctor}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-normal leading-5">
                                            <div className="text-[#191c1d]">{appointment.date}</div>
                                            <div className="text-[#424752]">{appointment.time}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium leading-3 ${appointment.statusClassName}`}
                                        >
                                            {appointment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {appointment.actions.map((action, actionIndex) => (
                                                <button
                                                    key={actionIndex}
                                                    className={`px-3 py-1.5 text-xs font-normal tracking-[0.60px] hover:opacity-75 transition-opacity ${action.className}`}
                                                >
                                                    {action.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpcomingAppointmentsTable;
