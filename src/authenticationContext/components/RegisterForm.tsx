import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FieldState {
    value: string;
    touched: boolean;
}

interface FormState {
    nombres: FieldState;
    apellidos: FieldState;
    dni: FieldState;
    telefono: FieldState;
    email: FieldState;
    contrasena: FieldState;
    confirmarContrasena: FieldState;
}

const INITIAL_STATE: FormState = {
    nombres: { value: '', touched: false },
    apellidos: { value: '', touched: false },
    dni: { value: '45678912', touched: true },
    telefono: { value: '', touched: false },
    email: { value: '', touched: false },
    contrasena: { value: '123', touched: true },
    confirmarContrasena: { value: '', touched: false },
};

function isDniValid(value: string): boolean {
    return /^\d{8}$/.test(value.trim());
}

function isPasswordValid(value: string): boolean {
    return value.length >= 8;
}

type FieldName = keyof FormState;

export default function RegisterForm() {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(field: FieldName, value: string) {
        setForm((prev) => ({ ...prev, [field]: { value, touched: true } }));
    }

    function handleBlur(field: FieldName) {
        setForm((prev) => ({ ...prev, [field]: { ...prev[field], touched: true } }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const allTouched = (Object.keys(form) as Array<keyof FormState>).reduce((acc, key) => {
            return { ...acc, [key]: { ...form[key], touched: true } };
        }, {} as FormState);
        setForm(allTouched);
        setSubmitted(true);
    }

    const dniValid = form.dni.touched && isDniValid(form.dni.value);
    const dniError = form.dni.touched && !isDniValid(form.dni.value) && form.dni.value !== '';
    const passwordError = form.contrasena.touched && !isPasswordValid(form.contrasena.value) && form.contrasena.value !== '';

    const labelClass = 'text-xs font-normal leading-4 tracking-[0.6px] text-[#424752]';
    const baseInputClass =
        'w-full h-[38px] rounded-lg border bg-[#f8f9fa] px-3 text-sm font-normal leading-5 text-[#191c1d] outline-none transition-colors focus:ring-1 focus:ring-[#003f87] focus:border-[#003f87]';

    return (
        <>
            {submitted && (
                <div className="mb-5 rounded-lg bg-[#e8f5e9] border border-[#006e25] px-4 py-3">
                    <p className="text-sm text-[#006e25] font-medium">
                        Formulario enviado correctamente.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-[18px]" noValidate>
                {/* Nombres & Apellidos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nombres" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            Nombres
                        </label>
                        <input
                            id="nombres"
                            type="text"
                            value={form.nombres.value}
                            onChange={(e) => handleChange('nombres', e.target.value)}
                            onBlur={() => handleBlur('nombres')}
                            className={`${baseInputClass} border-[#727784]`}
                            style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="apellidos" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            Apellidos
                        </label>
                        <input
                            id="apellidos"
                            type="text"
                            value={form.apellidos.value}
                            onChange={(e) => handleChange('apellidos', e.target.value)}
                            onBlur={() => handleBlur('apellidos')}
                            className={`${baseInputClass} border-[#727784]`}
                            style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                        />
                    </div>
                </div>

                {/* DNI & Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dni" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            DNI
                        </label>
                        <div className="relative">
                            <input
                                id="dni"
                                type="text"
                                value={form.dni.value}
                                onChange={(e) => handleChange('dni', e.target.value)}
                                onBlur={() => handleBlur('dni')}
                                className={`${baseInputClass} pr-10 ${dniValid
                                        ? 'border-[#006e25] focus:ring-[#006e25] focus:border-[#006e25]'
                                        : dniError
                                            ? 'border-[#ba1a1a] focus:ring-[#ba1a1a] focus:border-[#ba1a1a]'
                                            : 'border-[#727784]'
                                    }`}
                                style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                            />
                            {dniValid && (
                                <CheckCircle
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#006e25]"
                                    strokeWidth={2}
                                />
                            )}
                            {dniError && (
                                <AlertCircle
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ba1a1a]"
                                    strokeWidth={2}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="telefono" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            Teléfono
                        </label>
                        <input
                            id="telefono"
                            type="tel"
                            value={form.telefono.value}
                            onChange={(e) => handleChange('telefono', e.target.value)}
                            onBlur={() => handleBlur('telefono')}
                            className={`${baseInputClass} border-[#727784]`}
                            style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={form.email.value}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        className={`${baseInputClass} border-[#727784]`}
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    />
                </div>

                {/* Contraseña & Confirmar Contraseña */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="contrasena" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="contrasena"
                                type="password"
                                value={form.contrasena.value}
                                onChange={(e) => handleChange('contrasena', e.target.value)}
                                onBlur={() => handleBlur('contrasena')}
                                className={`${baseInputClass} pr-10 ${passwordError
                                        ? 'border-[#ba1a1a] bg-[#ffdad6]/10 focus:ring-[#ba1a1a] focus:border-[#ba1a1a]'
                                        : 'border-[#727784]'
                                    }`}
                                style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                            />
                            {passwordError && (
                                <AlertCircle
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ba1a1a]"
                                    strokeWidth={2}
                                />
                            )}
                        </div>
                        {passwordError && (
                            <p
                                className="text-xs font-medium leading-3 text-[#ba1a1a]"
                                style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                            >
                                Mínimo 8 caracteres.
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmarContrasena" className={labelClass} style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
                            Confirmar Contraseña
                        </label>
                        <input
                            id="confirmarContrasena"
                            type="password"
                            value={form.confirmarContrasena.value}
                            onChange={(e) => handleChange('confirmarContrasena', e.target.value)}
                            onBlur={() => handleBlur('confirmarContrasena')}
                            className={`${baseInputClass} border-[#727784]`}
                            style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full h-[38px] rounded-lg bg-[#003f87] px-4 text-xs font-normal leading-4 tracking-[0.6px] text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#003070] transition-colors"
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    >
                        Registrar usuario
                    </button>
                </div>

                {/* Login link */}
                <footer className="pt-3">
                    <p
                        className="flex flex-wrap items-center gap-1 text-base font-normal leading-5 text-[#424752]"
                        style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                    >
                        <span>¿Ya tienes una cuenta?</span>
                        <button
                            type="button"
                            className="font-extrabold text-[#424752] underline underline-offset-4 hover:text-[#191c1d] transition-colors"
                        >
                            Inicia sesión aquí
                        </button>
                    </p>
                </footer>
            </form>
        </>
    );
}
