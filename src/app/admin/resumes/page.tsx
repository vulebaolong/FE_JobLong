import ListPermissions from '@/components/admin/permissions/ListPermissions';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import { getListResumesAction } from './actions';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import ListResumes from '@/components/admin/resumes/ListResume';
import { IResListResume } from '@/interface/resumes';
import { Stack } from '@mui/material';
import { getListCompaniesAction } from '../companies/action';
import { ICompany } from '@/interface/company';
import { getListJobAction } from '../jobs/action';
import { IJob } from '@/interface/job';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function ResumesPage({ searchParams }: IProps) {
    const dataResume = await getListResumesAction({
        searchParams: {
            populate: 'company,job,user',
            fields: 'company.name,job.name,user.email',
            sort: '-createdAt',
            ...searchParams,
        },
    });

    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const dataJob = await getListJobAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataResume, dataCompanies, dataJob);

    const initialJob = buildOptionsAutocomplete<IJob>({
        list: dataJob.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    const initialStatus = [
        { label: 'PENDING', id: `1` },
        { label: 'REVIEWING', id: `2` },
        { label: 'APPROVED', id: `3` },
        { label: 'REJECTED', id: `4` },
    ];
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.RESUME}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.RESUME.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListResumes
                        dataResume={dataResume.data as IModelPaginate<IResListResume[]>}
                        initialStatus={initialStatus}
                        initialCompaies={initialCompaies}
                        initialJob={initialJob}
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
export default ResumesPage;
