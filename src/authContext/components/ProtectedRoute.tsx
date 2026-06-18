import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
import type { UserDTO } from '../types/dtos';
import apiClient from '../../shared/apiClient';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const [status, setStatus] = useState<'checking' | 'authorized' | 'unauthorized'>(token ? 'checking' : 'unauthorized');

    useEffect(() => {
        if (!token) {
            setStatus('unauthorized');
            return;
        }

        let isMounted = true;

        apiClient.get<UserDTO>('/users/me')
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                if (response.data.emailVerified && allowedRoles.includes(response.data.role)) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setStatus('authorized');
                    return;
                }

                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setStatus('unauthorized');
            })
            .catch(() => {
                if (!isMounted) {
                    return;
                }

                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setStatus('unauthorized');
            });

        return () => {
            isMounted = false;
        };
    }, [allowedRoles, token]);

    if (status === 'checking') {
        return null;
    }

    if (status === 'unauthorized') {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}
