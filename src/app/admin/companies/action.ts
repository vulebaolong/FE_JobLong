'use server';

import { sendRequestAction } from '@/app/action';
import { ICompany } from '@/interface/company';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListCompaniesAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<ICompany[]>> = {
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

        if (searchParams.name) query.push(`name=/${searchParams.name.trim()}/i`);
        if (searchParams.address) query.push(`address=/${searchParams.address.trim()}/i`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<ICompany[]>>({
            url: `companies?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListCompaniesAction'] },
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

export const deleteCompanyByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `companies/${id}`,
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

        revalidateTag('getListCompaniesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const deleteHardCompanyByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseDeleleHard> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseDeleleHard>>({
            url: `companies/hard/${id}`,
            method: 'DELETE',
        });

        if (data.data.deletedCount !== 1) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        reuslt.success = true;
        reuslt.data = data.data;
        reuslt.message = data.message;

        revalidateTag('getListCompaniesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const restoreCompanyByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `companies/restore/${id}`,
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

        revalidateTag('getListCompaniesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const createCompanyAction = async (body: any) => {
    const reuslt: IResult<ICompany> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<ICompany>>({
            url: `companies`,
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

        revalidateTag('getListCompaniesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const getCompanyByIdAction = async (id: string) => {
    const reuslt: IResult<ICompany> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<ICompany>>({
            url: `companies/${id}`,
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

export const updateCompanyByIdAction = async (id: string, body: ICompany) => {
    const reuslt: IResult<ICompany> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<ICompany>>({
            url: `companies/${id}`,
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

        revalidateTag('getListCompaniesAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};