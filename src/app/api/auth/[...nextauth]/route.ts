import { ILoginRequest } from "./../../../../interface/auth";
import { authApi } from "@/api/authApi";
import NextAuth, { AuthOptions } from "next-auth"
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                // username: { label: "Username", type: "text", placeholder: "jsmith" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials: ILoginRequest | Record<never, string> | undefined, req) {
                if (!credentials) return

                const { username, password } = credentials as ILoginRequest;

                const { data } = await authApi.login({ username, password });

                const { access_token, user } = data.data

                if (data.statusCode === 201) return data.data;

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            return session
        },
        async jwt({ token, user }) {

            if (!user) return token;
            if ('access_token' in user) {
                const accessToken = user.access_token;
                token.access_token = accessToken;
            }
            console.log("token =>>>>>>>>", token);
            console.log("user =>>>>>>>>", user);
            return token;
        }
    }
    // pages: {
    //     signIn: '/auth/login',
    //     newUser: '/auth/register'
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }