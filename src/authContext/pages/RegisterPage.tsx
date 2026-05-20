import AuthLayout from '../components/AuthLayout';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
    return (
        <AuthLayout>
            <header className="mb-7 flex flex-col gap-1">
                <h2
                    className="text-2xl font-semibold leading-7 tracking-[0] text-[#191c1d]"
                    style={{ fontFamily: 'Manrope, Helvetica, sans-serif' }}
                >
                    Registro de Paciente
                </h2>
                <p
                    className="text-sm font-normal leading-5 text-[#424752]"
                    style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}
                >
                    Complete los datos para crear su expediente.
                </p>
            </header>
            <RegisterForm />
        </AuthLayout>
    );
}
