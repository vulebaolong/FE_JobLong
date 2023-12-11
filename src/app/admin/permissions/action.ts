'use server';

import { sendRequestAction } from '@/app/action';
import { IPermission } from '@/interface/permission';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListPermissionsAction = async ({ searchParams }: IProps) => {
    const currentPage = searchParams.currentPage || 1;
    const limit = searchParams.limit || 10;

    const query: string[] = [];
    if (searchParams.name) query.push(`name=/${searchParams.name.trim()}/i`);
    if (searchParams.apiPath) query.push(`apiPath=${searchParams.apiPath.trim()}`);
    if (searchParams.method) query.push(`method=/${searchParams.method.trim()}/i`);
    if (searchParams.module) query.push(`module=/${searchParams.module.trim()}/i`);

    if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

    return await sendRequestAction<IModelPaginate<IPermission[]>>({
        url: `permissions?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
        method: 'GET',
        nextOption: {
            next: { tags: ['getListPermissionsAction'] },
        },
    });
};

export const deletePermissionByIdAction = async (id: string) => {
    const result = await sendRequestAction<IBackendRes<IResponseUpdate>>({
        url: `permissions/${id}`,
        method: 'DELETE',
    });

    revalidateTag('getListPermissionsAction');

    return result;
};

export const restorePermissionByIdAction = async (id: string) => {
    const result = await sendRequestAction<IBackendRes<IResponseUpdate>>({
        url: `permissions/restore/${id}`,
        method: 'PATCH',
    });

    revalidateTag('getListPermissionsAction');

    return result;
};
