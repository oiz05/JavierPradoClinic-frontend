import { Video } from 'lucide-react';

interface DashboardCardProps {
    card: {
        icon: typeof Video;
        iconClassName: string;
        iconWrapperClassName: string;
        badge: string;
        badgeClassName: string;
        title: string;
        description: string[];
        action: string;
        actionVariant: 'primary' | 'secondary' | 'secondaryMuted';
    };
}

const DashboardCard = ({ card }: DashboardCardProps) => {
    const Icon = card.icon;

    const buttonStyles = {
        primary: 'bg-[#003f87] text-white hover:bg-[#003676]',
        secondary: 'border border-[#e1e3e4] bg-white text-[#003f87] hover:bg-slate-50',
        secondaryMuted:
            'border border-[#e1e3e4] bg-white text-[#424752] hover:bg-slate-50',
    };

    return (
        <div className="rounded-lg border border-[#e1e3e4] bg-white shadow-[0px_4px_12px_#0000000d] p-6 flex flex-col h-full">
            <div className="mb-4 flex items-start justify-between">
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${card.iconWrapperClassName}`}
                >
                    <Icon className={`h-5 w-5 ${card.iconClassName}`} />
                </div>
                {card.badge && (
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium leading-3 ${card.badgeClassName}`}
                    >
                        {card.badge}
                    </span>
                )}
            </div>
            <div className="pb-1">
                <h2 className="text-xl font-semibold leading-7 text-[#191c1d]">
                    {card.title}
                </h2>
            </div>
            <div className="pb-4">
                <p className="text-sm font-normal leading-5 text-[#424752]">
                    {card.description[0]}
                    <br />
                    {card.description[1]}
                </p>
            </div>
            <button
                className={`mt-auto w-full rounded-lg px-4 py-2 text-xs font-normal tracking-[0.60px] transition-colors ${buttonStyles[card.actionVariant]}`}
            >
                {card.action}
            </button>
        </div>
    );
};

export default DashboardCard;
