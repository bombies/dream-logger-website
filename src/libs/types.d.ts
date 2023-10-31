import {Member} from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: Pick<Member, 'id' | 'firstName' | 'lastName' | 'email' | 'createdAt' | "accountProvider">
    }
}