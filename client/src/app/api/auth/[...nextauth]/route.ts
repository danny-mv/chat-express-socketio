import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid Credentials")
                }
                const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/login`, {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                    })
                if (!authResponse.ok) {
                    return null
                }
                const jsonResponse = await authResponse.json()
                
                return {...jsonResponse.data,
                email: credentials.email}
        }})
    ],
    callbacks:{
        async jwt({token,user}){
            return {...token, ...user}
        },
        async session({session, token, user}){
            session.user = token as any
            return session
        }
    },
    session:{
        strategy: "jwt"
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }