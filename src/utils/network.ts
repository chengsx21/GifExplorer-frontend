import axios, { AxiosError, AxiosResponse } from "axios";

const network = axios.create({
    baseURL: "",
});

enum NetworkErrorType {
    CORRUPTED_RESPONSE,
    UNKNOWN_ERROR,
}

export class NetworkError extends Error {
    type: NetworkErrorType;
    message: string;

    constructor(
        _type: NetworkErrorType,
        _message: string,
    ) {
        super();

        this.type = _type;
        this.message = _message;
    }

    toString(): string { return this.message; }
    valueOf(): Object { return this.message; }
}

export const request = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    data?: any,
) => {
    const response = await network.request({ method, url, data })
        .catch((err: AxiosError) => {
            throw new NetworkError(
                NetworkErrorType.UNKNOWN_ERROR,
                `[${err.response?.status}] ` + (err.response?.data as any).info,
            );
        });

    if (response?.data.code === 0) {
        return { ...response.data, code: undefined };
    } else {
        throw new NetworkError(
            NetworkErrorType.UNKNOWN_ERROR,
            response?.data.info,
        );
    }
};