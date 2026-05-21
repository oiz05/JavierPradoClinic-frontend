import { BarChart3, Calendar, Users, Clock, MessageSquare, Settings } from 'lucide-react';

const Sidebar = () => {
    const navigationItems = [
        { label: 'Dashboard', icon: BarChart3, active: true },
        { label: 'Appointments', icon: Calendar, active: false },
        { label: 'Patients', icon: Users, active: false },
        { label: 'Schedules', icon: Clock, active: false },
        { label: 'Messages', icon: MessageSquare, active: false },
        { label: 'Settings', icon: Settings, active: false },
    ];

    return (
        <aside className="hidden md:flex w-64 flex-col justify-between border-r border-slate-200 bg-white p-6 shadow-[4px_0px_12px_#00000005]">
            <div className="flex flex-col">
                <header className="flex flex-col pb-6">
                    <div className="flex items-center gap-3 px-2 py-4">
                        <div className="h-10 w-10 rounded-lg bg-blue-700 flex items-center justify-center shrink-0">
                            <span className="text-white font-bold text-sm">JP</span>
                        </div>
                        <div className="flex flex-col items-start min-w-0">
                            <h2 className="text-xl font-bold text-blue-700 leading-tight">
                                Javier Prado
                            </h2>
                            <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">
                                Health Management
                            </p>
                        </div>
                    </div>
                </header>

                <nav className="flex flex-1 flex-col gap-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${item.active
                                        ? 'bg-blue-50 opacity-90'
                                        : 'hover:bg-slate-50'
                                    }`}
                            >
                                <Icon
                                    className={`h-5 w-5 shrink-0 ${item.active ? 'text-blue-700' : 'text-slate-600'
                                        }`}
                                />
                                <span
                                    className={`text-sm leading-5 tracking-[-0.35px] ${item.active
                                            ? 'font-bold text-blue-700'
                                            : 'font-medium text-slate-600'
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="pt-4">
                <button className="w-full rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white shadow-[0px_1px_2px_#0000000d] hover:bg-blue-800 transition-colors">
                    Book Appointment
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
