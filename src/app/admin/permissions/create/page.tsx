import CreatePermission from '@/components/admin/permissions/CreatePermission';
import Content, { ContentBody, ContentHeader } from '@/components/common/content/Content';
import { TEXT } from '@/constant/text.contants';

function PermissionCreatePage() {
    const initialMethods = TEXT.AUTOCOMPLETE.METHODS.map((method, index) => {
        return { label: method, id: `${index}` };
    });
    return (
        <Content>
            <ContentHeader title={TEXT.TITLE.PERMISSION_CREATE} backButton />
            <ContentBody>
                <CreatePermission initialMethods={initialMethods} />
            </ContentBody>
        </Content>
    );
}
export default PermissionCreatePage;
