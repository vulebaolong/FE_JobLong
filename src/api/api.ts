import { getServerSession } from '@/app/api/auth/[...nextauth]/auth';
import { BASE_URL_API } from '@/constant/apiContants';
import { getSession } from 'next-auth/react';
import { decodeJWT } from "@/helpers/jwt";
import { log } from "@/helpers/log";
import { cookies } from 'next/headers'

const isServer = typeof window === "undefined";

export const sendRequest = async <T>(props: IRequest): Promise<T> => {
    let {
        url,
        method,
        body,
        headers = {},
        nextOption = {},
        isJsonParse = true
    } = props;

    const session = isServer ? (await getServerSession()) : (await getSession())
    // if (isServer) log(`sendRequest/session :::>>>`, session, "RED")
    // if (session?.access_token) decodeJWT(session?.access_token, 'sendRequest/access_token')
    // if (isServer) log(`sendRequest`, `${BASE_URL_API}/${url}`, "GREEN")
    // if (!isServer) log(`sendRequest`, cookies().getAll(), "GREEN")
    // if (isServer) log(`sendRequest/session`, session, "GREEN")

    const options: any = {
        method: method,
        headers: new Headers({
            'content-type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
            Cookie: `refresh_token=${session?.refresh_token}`,
            ...headers
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };

    try {
        const res = await fetch(`${BASE_URL_API}/${url}`, options);

        if (!res.ok) return await res.json() as T;

        if (!isJsonParse) return res as T

        return await res.json() as T
    } catch (error) {
        console.error('Error (sendRequest):', error);
        throw error;
    }
};

