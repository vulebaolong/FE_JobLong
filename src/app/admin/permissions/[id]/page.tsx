import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';
import AlertError from '@/components/common/alert/AlertError';
import { getPermissionByIdAction } from '../action';
import EditPermissions from '@/components/admin/permissions/EditPermissions';

interface IProps {
    params: { id: string };
}

async function EditPermissionPage({ params }: IProps) {
    const { id } = params;
    const dataPermission = await getPermissionByIdAction(id);

    const initialMethods = TEXT.AUTOCOMPLETE.METHODS.map((method, index) => {
        return { label: method, id: `${index}` };
    });

    return (
        <Content>
            <ContentHeader title={`${TEXT.TITLE.PERMISSION_EDIT}`} backButton />
            <ContentBody>
                {dataPermission.success && dataPermission.data ? (
                    <EditPermissions
                        permission={dataPermission.data}
                        initialMethods={initialMethods}
                    />
                ) : (
                    <AlertError message={dataPermission.message} />
                )}
            </ContentBody>
        </Content>
    );
}
export default EditPermissionPage;
