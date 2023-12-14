// import { IUserLogin } from './../interface/auth';
// import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGIN } from '@/constant/userContants';
// import { JWT } from 'next-auth/jwt';
// import NextAuth, { DefaultSession } from 'next-auth';
// import { IUserLogin } from '@/interface/auth';

// declare module 'next-auth' {
//     /**
//      * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         // [USER_LOGIN]: string;
//         user: IUserLogin & DefaultSession['user'];
//         [ACCESS_TOKEN]: string;
//         [REFRESH_TOKEN]: string;
//         error?: string;
//     }

//     interface User {
//         [USER_LOGIN]: IUserLogin;
//         [ACCESS_TOKEN]: string;
//         [REFRESH_TOKEN]: string;
//     }
// }

// declare module 'next-auth/jwt' {
//     /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//     interface JWT {
//         [USER_LOGIN]: IUserLogin;
//         [ACCESS_TOKEN]: string;
//         [REFRESH_TOKEN]: string;
//         error?: string;
//     }
// }
