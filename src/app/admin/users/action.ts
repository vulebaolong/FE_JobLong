"use server";

import { sendRequestAction } from "@/app/action";
import { convertStringToBoolean } from "@/helpers/formik.helper";
import { IUserInfo } from "@/interface/user";
import { revalidateTag } from "next/cache";

interface IProps {
  searchParams: { [key: string]: string | undefined };
}

export const getListUserAction = async ({ searchParams }: IProps) => {
  const currentPage = searchParams.currentPage || 1;
  const limit = searchParams.limit || 10;

  const query: string[] = [];
  if (searchParams.fields) query.push(`fields=${searchParams.fields.trim()}`);
  if (searchParams.populate)
    query.push(`populate=${searchParams.populate.trim()}`);
  if (searchParams.sort) query.push(`sort=${searchParams.sort.trim()}`);

  if (searchParams.name) query.push(`name=/${searchParams.name.trim()}/i`);
  if (searchParams.address)
    query.push(`address=/${searchParams.address.trim()}/i`);
  if (searchParams.age) query.push(`age=/${searchParams.age.trim()}/i`);
  if (searchParams.company)
    query.push(`company=${searchParams.company.trim()}`);
  if (searchParams.email) query.push(`email=${searchParams.email.trim()}`);
  if (searchParams.gender) query.push(`gender=${searchParams.gender.trim()}`);
  if (searchParams.role) query.push(`role=${searchParams.role.trim()}`);
  console.log(searchParams.isDeleted);
  if (searchParams.isDeleted === "false") query.push(`isDeleted!=true`);

  // console.log(query);

  return await sendRequestAction<IModelPaginate<IUserInfo[]>>({
    url: `users?currentPage=${currentPage}&limit=${limit}&${query.join("&")}`,
    method: "GET",
    nextOption: {
      next: { tags: ["getListUserAction"] },
    },
  });
};

export const deleteUserByIdAction = async (id: string) => {
  const result = await sendRequestAction<IBackendRes<IResponseUpdate>>({
    url: `users/${id}`,
    method: "DELETE",
  });

  revalidateTag("getListUserAction");

  return result;
};

export const restoreUserByIdAction = async (id: string) => {
  const result = await sendRequestAction<IBackendRes<IResponseUpdate>>({
    url: `users/restore/${id}`,
    method: "PATCH",
  });

  revalidateTag("getListUserAction");

  return result;
};
