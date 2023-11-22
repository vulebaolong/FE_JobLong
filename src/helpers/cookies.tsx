import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from "@/constant/userContants";
import { ISessionUser } from "@/interface/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setSessionUser = (sessionUser: ISessionUser) => {
    cookies().set(ACCESS_TOKEN, sessionUser.access_token);
    cookies().set(REFRESH_TOKEN, sessionUser.refresh_token);
    cookies().set(USER_LOGIN, JSON.stringify(sessionUser.user_login));
};

export const getSessionUser = async () => {
    const access_token = cookies().get(ACCESS_TOKEN);
    const refresh_token = cookies().get(REFRESH_TOKEN);
    const user_login = cookies().get(JSON.parse(USER_LOGIN));

    if (!access_token || !refresh_token || !user_login) return undefined

    return {
        access_token,
        refresh_token,
        user_login,
    }
};

export const deleteSessionUser = () => {
    cookies().delete(ACCESS_TOKEN);
    cookies().delete(REFRESH_TOKEN);
    cookies().delete(USER_LOGIN);
};