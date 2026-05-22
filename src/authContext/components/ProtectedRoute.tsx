import { Navigate, Outlet } from 'react-router';
import type { UserDTO } from '../types/dtos';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        return <Navigate to="/auth/login" replace />;
    }

    try {
        const user: UserDTO = JSON.parse(userStr);
        if (!allowedRoles.includes(user.role)) {
            // Redirect to home or unauthorized page if they don't have the required role
            return <Navigate to="/" replace />;
        }
    } catch (e) {
        // If there's an error parsing the user from localStorage, clear it and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}
