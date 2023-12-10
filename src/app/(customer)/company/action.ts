'use server';

import { sendRequestAction } from '@/app/action';
import { ICompany } from '@/interface/company';

export const getCompanyByIdAction = async (id: string) => {
    return await sendRequestAction<IBackendRes<ICompany>>({
        url: `companies/${id}`,
        method: 'GET',
    });
};

export const getListCompanyAction = async (currentPage: number = 1, limit: number = 10) => {
    return await sendRequestAction<IModelPaginate<ICompany[]>>({
        url: `companies?currentPage=${currentPage}&limit=${limit}`,
        method: 'GET',
        nextOption: {
            next: { tags: ['getListCompanyAction'] },
        },
    });
};
