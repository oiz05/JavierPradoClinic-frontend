import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

export function HeroSection() {
    return (
        <section className="relative w-full bg-[#f3f4f5]">
            <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:gap-10 lg:py-[120px]">
                {/* Left: text content */}
                <div className="flex flex-1 flex-col items-start gap-6">
                    <Badge className="inline-flex h-auto items-center gap-1.5 rounded-full bg-[#80f98b4c] border-transparent px-3 py-1.5 text-[#00531a] hover:bg-[#80f98b4c]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00531a]" />
                        <span className="text-xs font-medium leading-3 tracking-[0] whitespace-nowrap" style={{ fontFamily: "'Inter', Helvetica" }}>
                            Plataforma Médica Confiable
                        </span>
                    </Badge>

                    <h1
                        className="text-4xl font-normal leading-[44px] tracking-[-0.96px] text-transparent sm:text-5xl sm:leading-[56px]"
                        style={{ fontFamily: "'Manrope', Helvetica" }}
                    >
                        <span className="font-bold tracking-[-0.46px] text-[#191c1d]">
                            Agenda tus citas médicas
                            <br />
                            de forma{" "}
                        </span>
                        <span className="font-bold tracking-[-0.46px] text-[#003f87]">
                            rápida, segura e
                            <br />
                            inteligente
                        </span>
                    </h1>

                    <p
                        className="text-base font-normal leading-6 tracking-[0] text-[#424752] max-w-xl"
                        style={{ fontFamily: "'Inter', Helvetica" }}
                    >
                        Conecta con los mejores especialistas de MedSync Pro. Gestiona tu salud y
                        la de tu familia desde cualquier lugar con nuestra plataforma intuitiva,
                        diseñada para tu bienestar.
                    </p>

                    <div className="flex w-full flex-wrap items-center gap-4 pt-2">
                        <Button className="h-auto rounded-lg bg-[#003f87] px-6 py-3 text-white shadow-[0px_4px_12px_#003f8733] hover:bg-[#003f87]/90">
                            <CalendarDays className="h-4 w-4" />
                            <span className="text-center text-xs font-normal leading-4 tracking-[0.60px] whitespace-nowrap" style={{ fontFamily: "'Inter', Helvetica" }}>
                                Agendar cita ahora
                            </span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto rounded-lg border-[#c2c6d4] px-6 py-3 text-[#424752] hover:bg-transparent hover:text-[#424752]"
                        >
                            <span className="text-center text-xs font-normal leading-4 tracking-[0.60px] whitespace-nowrap" style={{ fontFamily: "'Inter', Helvetica" }}>
                                Conocer más
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Right: doctor image with confirmation card */}
                <div className="flex flex-1 flex-col items-start w-full">
                    <div className="relative w-full">
                        <div className="absolute inset-0 rounded-[32px] bg-[#003f870d] rotate-3" />
                        <div
                            className="relative min-h-[320px] w-full rounded-[32px] border border-solid border-[#c2c6d433] bg-cover bg-center shadow-[0px_8px_24px_#00000014] sm:h-[447px]"
                            style={{ backgroundImage: "url(https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800)" }}
                            aria-label="Doctor en consulta"
                        />
                        <Card className="absolute -bottom-5 left-4 border-[#c2c6d433] bg-[#f8f9fa] shadow-[0px_8px_24px_#0000001a] sm:-bottom-8 sm:-left-8">
                            <CardContent className="flex items-center gap-4 p-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#80f98b4c]">
                                    <CheckCircle2 className="h-6 w-6 text-[#00a32a]" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <p
                                        className="text-xl font-semibold leading-7 tracking-[0] text-[#191c1d] whitespace-nowrap"
                                        style={{ fontFamily: "'Manrope', Helvetica" }}
                                    >
                                        Cita Confirmada
                                    </p>
                                    <p
                                        className="text-sm font-normal leading-5 tracking-[0] text-[#424752] whitespace-nowrap"
                                        style={{ fontFamily: "'Inter', Helvetica" }}
                                    >
                                        Dra. Ramírez - Hoy 10:00 AM
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
