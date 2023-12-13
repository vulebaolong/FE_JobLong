import { sendRequestAction } from '@/app/action';
import { ICompany } from '@/interface/company';
import { IRole } from '@/interface/role';

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
        if (searchParams.description) query.push(`description=/${searchParams.description.trim()}/i`);
        if (searchParams.isActive) query.push(`isActive=${searchParams.isActive.trim()}`);

        if (searchParams.isDeleted === 'false') query.push(`isDeleted!=true`);

        const data = await sendRequestAction<IModelPaginate<IRole[]>>({
            url: `roles?currentPage=${currentPage}&limit=${limit}&${query.join('&')}`,
            method: 'GET',
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
