import { sendRequestAction } from '@/app/action';
import { ICompany } from '@/interface/company';

interface IProps {
    searchParams: { [key: string]: string | undefined };
}

export const getListCompanies = async ({ searchParams }: IProps) => {
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

        const data = await sendRequestAction<IModelPaginate<ICompany[]>>({
            url: `companies?currentPage=${currentPage}&sort=-createdAt&limit=${limit}&${query.join(
                '&',
            )}`,
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
