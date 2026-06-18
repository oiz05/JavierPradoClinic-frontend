import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from '../../shared/apiClient';
import type {
    MessageResponseDTO,
    ResendVerificationRequestDTO,
    VerifyEmailRequestDTO,
} from '../types/dtos';

interface VerifyEmailLocationState {
    email?: string;
}

export default function VerifyEmailForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state as VerifyEmailLocationState | null;
    const [email, setEmail] = useState(locationState?.email ?? '');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState<string | null>(
        locationState?.email ? 'Te enviamos un codigo de verificacion. Revisa tu correo.' : null
    );
    const [error, setError] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        if (!verified) {
            return;
        }

        const timeoutId = window.setTimeout(() => navigate('/auth/login'), 1800);
        return () => window.clearTimeout(timeoutId);
    }, [navigate, verified]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!email || !/^\d{6}$/.test(code)) {
            setError('Ingresa tu correo y un codigo de 6 digitos.');
            return;
        }

        const payload: VerifyEmailRequestDTO = { email, code };

        try {
            setLoading(true);
            const response = await axios.post<MessageResponseDTO>('/auth/verify-email', payload);
            setVerified(true);
            setMessage(response.data.message || 'Correo verificado correctamente.');
        } catch (err: any) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('No se pudo verificar el correo. Intentalo nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        setError(null);
        setMessage(null);

        if (!email) {
            setError('Ingresa tu correo para reenviar el codigo.');
            return;
        }

        const payload: ResendVerificationRequestDTO = { email };

        try {
            setResending(true);
            const response = await axios.post<MessageResponseDTO>('/auth/resend-verification', payload);
            setMessage(response.data.message || 'Si el correo esta pendiente, recibiras un nuevo codigo.');
        } catch (err: any) {
            if (err.response?.data?.message) {
                console.log(err.response.data);
                setError(err.response.data.message);
            } else {
                setError('No se pudo reenviar el codigo. Intentalo nuevamente.');
            }
        } finally {
            setResending(false);
        }
    }

    const labelClass = 'text-xs font-normal leading-4 tracking-[0.6px] text-[#424752]';
    const inputClass =
        'h-9 w-full rounded-lg border border-[#727784] bg-[#f8f9fa] px-3 text-sm font-normal text-[#191c1d] outline-none transition-colors focus:border-[#003f87] focus:ring-1 focus:ring-[#003f87]';

    return (
        <>
            <header className="mb-7 flex flex-col gap-1">
                <h2
                    className="text-2xl font-semibold leading-7 tracking-[0] text-[#191c1d]"
                    style={{ fontFamily: 'Manrope, Helvetica, sans-serif' }}
                >
                    Verifica tu correo
                </h2>
                <p
                    className="text-sm font-normal leading-5 text-[#424752]"
                    style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                >
                    Ingresa el codigo de 6 digitos que enviamos a tu correo para activar tu cuenta.
                </p>
            </header>

            {message && (
                <div className="mb-5 rounded-lg border border-[#006e25] bg-[#e8f5e9] px-4 py-3">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 shrink-0 text-[#006e25]" />
                        <p className="text-sm font-medium text-[#006e25]">{message}</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-5 rounded-lg border border-[#ba1a1a] bg-[#ffdad6]/20 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 shrink-0 text-[#ba1a1a]" />
                        <p className="text-sm font-medium text-[#ba1a1a]">{error}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-[18px]" noValidate>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                        Correo electronico
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="code" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                        Codigo de verificacion
                    </label>
                    <input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        pattern="\d{6}"
                        autoComplete="one-time-code"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className={inputClass}
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading || verified}
                        className="w-full rounded-lg bg-[#003f87] px-4 py-2.5 text-xs font-normal leading-4 tracking-[0.6px] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#003070] disabled:cursor-not-allowed disabled:opacity-60"
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    >
                        {loading ? 'Verificando...' : 'Verificar correo'}
                    </button>
                </div>
            </form>

            <footer className="pt-5">
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending || verified}
                    className="text-sm font-medium leading-5 text-[#003f87] underline-offset-4 transition-colors hover:underline disabled:cursor-not-allowed disabled:text-[#727784]"
                    style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                >
                    {resending ? 'Reenviando codigo...' : 'Reenviar codigo'}
                </button>
                <p
                    className="mt-5 text-base font-normal leading-5 text-[#424752]"
                    style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                >
                    ¿Ya verificaste tu cuenta?{' '}
                    <Link className="font-extrabold underline underline-offset-4 hover:text-[#191c1d]" to="/auth/login">
                        Inicia sesion aqui
                    </Link>
                </p>
            </footer>
        </>
    );
}
