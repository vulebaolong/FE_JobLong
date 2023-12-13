import ListPermissions from '@/components/admin/permissions/ListPermissions';
import { getListPermissionsAction } from './action';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import NavButton from '@/components/common/button/NavButton';
import { ROUTES } from '@/constant/routes.contants';
import AlertError from '@/components/common/alert/AlertError';

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
}

async function PermissionsPage({ searchParams }: IProps) {
    const dataPermission = await getListPermissionsAction({
        searchParams: {
            sort: '-createdAt',
            ...searchParams,
        },
    });
    const initialMethods = TEXT.AUTOCOMPLETE.METHODS.map((method, index) => {
        return { label: method, id: `${index}` };
    });
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.PERMISSION}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.PERMISSION.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                {dataPermission.success && dataPermission.data ? (
                    <ListPermissions
                        dataPermission={dataPermission.data}
                        initialMethods={initialMethods}
                    />
                ) : (
                    <AlertError message={dataPermission.message} />
                )}
            </ContentBody>
        </Content>
    );
}
export default PermissionsPage;
