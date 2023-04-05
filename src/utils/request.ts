import { request } from './network';
import { UserLocalInfo } from './types';

export const userRegister = (user_name: string, password: string) => {
    return request<UserLocalInfo>("/user/register", "POST", {
        "user_name": user_name,
        "password": password,
    });
};

export const userLogin = (user_name: string, password: string) => {
    const err_map = new Map<number, string>([
        [4, "用户名或密码错误"],
    ]);

    return request<UserLocalInfo>("/user/login", "POST", {
        "user_name": user_name,
        "password": password,
    }, err_map);
};

export const userModifyPassword = (user_name: string, old_password: string, new_password: string) => {
    return request<{}>("/user/modifypassword", "POST", {
        "user_name": user_name,
        "old_password": old_password,
        "new_password": new_password,
    });
};

export const userLogout = () => {
    return request<{}>("/user/logout", "POST");
}

export const userCheckLogin = () => {
    return request<{}>("/user/checklogin", "POST");
}