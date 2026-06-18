import { HomePage } from "./homeContext/pages/HomePage"
import LoginForm from "./authContext/components/LoginForm"
import RegisterForm from "./authContext/components/RegisterForm"
import VerifyEmailForm from "./authContext/components/VerifyEmailForm"
import { Routes, Route } from "react-router"
import PatientDashboardPage from "./patientsContext/pages/PatientDashboardPage"
import { MakeAppointmentPage } from "./patientsContext/pages/MakeAppointmentPage"
import Layout from "./patientsContext/components/Layout"
import AuthLayout from "./authContext/components/AuthLayout"
import ProtectedRoute from "./authContext/components/ProtectedRoute"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
                <Route path="verify-email" element={<VerifyEmailForm />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['PATIENT']} />}>
                <Route path="/patient" element={<Layout />}>
                    <Route path="dashboard" element={<PatientDashboardPage />} />
                    <Route path="appointment" element={<MakeAppointmentPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
