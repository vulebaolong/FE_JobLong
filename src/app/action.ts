'use server';

import { BASE_URL_API } from '@/constant/apiContants';
import { getSessionUser } from '@/helpers/cookies';
import { IImgUpoadRes } from '@/interface/image';
import axios from 'axios';

export const sendRequestAction = async <T>(props: IRequest) => {
    const session = getSessionUser();
    // console.log('sendRequestAction :::>>>', session);

    let { url, method, body, headers = {}, nextOption = {}, isJsonParse = true, formData } = props;

    const options: any = {
        method: method,
        headers: new Headers({
            'Content-type': formData
                ? 'multipart/form-data; boundary=<calculated when request is sent>'
                : 'application/json',
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

export const imgUploadAction = async (body: FormData) => {
    const session = getSessionUser();
    const reuslt: IResult<IBackendRes<IImgUpoadRes>> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const { data } = await axios.post(`${BASE_URL_API}/files`, body, {
            headers: {
                Authorization: `Bearer ${session?.access_token}`,
            },
        });

        if (data.statusCode !== 201) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data;
        reuslt.message = data.message;

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

interface IDeleteImg {
    name: string;
}
export const imgDeleteAction = async (body: IDeleteImg) => {
    const reuslt: IResult<string> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<string>>({
            url: `files`,
            method: 'DELETE',
            body: body,
        });

        if (data.statusCode !== 200) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data.data;
        reuslt.message = data.message;

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};
