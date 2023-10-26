import {NextResponse} from "next/server";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {buildResponse, RouteResponseType} from "@/app/api/utils/types";
import {Member, Prisma} from "@prisma/client";
import prisma from "@/libs/prisma";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;

export type RouteContext<T extends { [K: string]: string }> = {
    params: T
}

export type IdObject = {id: string}

type PrismaErrorOptions = {
    recordNotFoundMessage?: string

}

type AuthenticatedRequestOptions = {
    fetchMember?: boolean
    prismaErrors?: PrismaErrorOptions
}

export const authenticated = async (logic: (session: Session, member?: Member) => Promise<NextResponse>, options?: AuthenticatedRequestOptions): Promise<NextResponse> => {
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
        const prismaError = prismaErrorHandler(e, options?.prismaErrors)
        if (prismaError)
            return prismaError

        console.error(e)
        return buildResponse({
            status: 500,
            message: "Internal Server Error"
        })
    }
}

const prismaErrorHandler = (e: any, options?: PrismaErrorOptions): NextResponse<null> | undefined => {
    if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2001")
            return buildResponse({
                status: 404,
                message: options?.recordNotFoundMessage ?? `Couldn't find any records to complete execution!`
            })
    }
    return undefined
}