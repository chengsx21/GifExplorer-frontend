import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "./types";

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

// Make general request
export const request = async <T = any> (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
) => {
    return service.request<ApiResponse<T>>({ method, url, data })
        .then((response: AxiosResponse<ApiResponse<T>>) => {
            return response.data.data;
        })
        .catch((error: AxiosError<ApiResponse<{}>>) => {
            return Promise.reject({
                status: error.response?.status || -1,
                ...error.response?.data || {},
            });
        });
};