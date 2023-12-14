import { getListRoleAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import ListRole from '@/components/admin/roles/ListRole';
import { checkData } from '@/helpers/function.helper';
import { IRole } from '@/interface/role';
import { Stack } from '@mui/material';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function RolesPage({ searchParams }: IProps) {
    const dataRole = await getListRoleAction({
        searchParams: {
            sort: '-createdAt',
            ...searchParams,
        },
    });

    const { success, messages } = checkData(dataRole);

    const initialActives = [
        { label: 'Active', id: `true` },
        { label: 'Not', id: `false` },
    ];
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.ROLE}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.ROLE.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {success ? (
                    <ListRole
                        dataRole={dataRole.data as IModelPaginate<IRole[]>}
                        initialActives={initialActives}
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
export default RolesPage;
