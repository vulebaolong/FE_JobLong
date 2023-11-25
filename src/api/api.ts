import jwt from "jsonwebtoken";
import { getServerSession } from '@/app/api/auth/[...nextauth]/auth';
import { API_LOGIN, API_REFRESH_TOKEN, BASE_URL_API } from '@/constant/apiContants';
import { getSession } from 'next-auth/react';
import { decodeJWT } from "@/helpers/jwt";
import dayjs from "dayjs";
import { log } from "@/helpers/log";

export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        useCredentials?: boolean;
        headers?: object;
        nextOption?: object;
        isJsonParse?: boolean
    }

    interface IBackendRes<T> extends Response {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data: T;
    }

    interface IModelPaginate<T> {
        statusCode: number,
        message: string,
        data: {
            meta: {
                currentPage: number;
                pageSize: number;
                totalPages: number;
                totalItems: number;
            },
            result: T[]
        }
    }

}

const isServer = typeof window === "undefined";

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        headers = {},
        nextOption = {},
        isJsonParse = true
    } = props;

    const session = isServer ? (await getServerSession()) : (await getSession())
    if (isServer) log(`sendRequest/session :::>>>`, session, "RED")

    if (session?.access_token) {
        decodeJWT(session?.access_token, 'sendRequest/access_token')
    }

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

        if (!res.ok) {
            const json = await res.json();
            return {
                statusCode: res.status,
                message: json?.message ?? "",
                error: json?.error ?? ""
            } as T;
        }

        if (!isJsonParse) return res as T

        return res.json() as T
    } catch (error) {
        console.error('Error (sendRequest):', error);
        throw error;
    }
};

