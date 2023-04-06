import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, ApiError } from "./types";

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

const errorMessageMap = new Map<number, string>([
    [1, "用户名已存在"],
    [2, "用户名不合法"],
    [3, "密码格式不合法"],
    [4, "用户名或密码错误"],
]);

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
            const e: ApiError = {
                status: error.response.status,
                localized_message: errorMessageMap.get(error.response.data.code) || error.response.data.info,
                ...error.response.data,
            };
            return Promise.reject(e);
        });
};