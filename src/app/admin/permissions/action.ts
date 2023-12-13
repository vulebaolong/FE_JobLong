'use server';

import { sendRequestAction } from '@/app/action';
import { IPermissions } from '@/interface/auth';
import { ICreatePermission, IPermission, IUpdatePermission } from '@/interface/permission';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListPermissionsAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<IPermission[]>> = {
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
        if (searchParams.apiPath) query.push(`apiPath=${searchParams.apiPath.trim()}`);
        if (searchParams.method) query.push(`method=/${searchParams.method.trim()}/i`);
        if (searchParams.module) query.push(`module=/${searchParams.module.trim()}/i`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<IPermission[]>>({
            url: `permissions?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListPermissionsAction'] },
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

export const getListPermissionsByUserAction = async () => {
    return await sendRequestAction<IBackendRes<IPermissions[]>>({
        url: `permissions/by-user`,
        method: 'GET',
    });
};

export const deletePermissionByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `permissions/${id}`,
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

        revalidateTag('getListPermissionsAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const restorePermissionByIdAction = async (id: string) => {
    const reuslt: IResult<IResponseUpdate> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IResponseUpdate>>({
            url: `permissions/restore/${id}`,
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

        revalidateTag('getListPermissionsAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const createPermissionAction = async (body: ICreatePermission) => {
    const reuslt: IResult<ICreatePermission> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IPermission>>({
            url: `permissions`,
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

        revalidateTag('getListPermissionsAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const getPermissionByIdAction = async (id: string) => {
    const reuslt: IResult<IPermission> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IPermission>>({
            url: `permissions/${id}`,
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

export const updatePermissionByIdAction = async (id: string, body: IUpdatePermission) => {
    const reuslt: IResult<IPermission> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IPermission>>({
            url: `permissions/${id}`,
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

        revalidateTag('getListPermissionsAction');

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};
