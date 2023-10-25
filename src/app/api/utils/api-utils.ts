import {NextResponse} from "next/server";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {buildResponse} from "@/app/api/utils/types";
import {Member} from "@prisma/client";
import prisma from "@/libs/prisma";

export const authenticated = async (logic: (session: Session, member?: Member) => Promise<NextResponse>, options?: {
    fetchMember?: boolean
}): Promise<NextResponse> => {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user)
            return buildResponse({
                status: 403,
                message: "Unauthorized!"
            })

        if (options?.fetchMember) {
            const member = await prisma.member.findUnique({
                where: {
                    email: session.user.email
                }
            })

            if (!member)
                return buildResponse({
                    status: 404,
                    message: "Couldn't find information for your user!"
                })
        }

        return logic(session)
    } catch (e) {
        console.error(e)
        return buildResponse({
            status: 404,
            message: "Internal Server Error"
        })
    }
}