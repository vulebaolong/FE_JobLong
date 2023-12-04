'use server'

import { cookies } from "next/headers";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from "@/constant/userContants";
import { ISessionUser } from "@/interface/auth";


export const setSessionUser = (token: ISessionUser) => {  
  cookies().set(ACCESS_TOKEN, token[ACCESS_TOKEN]);
  cookies().set(REFRESH_TOKEN, token[REFRESH_TOKEN]);
  cookies().set(USER_LOGIN, JSON.stringify(token[USER_LOGIN]));
};

export const getSessionUser = (): ISessionUser => {

  return {
    [ACCESS_TOKEN]: `${cookies().get(ACCESS_TOKEN)}`,
    [REFRESH_TOKEN]: `${cookies().get(REFRESH_TOKEN)}`,
    // [USER_LOGIN]: JSON.parse(`${cookies().get(USER_LOGIN)}`),
  } as ISessionUser
};

export const deleteSessionUser = () => {
  cookies().delete(REFRESH_TOKEN);
  cookies().delete(ACCESS_TOKEN);
  cookies().delete(USER_LOGIN);
};