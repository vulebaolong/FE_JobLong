import CreateUser from '@/components/admin/users/CreateUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';

const UserCreatePage = async () => {
    //   const organizations = await actionGetAllOrganizations();

    const initialGender = [
        { label: TEXT.AUTOCOMPLETE.MALE, id: '1' },
        { label: TEXT.AUTOCOMPLETE.FEMALE, id: '2' },
    ];

    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.USER} backButton />
            <ContentBody>
                <CreateUser initialGender={initialGender} />
            </ContentBody>
        </Content>
    );
};

export default UserCreatePage;
