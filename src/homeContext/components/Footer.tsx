import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t border-[#c2c6d44c] bg-[#e1e3e4]">
            <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#003f87] shrink-0" />
                    <p
                        className="text-xl font-semibold leading-7 tracking-[0] text-[#191c1d]"
                        style={{ fontFamily: "'Manrope', Helvetica" }}
                    >
                        Clínica Javier Prado
                    </p>
                </div>
                <p
                    className="text-sm font-normal leading-5 tracking-[0] text-[#424752] sm:text-right"
                    style={{ fontFamily: "'Inter', Helvetica" }}
                >
                    © 2026 Clínica Javier Prado. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
