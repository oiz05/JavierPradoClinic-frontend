import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "../../ui/card";

interface FeatureCardProps {
    icon: LucideIcon;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    return (
        <Card className="rounded-xl border border-solid border-[#c2c6d44c] bg-[#f8f9fa] shadow-[0px_1px_2px_#0000000d]">
            <CardContent className="flex h-full min-h-[238px] flex-col items-start gap-4 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003f870d]">
                    <Icon className="h-5 w-5 text-[#003f87]" />
                </div>
                <div className="flex w-full flex-col items-start">
                    <h3
                        className="self-stretch text-xl font-semibold leading-7 tracking-[0] text-[#191c1d]"
                        style={{ fontFamily: "'Manrope', Helvetica" }}
                    >
                        {title}
                    </h3>
                </div>
                <div className="flex w-full flex-col items-start">
                    <p
                        className="self-stretch text-sm font-normal leading-5 tracking-[0] text-[#424752]"
                        style={{ fontFamily: "'Inter', Helvetica" }}
                    >
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
