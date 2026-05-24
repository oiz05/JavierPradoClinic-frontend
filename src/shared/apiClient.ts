import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://cj-196a962e499340109b9631b8eef0bb37.ecs.sa-east-1.on.aws/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
