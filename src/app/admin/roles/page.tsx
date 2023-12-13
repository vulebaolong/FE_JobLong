import { getListRoleAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';
import ListRole from '@/components/admin/roles/ListRole';

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
    const initialActives = [
        { label: 'Active', id: `true` },
        { label: 'Not', id: `false` }
    ]
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.ROLE}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.ROLE.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {dataRole.success && dataRole.data ? (
                    <ListRole
                        dataRole={dataRole.data}
                        initialActives={initialActives}
                    />
                ) : (
                    <AlertError message={dataRole.message} />
                )}
            </ContentBody>
        </Content>
    );
}
export default RolesPage;
