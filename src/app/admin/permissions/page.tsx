import ListPermissions from "@/components/admin/permissions/ListPermissions";
import { getListPermissionsAction } from "./action";

interface IProps {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

async function PermissionsPage({ searchParams }: IProps) {
  const dataPermissions = await getListPermissionsAction({ searchParams });
  return (
    <div>
      <ListPermissions dataPermissions={dataPermissions} />
    </div>
  );
}
export default PermissionsPage;
