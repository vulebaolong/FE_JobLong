import EditUser from '@/components/admin/users/EditUser';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import { getUserByIdAction } from '../action';
import AlertError from '@/components/common/alert/AlertError';
import { getListCompanies } from '../../companies/action';
import { buildOptionsAutocomplete, roleOptionsAutocomplete } from '@/helpers/function.helper';
import { ICompany } from '@/interface/company';
import { ROLE_ADMIN } from '@/constant/role.constant';
import { getListRole } from '../../roles/action';
import { IRole } from '@/interface/role';

interface IProps {
    params: { id: string };
}

async function DetailUserPage({ params }: IProps) {
    const { id } = params;
    const { statusCode, message, data: user } = await getUserByIdAction(id);

    let messageError = '';
    const isEdit = () => {
        if (statusCode !== 200) {
            messageError = message;
            return false;
        }
        if (user.role.name === ROLE_ADMIN) {
            messageError = 'Cannot edit admin account';
            return false;
        }
        return true;
    };

    const dataCompanies = await getListCompanies({
        searchParams: { limit: '999', fields: 'name' },
    });
    const dataRole = await getListRole({
        searchParams: { limit: '999', fields: 'name' },
    });

    const initialGender = [
        { label: TEXT.AUTOCOMPLETE.MALE, id: '1' },
        { label: TEXT.AUTOCOMPLETE.FEMALE, id: '2' },
    ];
    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });
    const initialRole = roleOptionsAutocomplete<IRole>({
        list: dataRole.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });

    return (
        <Content>
            <ContentHeader title={`${TEXT.TITLE.USER_EDIT}`} backButton />
            <ContentBody>
                {isEdit() ? (
                    <EditUser
                        user={user}
                        initialGender={initialGender}
                        initialCompaies={initialCompaies}
                        initialRole={initialRole}
                    />
                ) : (
                    <AlertError message={messageError} />
                )}
            </ContentBody>
        </Content>
    );
}
export default DetailUserPage;
