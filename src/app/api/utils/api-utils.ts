import {NextRequest, NextResponse} from "next/server";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {buildResponse} from "@/app/api/utils/types";
import {Member, Prisma} from "@prisma/client";
import prisma from "@/libs/prisma";
import PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
import RateLimiter, {RateLimiterGeoLimit} from "@/app/api/utils/rate-limiter";

export type RouteContext<T extends { [K: string]: string } | unknown> = {
    params: T
}

export type ApiRoute<T extends {
    [K: string]: string
} | unknown = unknown> = (request: NextRequest, context: RouteContext<T>) => Promise<NextResponse>

export type IdObject = { id: string }

type PrismaErrorOptions = {
    recordNotFoundMessage?: string,
    uniqueConstraintFailed?: string | ((target: string) => string),

}

type RateLimiterOptions = {
    NAME: string,
    /**
     * The number of requests that can be done within the specified duration
     */
    REQUEST_LIMIT?: number,
    /**
     * The duration, in seconds, to watch for requests.
     */
    DURATION?: number,
    GEO_LIMITS?: RateLimiterGeoLimit[]
}

type AuthenticatedRequestOptions = {
    request?: NextRequest,
    fetchMember?: boolean,
    prismaErrors?: PrismaErrorOptions,
    rateLimiter?: RateLimiterOptions
}

export const rateLimited = async (req: NextRequest, logic: () => Promise<NextResponse>, options: RateLimiterOptions): Promise<NextResponse> => {
    const rateLimiter = new RateLimiter(options?.NAME, options?.REQUEST_LIMIT, options?.DURATION, options?.GEO_LIMITS)
    return await rateLimiter.handle(req, logic)
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

            if (options.request && options.rateLimiter)
                return await rateLimited(options.request, () => logic(session, member), options.rateLimiter)
            else
                return await logic(session, member)
        }

        if (options?.request && options?.rateLimiter)
            return await rateLimited(options.request, () => logic(session), options.rateLimiter)
        else
            return await logic(session)
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
        switch (e.code) {
            case "P2001": {
                return buildResponse({
                    status: 404,
                    message: options?.recordNotFoundMessage ?? `Couldn't find any records to complete execution!`
                })
            }
            case "P2002": {
                return buildResponse({
                    status: 400,
                    message: options?.uniqueConstraintFailed ?
                        (options.uniqueConstraintFailed instanceof Function
                            ? options.uniqueConstraintFailed((e.meta!.target as string[])[0])
                            : options.uniqueConstraintFailed as string)
                        : `There is already a record with the value of that unique constraint!`
                })
            }
        }
    }
    return undefined
}