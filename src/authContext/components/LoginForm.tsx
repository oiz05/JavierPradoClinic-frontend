import { useState, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import type { LoginRequestDTO, TokenDTO, UserDTO } from '../types/dtos';
import apiClient from '../../shared/apiClient.ts';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            try {
                const parsedUser = JSON.parse(user);
                if (parsedUser.role === 'PATIENT') {
                    navigate('/patient/dashboard');
                }
            } catch (e) {
                // If there's an error parsing the user, we just ignore and stay on login
            }
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const loginRequestDTO: LoginRequestDTO = {
                email,
                password,
            };

            const response = await apiClient.post<TokenDTO | string>(
                '/auth/login',
                loginRequestDTO
            );

            const token =
                typeof response.data === 'string'
                    ? response.data
                    : response.data?.token;

            if (!token) {
                throw new Error('No token was received');
            }

            localStorage.setItem('token', token);

            const user = await apiClient.get<UserDTO>('/users/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            localStorage.setItem('user', JSON.stringify(user.data));
            console.log(user.data);

            if (user.data.role === 'PATIENT') {
                navigate('/patient/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <header className="pb-8">
                <h1
                    className="text-2xl font-semibold leading-8 tracking-[-0.24px] text-[#191c1d]"
                    style={{ fontFamily: "'Manrope', Helvetica, sans-serif" }}
                >
                    Acceso al Sistema
                </h1>
                <p
                    className="mt-1 text-sm font-normal leading-5 text-[#424752]"
                    style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                >
                    Ingrese sus credenciales o registre una nueva cuenta.
                </p>
            </header>

            <section aria-labelledby="login-title" className="w-full">
                <div className="border-b border-[#e1e3e4] pb-2">
                    <h2
                        id="login-title"
                        className="text-xl font-semibold leading-7 text-[#191c1d]"
                        style={{ fontFamily: "'Manrope', Helvetica, sans-serif" }}
                    >
                        Iniciar Sesión
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-xs font-normal leading-4 tracking-[0.6px] text-[#424752]"
                            style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                        >
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@clinica.com"
                            className="h-8 w-full rounded-lg border border-[#727784] bg-[#f8f9fa] px-2 py-[9px] text-sm font-normal text-[#191c1d] placeholder:text-[#c2c6d4] focus:outline-none focus:border-[#003f87] transition-colors"
                            style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-xs font-normal leading-4 tracking-[0.6px] text-[#424752]"
                            style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="h-8 w-full rounded-lg border border-[#727784] bg-[#f8f9fa] px-2 py-[9px] text-sm font-normal text-[#191c1d] placeholder:text-[#c2c6d4] focus:outline-none focus:border-[#003f87] transition-colors"
                            style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                        />
                    </div>

                    {/* Remember + Recover */}
                    <div className="flex items-center justify-between pt-4">
                        <label
                            htmlFor="remember"
                            className="inline-flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                id="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 rounded border border-[#727784] accent-[#003f87] cursor-pointer"
                            />
                            <span
                                className="text-sm font-normal leading-5 text-[#424752]"
                                style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                            >
                                Recordarme
                            </span>
                        </label>
                        <button
                            type="button"
                            className="text-sm font-medium leading-5 text-[#003f87] hover:underline"
                            style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                        >
                            Recuperar contraseña
                        </button>
                    </div>

                    {/* Submit */}
                    <div className="pt-12">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 h-auto w-full rounded-lg bg-[#003f87] px-4 py-2.5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#002f66] active:bg-[#002055] transition-colors"
                        >
                            <span
                                className="text-xs font-normal leading-4 tracking-[0.6px] text-white"
                                style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                            >
                                Ingresar
                            </span>
                            <LogIn className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </form>
            </section>

            {/* New user section */}
            <div className="pt-6">
                <div className="flex items-center py-2">
                    <div className="flex-1 h-px bg-[#e1e3e4]" />
                    <span
                        className="px-4 text-xs font-normal leading-4 tracking-[0.6px] text-[#727784]"
                        style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                    >
                        NUEVO USUARIO
                    </span>
                    <div className="flex-1 h-px bg-[#e1e3e4]" />
                </div>
                <p
                    className="pt-8 text-base font-normal leading-5 text-[#424752]"
                    style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                >
                    ¿Todavía no tiene una cuenta?{' '}
                    <button
                        type="button"
                        className="text-base font-extrabold text-[#424752] underline underline-offset-2 hover:text-[#003f87] transition-colors"
                        style={{ fontFamily: "'Inter', Helvetica, sans-serif" }}
                    >
                        <Link to="/auth/register">
                            Presione aquí
                        </Link>
                    </button>
                </p>
            </div>
        </>
    );
}
