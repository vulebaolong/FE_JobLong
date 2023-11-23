import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession as getServerSessionNextAuth } from "next-auth"
import { authOptions } from "./route"


// Use it in server contexts
export function getServerSession(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSessionNextAuth(...args, authOptions)
}