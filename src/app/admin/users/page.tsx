import ListUser from "@/components/admin/users/ListUser";
import { getListUserAction } from "./action";
import Content, { ContentBody, ContentHeader } from "@/components/common/content/Content";
import NavButton from "@/components/common/button/NavButton";
import { TEXT } from "@/constant/text.contants";
import { ROUTES } from "@/constant/routes.contants";

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | undefined };
  }

const UsersPage = async ({ searchParams }: IProps) => {
    const dataUser = await getListUserAction({ searchParams });
    return (
        <Content>
            <ContentHeader
                title={TEXT.TITLE.USER}
                rightContent={
                    <NavButton href={ROUTES.ADMIN.USERS.CREATE} text={TEXT.BUTTON_TEXT.ADD} />
                }
            />
            <ContentBody>
                <ListUser dataUser={dataUser} />
            </ContentBody>
        </Content>
    );
};
export default UsersPage;
