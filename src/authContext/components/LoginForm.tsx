import { useState, useEffect } from 'react';
import { AlertCircle, LogIn } from 'lucide-react';
import { Link, useNavigate } from "react-router";
import type { AuthErrorResponseDTO, LoginRequestDTO, TokenDTO, UserDTO } from '../types/dtos';
import apiClient from '../../shared/apiClient.ts';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        let isMounted = true;

        apiClient.get<UserDTO>('/users/me')
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                if (response.data.emailVerified && response.data.role === 'PATIENT') {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    navigate('/patient/dashboard');
                    return;
                }

                localStorage.removeItem('token');
                localStorage.removeItem('user');
            })
            .catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

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

            if (user.data.emailVerified && user.data.role === 'PATIENT') {
                navigate('/patient/dashboard');
                return;
            }

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setError('Debes verificar tu correo antes de iniciar sesion.');
        } catch (err: any) {
            console.error(err);
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            const authError = err.response?.data as AuthErrorResponseDTO | undefined;
            if (authError?.code === 'EMAIL_NOT_VERIFIED') {
                navigate('/auth/verify-email', {
                    state: {
                        email: authError.email || email,
                        message: 'Tu correo aun no esta verificado. Ingresa el codigo o solicita uno nuevo.',
                    },
                });
                return;
            }

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('No se pudo iniciar sesion. Revisa tus credenciales.');
            }
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

                {error && (
                    <div className="mt-6 rounded-lg border border-[#ba1a1a] bg-[#ffdad6]/20 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 shrink-0 text-[#ba1a1a]" />
                            <p className="text-sm font-medium text-[#ba1a1a]">{error}</p>
                        </div>
                    </div>
                )}

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
