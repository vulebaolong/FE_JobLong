'use server';

import { sendRequestAction } from '@/app/action';
import { IPermissions } from '@/interface/auth';
import { ICreatePermission, IPermission, IUpdatePermission } from '@/interface/permission';
import { ICreateResume, IResListResume, IResume, IUpdateResume } from '@/interface/resumes';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListResumesAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<IResListResume[]>> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const currentPage = searchParams.currentPage || 1;
        const limit = searchParams.limit || 10;

        const query: string[] = [];
        if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);
        if (searchParams.populate) query.push(`populate=${searchParams.populate.trim()}`);
        if (searchParams.sort) query.push(`sort=${searchParams.sort.trim()}`);

        if (searchParams.status) query.push(`status=${searchParams.status.trim()}`);
        if (searchParams.company) query.push(`company=${searchParams.company.trim()}`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<IResListResume[]>>({
            url: `resumes?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListResumesAction'] },
            },
        });

        if (data.statusCode !== 200) {
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

export const getListResumesByUserAction = async () => {
    return await sendRequestAction<IBackendRes<IPermissions[]>>({
        url: `permissions/by-user`,
        method: 'GET',
    });
};

export const deleteResumeByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `resumes/${id}`,
            method: 'DELETE',
        });

        if (data.data.modifiedCount !== 1) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data.data;
        reuslt.message = data.message;

        revalidateTag('getListResumesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const restoreResumeByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `resumes/restore/${id}`,
            method: 'PATCH',
        });

        if (data.data.modifiedCount !== 1) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data.data;
        reuslt.message = data.message;

        revalidateTag('getListResumesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const createResumeAction = async (body: ICreateResume) => {
    const reuslt: IResult<ICreateResume> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<ICreateResume>>({
            url: `resumes`,
            method: 'POST',
            body: body,
        });

        if (data.statusCode !== 201) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data.data;
        reuslt.message = data.message;

        revalidateTag('getListResumesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const getResumeByIdAction = async (id: string) => {
    const reuslt: IResult<IResume> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResume>>({
            url: `resumes/${id}`,
            method: 'GET',
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

export const updateResumeByIdAction = async (id: string, body: IUpdateResume) => {
    const reuslt: IResult<IUpdateResume> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResume>>({
            url: `resumes/${id}`,
            method: 'PATCH',
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

        revalidateTag('getListResumesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};
