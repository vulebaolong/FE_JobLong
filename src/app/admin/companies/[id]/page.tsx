import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { getCompanyByIdAction } from '../../companies/action';
import { checkData } from '@/helpers/function.helper';
import { ICompany } from '@/interface/company';
import { Stack } from '@mui/material';
import EditCompanies from '@/components/admin/companies/EditCompanies';

interface IProps {
    params: { id: string };
}

async function EditCompanyPage({ params }: IProps) {
    const { id } = params;
    const dataCompany = await getCompanyByIdAction(id);

    const { success, messages } = checkData(dataCompany);

    return (
        <Content>
            <ContentHeader title={`${TEXT.TITLE.COMPANY_EDIT}`} backButton />
            <ContentBody>
                {success ? (
                    <EditCompanies
                        company={dataCompany.data as ICompany}
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
export default EditCompanyPage;
