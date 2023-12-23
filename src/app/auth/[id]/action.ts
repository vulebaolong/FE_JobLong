'use server';

import { sendRequestAction } from '@/app/action';
import { deleteSessionUser, parserCookies, setSessionUser } from '@/helpers/cookies';
import { ILoginRequest, ISessionUser } from '@/interface/auth';

export const loginAction = async (value: ILoginRequest) => {
    const resultRaw = await sendRequestAction<IBackendRes<ISessionUser>>({
        url: `auth/login`,
        method: 'POST',
        body: value,
        isJsonParse: false,
    });

    const cookiesHeader = resultRaw.headers.get('set-cookie');
    let refresh_token = '';
    if (cookiesHeader) refresh_token = parserCookies(cookiesHeader).refresh_token;

    const result: IBackendRes<ISessionUser> = await resultRaw.json();

    if (result.statusCode === 201) {
        result.data.refresh_token = refresh_token;
        setSessionUser(result.data);
    }

    return result;
};

export const logoutAction = async () => {
    await sendRequestAction<IBackendRes<ISessionUser>>({
        url: `auth/logout`,
        method: 'POST',
    });

    deleteSessionUser();
};
