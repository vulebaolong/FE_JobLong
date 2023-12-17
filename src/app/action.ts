'use server';

import { BASE_URL_API } from '@/constant/apiContants';
import { getSessionUser } from '@/helpers/cookies';

export const sendRequestAction = async <T>(props: IRequest) => {
    const session = getSessionUser();
    // console.log('sendRequestAction :::>>>', session);

    let { url, method, body, headers = {}, nextOption = {}, isJsonParse = true } = props;

    const options: any = {
        method: method,
        headers: new Headers({
            'content-type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
            Cookie: `refresh_token=${session?.refresh_token}`,
            ...headers,
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption,
    };

    try {
        const res = await fetch(`${BASE_URL_API}/${url}`, options);

        if (!isJsonParse) return res as T;

        return (await res.json()) as T;
    } catch (error) {
        console.error('Error (sendRequest):', error);
        throw error;
    }
};
