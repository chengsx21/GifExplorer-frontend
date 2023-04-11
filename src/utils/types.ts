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

export interface ImageMetadata {
    id: number;
    title: string;
    gif_url: string;
    uploader: string;
    pub_time: string;
    like: number;
    is_favorite: boolean;
}