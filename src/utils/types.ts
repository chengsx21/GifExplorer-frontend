export interface ApiResponse<T> {
    code: number;
    info: string;
    data: T;
}

export interface UserLocalInfo {
    id: string;
    user_name: string;
    token: string;
}