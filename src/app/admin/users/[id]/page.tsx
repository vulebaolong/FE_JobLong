import EditUser from '@/components/admin/users/EditUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import { getUserByIdAction } from '../action';
import AlertError from '@/components/common/alert/AlertError';
import { getListCompaniesAction } from '../../companies/action';
import { buildOptionsAutocomplete, roleOptionsAutocomplete } from '@/helpers/function.helper';
import { ICompany } from '@/interface/company';
import { getListRoleAction } from '../../roles/action';
import { IRole } from '@/interface/role';

interface IProps {
    params: { id: string };
}

async function EditUserPage({ params }: IProps) {
    const { id } = params;
    const dataUser = await getUserByIdAction(id);

    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });
    const dataRole = await getListRoleAction({
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
    const initialRole = roleOptionsAutocomplete<IRole>({
        list: dataRole.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    return (
        <Content>
            <ContentHeader title={`${TEXT.TITLE.USER_EDIT}`} backButton />
            <ContentBody>
                {dataUser.success && dataUser.data ? (
                    <EditUser
                        user={dataUser.data}
                        initialGender={initialGender}
                        initialCompaies={initialCompaies}
                        initialRole={initialRole}
                    />
                ) : (
                    <AlertError message={dataUser.message} />
                )}
            </ContentBody>
        </Content>
    );
}
export default EditUserPage;
