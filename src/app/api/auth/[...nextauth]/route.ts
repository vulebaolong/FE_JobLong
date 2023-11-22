import { ILoginRequest } from "./../../../../interface/auth";
import { authApi } from "@/api/authApi";
import NextAuth, { AuthOptions, Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { ACCESS_TOKEN, USER_LOGIN } from "@/constant/userContants";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: ILoginRequest | Record<never, string> | undefined, req) {
                if (!credentials) return

                const { username, password } = credentials as ILoginRequest;

                const { data } = await authApi.login({ username, password });

                if (data.statusCode === 201) return data.data;

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {

            // console.log("session ::::::>", session);
            // console.log("token ::::::>", token);
            // console.log("user ::::::>", user);
            return {
                ...session,
                access_token: token[ACCESS_TOKEN],
                user_login: token[USER_LOGIN]
            };
        },
        async jwt({ token, user }) {

            if (!user) return token;
            if (ACCESS_TOKEN in user && USER_LOGIN in user) {
                const accessToken = user[ACCESS_TOKEN];
                token[ACCESS_TOKEN] = accessToken;

                const userLogin = user[USER_LOGIN];
                token[USER_LOGIN] = userLogin;
            }
            // console.log("token =>>>>>>>>", token);
            // console.log("user =>>>>>>>>", user);
            return token;
        }
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