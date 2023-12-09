import Content, {
  ContentBody,
  ContentHeader,
} from "@/components/common/content/Content";
import { TEXT } from "@/constant/text.contants";

const UserCreatePage = async () => {
  //   const organizations = await actionGetAllOrganizations();

  return (
    <Content>
      <ContentHeader title={TEXT.TITLE.USER} backButton />
      <ContentBody>TenantCreate</ContentBody>
    </Content>
  );
};

export default UserCreatePage;
