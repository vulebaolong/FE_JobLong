import ListUser from '@/components/admin/users/ListUser';
import { getListUserAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import NavButton from '@/components/common/button/NavButton';
import { TEXT } from '@/constant/text.contants';
import { ROUTES } from '@/constant/routes.contants';
import { getListCompaniesAction } from '../companies/action';
import { buildOptionsAutocomplete, checkData } from '@/helpers/function.helper';
import { ICompany } from '@/interface/company';
import { getListRoleAction } from '../roles/action';
import { IRole } from '@/interface/role';
import AlertError from '@/components/common/alert/AlertError';
import { IUser } from '@/interface/user';
import { Stack } from '@mui/material';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

const UsersPage = async ({ searchParams }: IProps) => {
    const dataUser = await getListUserAction({
        searchParams: {
            populate: 'role,company',
            fields: 'role.name,company.name',
            sort: '-createdAt',
            ...searchParams,
        },
    });
    const dataCompanies = await getListCompaniesAction({
        searchParams: { limit: '999', fields: 'name' },
    });
    const dataRole = await getListRoleAction({
        searchParams: { limit: '999', fields: 'name' },
    });

    const { success, messages } = checkData(dataUser, dataCompanies, dataRole);

    const initialCompaies = buildOptionsAutocomplete<ICompany>({
        list: dataCompanies.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });
    const initialRole = buildOptionsAutocomplete<IRole>({
        list: dataRole.data?.data?.result || [],
        keyId: '_id',
        keyLabel: 'name',
    });
    const initialGender = [
        { label: TEXT.AUTOCOMPLETE.MALE, id: '1' },
        { label: TEXT.AUTOCOMPLETE.FEMALE, id: '2' },
    ];

    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.USER}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.USERS.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListUser
                        dataUser={dataUser.data as IModelPaginate<IUser[]>}
                        initialCompaies={initialCompaies}
                        initialRole={initialRole}
                        initialGender={initialGender}
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
};
export default UsersPage;
