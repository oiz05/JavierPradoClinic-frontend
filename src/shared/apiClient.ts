import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_TARGET || "/api";

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json"
    },
});

export default apiClient;
