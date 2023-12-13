'use server';

import { sendRequestAction } from '@/app/action';
import { ICreateRole, IRole } from '@/interface/role';
import { getListPermissionsAction } from '../permissions/action';
import { permissionModule, filterAndGroupArrayPermission } from '@/helpers/function.helper';
import { IPermission } from '@/interface/permission';
import { revalidateTag } from 'next/cache';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListRoleAction = async ({ searchParams }: IProps) => {
    const reuslt: IResult<IModelPaginate<IRole[]>> = {
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
        if (searchParams.description)
            query.push(`description=/${searchParams.description.trim()}/i`);
        if (searchParams.isActive) query.push(`isActive=${searchParams.isActive.trim()}`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<IRole[]>>({
            url: `roles?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
            nextOption: {
                next: { tags: ['getListRoleAction'] },
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

export const getDataPermissionProcessed = async () => {
    const reuslt: IResult<permissionModule[]> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await getListPermissionsAction({
            searchParams: {
                limit: '999',
                fields: 'name,apiPath,method,module',
                isDeleted: 'false',
            },
        });

        if (!data.success) {
            reuslt.success = false;
            reuslt.data = null;
            reuslt.message = data.message;
            return reuslt;
        }

        const permission = data.data?.data?.result;

        reuslt.success = true;
        reuslt.data = filterAndGroupArrayPermission(permission as IPermission[]);
        reuslt.message = data.message;

        return reuslt;
    } catch (error: any) {
        reuslt.success = false;
        reuslt.data = null;
        reuslt.message = error.message;
        return reuslt;
    }
};

export const createRoleAction = async (body: ICreateRole) => {
    const reuslt: IResult<IBackendRes<IRole[]>> = {
        success: true,
        data: null,
        message: '',
    };

    try {
        const data = await sendRequestAction<IBackendRes<IRole[]>>({
            url: `roles`,
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
        reuslt.data = data;
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

export const getRoleByIdAction = async (id: string) => {
    const reuslt: IResult<IRole> = {
        success: true,
        data: null,
        message: '',
    };
    try {
        const data = await sendRequestAction<IBackendRes<IRole>>({
            url: `roles/${id}`,
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
