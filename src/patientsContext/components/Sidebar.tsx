import { CalendarPlus, LayoutDashboard, Settings, LogOut, Clock, ShieldPlus, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isDashboard = location.pathname === '/patient/dashboard';
    const isAgendar = location.pathname === '/patient/appointment';
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-[#191c1d]"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                w-[280px] bg-white border-r border-[#e2e8f0] flex flex-col justify-between shrink-0 shadow-[4px_0px_24px_rgba(0,0,0,0.02)] z-50
                fixed md:static inset-y-0 left-0 transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10 pl-2">
                    <div className="bg-[#eff6ff] text-[#1d4ed8] p-2.5 rounded-xl">
                        <ShieldPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-extrabold text-[#191c1d] text-[18px] leading-tight tracking-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>Javier Prado</h2>
                        <p className="text-[10px] font-bold text-[#64748b] tracking-[0.15em] uppercase mt-0.5">Health Management</p>
                    </div>
                </div>

                {/* Main CTA */}
                <Link
                    to="/patient/appointment"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[#003f87] hover:bg-[#002f66] text-white py-3.5 px-4 rounded-xl font-semibold shadow-[0_4px_12px_rgba(0,63,135,0.2)] transition-all flex items-center justify-center gap-2.5 mb-8 transform hover:-translate-y-0.5 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <CalendarPlus className="w-5 h-5 relative z-10" />
                    <span className="tracking-wide relative z-10">Agendar cita</span>
                </Link>

                <nav className="flex flex-col gap-2">
                    <Link
                        to="/patient/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${isDashboard ? 'bg-[#eff6ff] text-[#1d4ed8]' : 'text-[#475569] hover:bg-slate-50 hover:text-[#191c1d]'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <button className="flex items-center gap-3 px-4 py-3 text-[#475569] hover:bg-slate-50 hover:text-[#191c1d] rounded-xl font-medium transition-colors w-full text-left">
                        <Clock className="w-5 h-5" />
                        Citas agendadas
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 text-[#475569] hover:bg-slate-50 hover:text-[#191c1d] rounded-xl font-medium transition-colors w-full text-left">
                        <Settings className="w-5 h-5" />
                        Ajustes de perfil
                    </button>
                </nav>
            </div>

            <div className="p-6 border-t border-[#e2e8f0]/60">
                <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2.5 w-full px-4 py-3 text-[#475569] hover:bg-red-50 hover:text-[#ba1a1a] hover:border-[#ba1a1a]/30 border border-[#e2e8f0] rounded-xl font-semibold transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                </button>
            </div>
        </aside>
        </>
    );
}
