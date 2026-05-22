import { useEffect, useState } from 'react';
import { SiguienteCita } from '../components/SiguienteCita';
import { CitasProximas } from '../components/CitasProximas';
import type { UserDTO } from '../../authContext/types/dtos';

export default function PatientDashboardPage() {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr) as UserDTO;
                if (user.firstName) {
                    setFirstName(user.firstName);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-8 lg:p-12 flex flex-col gap-10">
            <div>
                <h1 className="text-[32px] font-extrabold text-[#191c1d] tracking-tight mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Hola de nuevo{firstName ? `, ${firstName}` : ''}
                </h1>
                <p className="text-[#424752] text-lg">Aquí tienes un resumen de tus próximas citas médicas</p>
            </div>

            <div className="flex flex-col gap-8">
                <SiguienteCita />
                <CitasProximas />
            </div>
        </div>
    );
}
