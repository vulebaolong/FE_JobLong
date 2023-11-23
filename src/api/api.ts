import { getCookies } from "./../helpers/cookies";
import { getServerSession } from '@/app/api/auth/[...nextauth]/auth';
import { BASE_URL_API } from '@/constant/apiContants';

export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
        isJsonParse?: boolean
    }

    interface IBackendRes<T> extends Response {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data: T;
    }

    interface IModelPaginate<T> {
        meta: {
            currentPage: number;
            pageSize: number;
            totalPages: number;
            totalItems: number;
        },
        result: T[]
    }

}


export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        // queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {},
        isJsonParse = true
    } = props;

    const session = await getServerSession()
    console.log("session: ", session);

    const options: any = {
        method: method,
        headers: new Headers({
            'content-type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`,
            ...headers
        }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption
    };
    if (useCredentials) options.credentials = "include";

    // if (queryParams) {
    //     url = `${url}?${queryString.stringify(queryParams)}`;
    // }

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

