import { ILoginRequest, ISessionUser } from "./../../../../interface/auth";
import { authApi } from "@/api/authApi";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from "@/constant/userContants";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import { cookies } from "next/headers";
import { sendRequest } from "@/api/api";
import { getCookies } from "@/helpers/cookies";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: ILoginRequest | Record<never, string> | undefined, req) {
                if (!credentials) return null;

                const { username, password } = credentials as ILoginRequest;

                const resultJson = await sendRequest<IBackendRes<ISessionUser>>({
                    url: 'auth/login',
                    method: 'POST',
                    body: { username, password },
                    isJsonParse: false
                })

                const cookiesHeader = resultJson.headers.get('set-cookie');
                let refresh_token = ''
                if (cookiesHeader) refresh_token = getCookies(cookiesHeader)[REFRESH_TOKEN];

                const result: IBackendRes<ISessionUser> = await resultJson.json();

                if (result.statusCode === 201) {
                    result.data.refresh_token = refresh_token
                    return result.data
                };

                return null;
            }
        }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID!,
        //     clientSecret: process.env.GITHUB_SECRET!,
        // }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID!,
        //     clientSecret: process.env.FACEBOOK_SECRET!,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID!,
        //     clientSecret: process.env.GOOGLE_SECRET!,
        // }),

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (!user) return token;
            token.access_token = user.access_token
            token.refresh_token = user.refresh_token
            token.user = user.user
            // console.log("user =>>>>>>>>", user);
            // console.log("token =>>>>>>>>", token);
            return token;
        },
        async session({ session, token }) {
            session.access_token = token.access_token
            session.refresh_token = token.refresh_token
            session.user = token.user
            // console.log("token ::::::>", token);
            // console.log("session ::::::>", session);
            return session
        },

    },
    // pages: {
    //     signIn: '/auth/login',
    //     signOut: '/auth/signout',
    //     // error: '/auth/error', // Error code passed in query string as ?error=
    //     // verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/register',
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }