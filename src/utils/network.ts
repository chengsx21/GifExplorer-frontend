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

// Error interface
interface NetworkError {
    code: number;
    info: string;
    data: any;
}

// Make general request
export const request = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
) => {
    return await service.request({ method, url, data })
        .then((response: AxiosResponse) => {
            return response.data;
        })
        .catch((error: AxiosError<NetworkError>) => {
            return Promise.reject({
                status: error.response?.status,
                ...error.response?.data,
            });
        });
};