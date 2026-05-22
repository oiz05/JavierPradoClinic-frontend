import { Bell, Clock, Shield, Zap } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { Navbar } from "../components/Navbar";

const featureCards = [
    {
        icon: Clock,
        title: (
            <>
                Disponibilidad en tiempo
                <br />
                real
            </>
        ),
        description: (
            <>
                Encuentra horarios disponibles al instante y reserva sin esperas
                telefónicas.
            </>
        ),
    },
    {
        icon: Bell,
        title: (
            <>
                Recordatorios
                <br />
                automáticos
            </>
        ),
        description: (
            <>
                Recibe notificaciones por SMS o correo para que nunca olvides tu
                consulta.
            </>
        ),
    },
    {
        icon: Zap,
        title: <>Atención rápida</>,
        description: (
            <>
                Procesos optimizados en clínica para reducir tu tiempo de espera en
                sala.
            </>
        ),
    },
    {
        icon: Shield,
        title: <>Gestión segura</>,
        description: (
            <>
                Tus datos médicos protegidos con los más altos estándares de seguridad y
                privacidad.
            </>
        ),
    },
];

export function HomePage() {
    return (
        <main className="w-full min-h-screen bg-[#f8f9fa]">
            <Navbar />
            <HeroSection />

            {/* Features section */}
            <div className="mx-auto flex w-full max-w-screen-xl flex-col items-start gap-8 px-6 py-20">
                <div className="flex w-full flex-col items-center gap-2">
                    <h2
                        className="text-center text-2xl font-semibold leading-8 tracking-[-0.24px] text-[#191c1d]"
                        style={{ fontFamily: "'Manrope', Helvetica" }}
                    >
                        ¿Por qué elegir MedSync Pro?
                    </h2>
                    <p
                        className="text-center text-sm font-normal leading-5 tracking-[0] text-[#424752] max-w-2xl"
                        style={{ fontFamily: "'Inter', Helvetica" }}
                    >
                        Nuestra plataforma está diseñada para simplificar el acceso a la
                        salud, ofreciendo herramientas modernas para pacientes y
                        profesionales.
                    </p>
                </div>
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {/**
                     * I RENDER EACH ONE OF THE FEATURE CARDS
                     */}
                    {featureCards.map((card, index) => (
                        <FeatureCard
                            key={`feature-card-${index}`}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
