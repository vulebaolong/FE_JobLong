import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import CreateCompanies from '@/components/admin/companies/CreateCompanies';

async function CreateCompanyPage() {
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.COMPANY_CREATE} backButton />
            <ContentBody>
                <CreateCompanies />
            </ContentBody>
        </Content>
    );
}
export default CreateCompanyPage;
