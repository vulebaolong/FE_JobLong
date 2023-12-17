import CreateUser from '@/components/admin/users/CreateUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import { buildOptionsAutocomplete } from '@/helpers/function.helper';
import { getListCompaniesAction } from '../../companies/action';
import { ICompany } from '@/interface/company';

const UserCreatePage = async () => {
    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const initialGender = [
        { label: TEXT.AUTOCOMPLETE.MALE, id: '1' },
        { label: TEXT.AUTOCOMPLETE.FEMALE, id: '2' },
    ];
    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.USER_CREATE} backButton />
            <ContentBody>
                <CreateUser initialGender={initialGender} initialCompaies={initialCompaies} />
            </ContentBody>
        </Content>
    );
};

export default UserCreatePage;
