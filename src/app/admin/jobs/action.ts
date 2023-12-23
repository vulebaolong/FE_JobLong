'use server';

import { sendRequestAction } from '@/app/action';
import { ICreateJob, IJob } from '@/interface/job';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListJobAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<IJob[]>> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const currentPage = searchParams.currentPage || 1;
        const limit = searchParams.limit || 10;

        const query: string[] = [];
        if (searchParams.populate) query.push(`populate=${searchParams.populate.trim()}`);
        if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);
        if (searchParams.sort) query.push(`sort=${searchParams.sort.trim()}`);

        if (searchParams.name) query.push(`name=/${searchParams.name.trim()}/i`);
        if (searchParams.salary) query.push(`salary=${searchParams.salary.trim()}`);
        if (searchParams.skills) query.push(`skills=/${searchParams.skills.trim()}/i`);
        if (searchParams.company) query.push(`company=${searchParams.company.trim()}`);
        if (searchParams.location) query.push(`location=/${searchParams.location.trim()}/i`);
        if (searchParams.level) query.push(`level=/${searchParams.level.trim()}/i`);
        if (searchParams.isActive) query.push(`isActive=${searchParams.isActive.trim()}`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<IJob[]>>({
            url: `jobs?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListJobAction'] },
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

export const deleteJobByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `jobs/${id}`,
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

        revalidateTag('getListJobAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const restoreJobByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `jobs/restore/${id}`,
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

        revalidateTag('getListJobAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const createJobAction = async (body: any) => {
    const reuslt: IResult<IJob> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IJob>>({
            url: `jobs`,
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

        revalidateTag('getListJobAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const getJobByIdAction = async (id: string) => {
    const reuslt: IResult<IJob> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IJob>>({
            url: `jobs/${id}?populate=company&fields=company.logo,company.name`,
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
