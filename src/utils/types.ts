export interface ApiResponse<T> {
    code: number;
    info: string;
    data: T;
}

export interface ApiError extends ApiResponse<{}> {
    status: number;
    localized_message: string;
}

export interface UserLocalInfo {
    id: string;
    user_name: string;
    token: string;
}