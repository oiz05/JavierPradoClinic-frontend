import { ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-[#f8f9fa] grid grid-cols-1 lg:grid-cols-2">
            {/* Left panel */}
            <aside className="relative hidden lg:flex min-h-screen overflow-hidden bg-[#0056b3]">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    alt="Clínica Javier Prado corridor"
                    src="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1200"
                />
                <div className="absolute inset-0 bg-[#003f87] opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003f87e6] to-transparent" />
                <div className="relative z-10 flex w-full items-start p-6 xl:p-10">
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck className="h-8 w-8 text-white shrink-0" />
                        <span
                            className="text-white text-2xl font-semibold leading-8 tracking-[-0.6px]"
                            style={{ fontFamily: "'Manrope', Helvetica, sans-serif" }}
                        >
                            Clínica Javier Prado
                        </span>
                    </div>
                </div>
            </aside>

            {/* Right panel */}
            <section className="flex min-h-screen bg-[#f8f9fa]">
                <div className="mx-auto flex w-full max-w-[448px] flex-col px-8 py-[72px] sm:px-12 md:px-16 lg:px-12 xl:px-0">
                    {children}
                </div>
            </section>
        </main>
    );
}
