import { Shield } from "lucide-react";
import { Button } from "../../ui/button";
import { Link, useNavigate } from "react-router";

const navigationItems = [
  { label: "Inicio", active: true },
  { label: "Especialidades", active: false },
  { label: "Médicos", active: false },
  { label: "Citas", active: false },
];

export function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role === 'PATIENT') {
          navigate('/patient/dashboard');
          return;
        }
      } catch (err) {}
    }
    navigate('/auth/login');
  };

  return (
    <header className="relative z-20 w-full border-b border-[#c2c6d44c] bg-[#f8f9fae6] backdrop-blur-[6px]">
      <div className="mx-auto flex h-[72px] w-full max-w-screen-xl items-center justify-between gap-6 px-6">
        <a href="#" className="flex min-w-0 items-center gap-2" aria-label="Clínica Javier Prado">
          <Shield className="h-6 w-6 text-[#003f87] shrink-0" />
          <span className="font-extrabold text-2xl leading-8 tracking-[-0.60px] text-[#003f87] whitespace-nowrap" style={{ fontFamily: "'Manrope', Helvetica" }}>
            Clínica Javier Prado
          </span>
        </a>

        <nav aria-label="Navegación principal" className="hidden md:flex items-center">
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={`h-auto whitespace-nowrap bg-transparent p-0 text-sm leading-5 tracking-[0] transition-colors ${item.active
                    ? "font-medium text-[#003f87]"
                    : "font-normal text-[#424752] hover:text-[#003f87]"
                    }`}
                  style={{ fontFamily: "'Inter', Helvetica" }}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleLoginClick}
            className="h-auto rounded-lg px-4 py-2 text-[#003f87] hover:bg-[#003f87]/5 hover:text-[#003f87]"
          >
            <span className="text-xs font-normal leading-4 tracking-[0.60px]" style={{ fontFamily: "'Inter', Helvetica" }}>
              Iniciar sesión
            </span>
          </Button>
          <Button
            type="button"
            className="h-auto rounded-lg bg-[#003f87] px-4 py-2 text-white shadow-[0px_1px_2px_#0000000d] hover:bg-[#003f87]/90"
          >
            <span className="text-xs font-normal leading-4 tracking-[0.60px]" style={{ fontFamily: "'Inter', Helvetica" }}>
              Agendar cita
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
