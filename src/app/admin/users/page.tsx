import ListUser from "@/components/admin/users/ListUser";
import { getListUserAction } from "./action";
import Content, {
  ContentBody,
  ContentHeader,
} from "@/components/common/content/Content";
import NavButton from "@/components/common/button/NavButton";
import { TEXT } from "@/constant/text.contants";
import { ROUTES } from "@/constant/routes.contants";
import { getListCompanies } from "../companies/action";
import { buildOptionsAutocomplete } from "@/helpers/function.helper";
import { ICompany } from "@/interface/company";
import { getListRole } from "../roles/action";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/common/skeleton/table.skeleton";
import { log } from "@/helpers/log";

interface IProps {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}

const UsersPage = async ({ searchParams }: IProps) => {
  const dataUser = await getListUserAction({
    searchParams: {
      populate: "role,company",
      fields: "role.name,company.name",
      sort: "-createdAt",
      ...searchParams,
    },
  });
  const dataCompanies = await getListCompanies({
    searchParams: { limit: "999", fields: "name" },
  });
  const dataRole = await getListRole({
    searchParams: { limit: "999", fields: "name" },
  });

  const initialCompaies = buildOptionsAutocomplete<ICompany>({
    list: dataCompanies.data?.result || [],
    keyId: "_id",
    keyLabel: "name",
  });
  const initialRole = buildOptionsAutocomplete<ICompany>({
    list: dataRole.data?.result || [],
    keyId: "_id",
    keyLabel: "name",
  });
  const initialGender = [
    { label: TEXT.AUTOCOMPLETE.MALE, id: "1" },
    { label: TEXT.AUTOCOMPLETE.FEMALE, id: "2" },
  ];

  return (
    <Content>
      <ContentHeader
        title={TEXT.TITLE.USER}
        rightContent={
          <NavButton
            href={ROUTES.ADMIN.USERS.CREATE}
            text={TEXT.BUTTON_TEXT.ADD}
          />
        }
      />
      <ContentBody>
        <ListUser
          dataUser={dataUser}
          initialCompaies={initialCompaies}
          initialRole={initialRole}
          initialGender={initialGender}
        />
      </ContentBody>
    </Content>
  );
};
export default UsersPage;
