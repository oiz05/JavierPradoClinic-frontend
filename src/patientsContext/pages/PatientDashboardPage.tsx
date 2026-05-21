import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardCard from '../components/DashboardCard';
import UpcomingAppointmentsTable from '../components/UpcomingAppointmentsTable';
import { useState } from 'react';
import { CalendarDays, FileText, History } from 'lucide-react';

const PatientDashboardPage = () => {
    const [activeTab, setActiveTab] = useState<'Overview' | 'History' | 'Support'>('Overview');

    const topCards = [
        {
            icon: CalendarDays,
            iconClassName: 'text-[#0d5db8]',
            iconWrapperClassName: 'bg-[#eaf2ff]',
            badge: 'Confirmed',
            badgeClassName: 'bg-[#80f98b] text-[#007327]',
            title: 'Next Appointment',
            description: ['Tomorrow at 10:00 AM', 'Dr. Sarah Jenkins, Cardiology'],
            action: 'RESCHEDULE',
            actionVariant: 'primary' as const,
        },
        {
            icon: FileText,
            iconClassName: 'text-[#6b7280]',
            iconWrapperClassName: 'bg-[#f3f4f6]',
            badge: '2 Tasks',
            badgeClassName: 'bg-[#e1e3e4] text-[#424752]',
            title: 'Pending Documentation',
            description: ['Pre-visit forms required for your', 'upcoming Dermatology visit.'],
            action: 'COMPLETE NOW',
            actionVariant: 'secondary' as const,
        },
        {
            icon: History,
            iconClassName: 'text-[#b42318]',
            iconWrapperClassName: 'bg-[#fff1f0]',
            badge: '',
            badgeClassName: '',
            title: 'Recent Updates',
            description: ['1 appointment cancelled this month. 3', 'lab results available.'],
            action: 'VIEW HISTORY',
            actionVariant: 'secondaryMuted' as const,
        },
    ];

    return (
        <main className="bg-[#f8f9fa] min-h-screen">
            <div className="flex w-full items-stretch">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Topbar activeTab={activeTab} onTabChange={setActiveTab} />
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                            <header className="flex flex-col gap-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-[#191c1d] tracking-[-0.64px]">
                                    Good morning, Maria.
                                </h1>
                                <p className="text-base font-normal text-[#424752]">
                                    Here is an overview of your upcoming care schedule.
                                </p>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {topCards.map((card) => (
                                    <DashboardCard key={card.title} card={card} />
                                ))}
                            </div>

                            <UpcomingAppointmentsTable />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PatientDashboardPage;
