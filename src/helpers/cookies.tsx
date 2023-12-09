import { cookies } from 'next/headers';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from '@/constant/userContants';
import { ISessionUser } from '@/interface/auth';

export const parserCookies = (cookieString: string) => {
    const cookies = cookieString.split('; ').map((item) => {
        const arr = item.split(', ');
        const isArrToken = arr.length === 3;

        if (isArrToken) {
            const [name, value] = arr[2].split('=');
            return { [name]: value };
        }
        const [name, value] = item.split('=');
        return { [name]: value };
    });

    return cookies.reduce((acc, obj) => {
        const [key, value] = Object.entries(obj)[0] || [];
        if (value !== '' && value !== undefined) {
            acc = Object.assign(acc, { [key]: value });
        }
        return acc;
    }, {});
};

export const setSessionUser = ({ access_token, refresh_token, user }: ISessionUser) => {
    cookies().set(ACCESS_TOKEN, access_token);
    cookies().set(REFRESH_TOKEN, refresh_token);
    cookies().set(USER_LOGIN, JSON.stringify(user));
};

export const getSessionUser = () => {
    const accessCookie = cookies().get(ACCESS_TOKEN)?.value;
    const refreshCookie = cookies().get(REFRESH_TOKEN)?.value;
    const userCookie = cookies().get(USER_LOGIN)?.value;
    let user_token = '';
    if (userCookie) user_token = JSON.parse(userCookie);
    return {
        [ACCESS_TOKEN]: accessCookie,
        [REFRESH_TOKEN]: refreshCookie,
        [USER_LOGIN]: user_token,
    };
};

export const deleteSessionUser = () => {
    cookies().delete(REFRESH_TOKEN);
    cookies().delete(ACCESS_TOKEN);
    cookies().delete(USER_LOGIN);
};
