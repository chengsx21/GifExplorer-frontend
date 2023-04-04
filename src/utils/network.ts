import axios, { AxiosError, AxiosResponse } from "axios";

// Create a new axios instance
const service = axios.create({
    baseURL: "/api/", // API base_url
    timeout: 10000,   // Request timeout
});

// Set request interceptor
service.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Error information from backend
interface ErrorInfo {
    code: number;
    info: string;
    data: any;
}

// Make general request
export const request = async <T = any> (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
) => {
    return service.request<T>({ method, url, data })
        .then((response: AxiosResponse<T>) => {
            return response.data;
        })
        .catch((error: AxiosError<ErrorInfo>) => {
            return Promise.reject({
                status: error.response?.status || -1,
                ...error.response?.data || {},
            });
        });
};