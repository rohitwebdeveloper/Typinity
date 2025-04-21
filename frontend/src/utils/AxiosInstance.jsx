import axios from "axios";

// Axios Interceptor Instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

export default axiosInstance;