import { HomePage } from "./homeContext/pages/HomePage"
import LoginPage from "./authContext/pages/LoginPage"
import RegisterPage from "./authContext/pages/RegisterPage"
import { Routes, Route } from "react-router"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
    );
}