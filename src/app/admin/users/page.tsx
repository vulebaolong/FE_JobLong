import ListUser from "@/components/admin/users/ListUser";
import { getListUserAction } from "./action";

interface IProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const UsersPage = async ({ searchParams }: IProps) => {
    const dataUser = await getListUserAction();
    return (
        <div>
            <ListUser dataUser={dataUser} />
        </div>
    );
};
export default UsersPage;
