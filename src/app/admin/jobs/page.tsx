import { getListJobAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import { Stack } from '@mui/material';
import { IJob } from '@/interface/job';
import ListJob from '@/components/admin/jobs/ListJob';
import { getListCompaniesAction } from '../companies/action';
import { ICompany } from '@/interface/company';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function JobsPage({ searchParams }: IProps) {
    const dataJob = await getListJobAction({
        searchParams: {
            sort: '-createdAt',
            populate: 'company',
            fields: 'company.name,name,salary,skills,location,level,isActive,isDeleted,createdAt,updatedAt,deletedAt,createdBy,updatedBy,deletedBy',
            ...searchParams,
        },
    });

    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataJob, dataCompanies);

    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });
    const initialActives = [
        { label: 'Active', id: `true` },
        { label: 'Not', id: `false` },
    ];
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.JOB}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.JOB.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListJob
                        dataJob={dataJob.data as IModelPaginate<IJob[]>}
                        initialActives={initialActives}
                        initialCompaies={initialCompaies}
                    />
                ) : (
                    <Stack spacing={2}>
                        {messages.map((message, index) => (
                            <AlertError message={message} key={index} />
                        ))}
                    </Stack>
                )}
            </ContentBody>
        </Content>
    );
}
export default JobsPage;
