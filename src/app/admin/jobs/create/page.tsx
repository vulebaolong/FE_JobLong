import CreatePermission from '@/components/admin/permissions/CreatePermission';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import { getListCompaniesAction } from '../../companies/action';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import CreateJob from '@/components/admin/jobs/CreateJob';
import { ICompany } from '@/interface/company';
import { Stack } from '@mui/material';
import AlertError from '@/components/common/alert/AlertError';

async function CreateJobPage() {
    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataCompanies);

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
            <ContentHeader title={TEXT.TITLE.PERMISSION_CREATE} backButton />
            <ContentBody>
                {success ? (
                    <CreateJob initialActives={initialActives} initialCompaies={initialCompaies} />
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
export default CreateJobPage;
