import CreateUser from '@/components/admin/users/CreateUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import { buildOptionsAutocomplete } from '@/helpers/function.helper';
import { getListRole } from '../../roles/action';
import { IRole } from '@/interface/role';
import { getListCompanies } from '../../companies/action';
import { ICompany } from '@/interface/company';

const UserCreatePage = async () => {
    const dataRole = await getListRole({
        searchParams: { limit: '999', fields: 'name' },
    });
    const dataCompanies = await getListCompanies({
        searchParams: { limit: '999', fields: 'name' },
    });

    const initialGender = [
        { label: TEXT.AUTOCOMPLETE.MALE, id: '1' },
        { label: TEXT.AUTOCOMPLETE.FEMALE, id: '2' },
    ];
    const initialRole = buildOptionsAutocomplete<IRole>({
        list: dataRole.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });
    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.USER} backButton />
            <ContentBody>
                <CreateUser 
                    initialGender={initialGender} 
                    initialRole={initialRole}
                    initialCompaies={initialCompaies}
                />
            </ContentBody>
        </Content>
    );
};

export default UserCreatePage;
