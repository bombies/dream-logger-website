import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, {GoogleProfile} from "next-auth/providers/google";
import prisma from "@/libs/prisma";
import {Snowflake} from "@theinternetfolks/snowflake";
import {AccountProvider} from ".prisma/client";
import {compare} from "bcrypt";

const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "email", type: "password"}
            },
            // @ts-ignore
            async authorize(credentials) {
                if (!credentials)
                    throw new Error("Missing credentials!")

                const user = await prisma.user.findFirst(({
                    where: {
                        OR: [
                            {username: credentials.email.toLowerCase()},
                            {email: credentials.email.toLowerCase()}
                        ]
                    }
                }))

                if (!user)
                    throw new Error("Invalid credentials!")
                if (user.password == null)
                    throw new Error("Invalid credentials!")
                if (!await compare(credentials.password, user.password))
                    throw new Error("Invalid credentials!")
                const {id, username, firstName, lastName} = user;
                return {id, username, firstName, lastName}
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60 // 1 day
    },
    jwt: {
        maxAge: 24 * 60 * 60 // 1 day
    },
    callbacks: {
        async signIn({account, profile}) {
            if (account?.provider !== "google")
                return true;

            if (profile) {
                const googleProfile = profile as GoogleProfile
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: googleProfile.email.toLowerCase()
                    }
                })

                if (existingUser)
                    return true;

                await prisma.user.create({
                    data: {
                        email: googleProfile.email,
                        username: `user${Snowflake.generate()}`,
                        firstName: googleProfile.given_name.toLowerCase(),
                        lastName: googleProfile.family_name.toLowerCase(),
                        accountProvider: AccountProvider.GOOGLE
                    }
                })
            }

            return true;
        }
    },
    pages: {
        signIn: '/signin'
    },
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET
}

export default authOptions