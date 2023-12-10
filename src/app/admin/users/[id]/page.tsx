import EditUser from '@/components/admin/users/EditUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';

interface IProps {
    params: { id: string };
}

async function DetailUserPage({ params }: IProps) {
    const { id } = params;
    {
        /* <ErrorAlert message={organization.message} /> */
    }
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.USER + 'edit'} backButton />
            <ContentBody>
                <EditUser />
            </ContentBody>
        </Content>
    );
}
export default DetailUserPage;
