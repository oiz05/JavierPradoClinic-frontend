import { Search, Bell, HelpCircle } from 'lucide-react';

interface TopbarProps {
    activeTab: 'Overview' | 'History' | 'Support';
    onTabChange: (tab: 'Overview' | 'History' | 'Support') => void;
}

const Topbar = ({ activeTab, onTabChange }: TopbarProps) => {
    const tabs = ['Overview', 'History', 'Support'] as const;

    return (
        <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-slate-200 bg-[#ffffffcc] px-6 md:px-8 py-3 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]">
            <div className="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
                <div className="relative w-full max-w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        className="w-full h-9 rounded-full border border-slate-200 bg-slate-100 pl-9 text-sm text-slate-500 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                    />
                </div>
                <nav aria-label="Section navigation" className="hidden md:flex">
                    <ul className="flex items-center gap-8">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <li key={tab}>
                                    <button
                                        type="button"
                                        onClick={() => onTabChange(tab)}
                                        className={`inline-flex items-center border-b-2 text-sm leading-5 transition-colors pb-1.5 pt-2 ${isActive
                                                ? 'border-blue-700 text-blue-700'
                                                : 'border-transparent text-slate-500 hover:text-slate-700'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <div className="ml-4 md:ml-6 flex items-center gap-4">
                <button
                    type="button"
                    aria-label="Notifications"
                    className="text-slate-500 transition-colors hover:text-slate-700"
                >
                    <Bell className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    aria-label="Help"
                    className="text-slate-500 transition-colors hover:text-slate-700"
                >
                    <HelpCircle className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    aria-label="Profile"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2f3a4a] text-xs font-semibold text-white"
                >
                    M
                </button>
            </div>
        </div>
    );
};

export default Topbar;
