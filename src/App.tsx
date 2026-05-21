import { HomePage } from "./homeContext/pages/HomePage"
import LoginPage from "./authContext/pages/LoginPage"
import RegisterPage from "./authContext/pages/RegisterPage"
import { Routes, Route } from "react-router"
import PatientDashboardPage from "./patientsContext/pages/PatientDashboardPage"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
        </Routes>
    );
}