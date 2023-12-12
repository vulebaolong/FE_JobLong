import CreatePermission from "@/components/admin/permissions/CreatePermission"
import Content, { ContentBody, ContentHeader } from "@/components/common/content/Content"
import { TEXT } from "@/constant/text.contants"

function PermissionCreatePage() {
  return (
    <Content>
        <ContentHeader title={TEXT.TITLE.PERMISSION} backButton />
        <ContentBody>
            <CreatePermission />
        </ContentBody>
    </Content>
  )
}
export default PermissionCreatePage