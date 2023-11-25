import { ILoginRequest, ISessionUser } from "./../../../../interface/auth";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from "@/constant/userContants";
import { sendRequest } from "@/api/api";
import { getCookies } from "@/helpers/cookies";
import { JWT } from "next-auth/jwt";
import jwt from 'jsonwebtoken'
import { BASE_URL_API } from "@/constant/apiContants";
import dayjs from "dayjs";
import { decodeJWT } from "@/helpers/jwt";
import { log } from "@/helpers/log";

async function refreshAccessToken(token: JWT) {
    try {
        if (process.env.JWT_ACCESS_TOKEN_SECRET) jwt.verify(token.access_token, process.env.JWT_ACCESS_TOKEN_SECRET)

        log(`refreshAccessToken :::>>>`, 'ACCESS_TOKEN hợp lệ', "RED")

        decodeJWT(token?.refresh_token, 'refreshAccessToken/refresh_token')
        decodeJWT(token?.access_token, 'refreshAccessToken/access_token')

        return {
            ...token,
        }
    } catch (error: any) {
        if (error.message === 'jwt expired') {
            log(`refreshAccessToken :::>>>`, 'ACCESS_TOKEN hết hạn', "RED")

            const resultJson = await fetch(`${BASE_URL_API}/auth/refresh`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Cookie: `refresh_token=${token?.refresh_token}`
                },
                method: "GET",
            })

            const cookiesHeader = resultJson.headers.get('set-cookie');
            // console.log('cookiesHeader', cookiesHeader);
            let refresh_token = ''
            if (cookiesHeader) refresh_token = getCookies(cookiesHeader)[REFRESH_TOKEN];

            const result: IBackendRes<ISessionUser> = await resultJson.json();

            if (result.statusCode === 200) {
                log('refreshAccessToken/refresh :::>>>', 'refresh token thành công', "RED");

                result.data.refresh_token = refresh_token

                decodeJWT(result.data.refresh_token, 'refreshAccessToken/refresh_token')
                decodeJWT(result.data.access_token, 'refreshAccessToken/access_token')

                return {
                    ...token,
                    access_token: result.data.access_token,
                    refresh_token: result.data.refresh_token,
                }
            } else {
                log('refreshAccessToken/refresh :::>>>', 'refresh token không thành công', "RED");
            };
        }

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
}

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
                // console.log('cookiesHeader', cookiesHeader);
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
        async jwt({ token, user, trigger, session }) {
            console.log("jwt/trigger: ", trigger);

            if (user) {
                token.access_token = user.access_token
                token.refresh_token = user.refresh_token
                token.user = user.user
                return token;
            }

            return await refreshAccessToken(token)
        },
        async session({ session, token, trigger }) {
            log('session/trigger :::>>>', trigger, "YELLOW");
            log('session/token :::>>>', token, "YELLOW");

            // if(token.error) log('session/token :::>>>', 'Đăng nhập lại', "YELLOW");
            if (token) {
                session.access_token = token.access_token
                session.refresh_token = token.refresh_token
                session.user = token.user
                session.error = token.error
            }
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