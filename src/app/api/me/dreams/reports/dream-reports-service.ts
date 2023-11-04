import {Session} from "next-auth";
import {CountResponse, DreamReportsParamsSchema} from "@/app/api/me/dreams/reports/dream-reports.dto";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import {NextResponse} from "next/server";

class DreamReportsService {

    public async getDreamsAggregate(session: Session, params: URLSearchParams): Promise<NextResponse<CountResponse | null>> {
        const paramsValidated = DreamReportsParamsSchema.safeParse(params)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {from, to, characters, tags} = paramsValidated.data
        const charactersArr = characters?.split(",")
        const tagsArr = tags?.split(",")

        const count = await prisma.dream.aggregate({
            where: {
                ...this.getTimeLimitedWhereQuery(session.user.id, from, to),
                characters: charactersArr && {
                    every: {
                        id: {
                            in: charactersArr
                        }
                    }
                },
                tags: tagsArr && {
                    every: {
                        id: {
                            in: tagsArr
                        }
                    }
                },
            },
            _count: {
                id: true,
            }
        })

        return buildResponse({
            data: {count: count._count.id}
        })
    }

    public async getCharactersAggregate(session: Session, params: URLSearchParams): Promise<NextResponse<CountResponse | null>> {
        const paramsValidated = DreamReportsParamsSchema.safeParse(params)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {from, to} = paramsValidated.data

        const count = await prisma.dreamCharacter.aggregate({
            where: this.getTimeLimitedWhereQuery(session.user.id, from, to),
            _count: {
                id: true,
            }
        })

        return buildResponse({
            data: {count: count._count.id}
        })
    }

    public async getTagsAggregate(session: Session, params: URLSearchParams): Promise<NextResponse<CountResponse | null>> {
        const paramsValidated = DreamReportsParamsSchema.safeParse(params)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {from, to} = paramsValidated.data

        const count = await prisma.dreamTag.aggregate({
            where: this.getTimeLimitedWhereQuery(session.user.id, from, to),
            _count: {
                id: true,
            }
        })

        return buildResponse({
            data: {count: count._count.id}
        })
    }

    private getTimeLimitedWhereQuery(userId: string, from?: string, to?: string) {
        return ({
            userId,
            createdAt: {
                gte: from ? new Date(Number(from)) : undefined,
                lte: to ? new Date(Number(to)) : undefined
            }
        })
    }
}

const dreamReportsService = new DreamReportsService()
export default dreamReportsService