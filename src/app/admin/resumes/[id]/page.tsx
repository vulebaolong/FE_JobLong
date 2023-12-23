import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import EditPermissions from '@/components/admin/permissions/EditPermissions';
import { getListCompaniesAction } from '../../companies/action';
import { getListJobAction } from '../../jobs/action';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import { IJob } from '@/interface/job';
import { ICompany } from '@/interface/company';
import { getResumeByIdAction } from '../actions';
import EditResume from '@/components/admin/resumes/EditResume';
import { IResume } from '@/interface/resumes';
import { Stack } from '@mui/material';

interface IProps {
    params: { id: string };
}

async function EditResumePage({ params }: IProps) {
    const { id } = params;
    const dataResume = await getResumeByIdAction(id);

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

    const initialStatus = TEXT.AUTOCOMPLETE.STATUS.map((method, index) => {
        return { label: method, id: `${index}` };
    });

    return (
        <Content>
            <ContentHeader title={`${TEXT.TITLE.PERMISSION_EDIT}`} backButton />
            <ContentBody>
                {success ? (
                    <EditResume
                        initialCompaies={initialCompaies}
                        initialJob={initialJob}
                        initialStatus={initialStatus}
                        resume={dataResume.data as IResume}
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
export default EditResumePage;
