import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import { TEXT } from '@/constant/text.contants';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { Stack } from '@mui/material';
import AlertError from '@/components/common/alert/AlertError';
import { getListCompaniesAction } from '../../companies/action';
import { ICompany } from '@/interface/company';
import EditJob from '@/components/admin/jobs/EditJob';
import { getJobByIdAction } from '../action';
import { IJob } from '@/interface/job';

interface IProps {
    params: { id: string };
}

async function EditJobPage({ params }: IProps) {
    const { id } = params;
    const dataJob = await getJobByIdAction(id);

    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataCompanies, dataJob);

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
            <ContentHeader title={TEXT.TITLE.ROLE_EDIT} backButton />
            <ContentBody>
                {success ? (
                    <EditJob
                        initialActives={initialActives}
                        initialCompaies={initialCompaies}
                        dataJob={dataJob.data as IJob}
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
export default EditJobPage;
