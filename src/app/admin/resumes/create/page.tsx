import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import CreateResume from '@/components/admin/resumes/CreateResume';
import { getListCompaniesAction } from '../../companies/action';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import { ICompany } from '@/interface/company';
import { Stack } from '@mui/material';
import AlertError from '@/components/common/alert/AlertError';
import { getListJobAction } from '../../jobs/action';
import { IJob } from '@/interface/job';

async function CreateResumePage() {
    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const dataJob = await getListJobAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataCompanies, dataJob);

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
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.RESUME_CREATE} backButton />
            <ContentBody>
                {success ? (
                    <CreateResume initialCompaies={initialCompaies} initialJob={initialJob} />
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
export default CreateResumePage;
