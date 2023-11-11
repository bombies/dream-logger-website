import {Session} from "next-auth";
import {NextResponse} from "next/server";
import {Dream} from "@prisma/client";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import {
    DeleteDraftDreamSchema,
    PatchDraftDreamDto,
    PatchDraftDreamSchema
} from "@/app/api/me/dreams/drafts/dream-drafts.dto";

class DreamDraftsService {

    async getDrafts(session: Session): Promise<NextResponse<Dream[] | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const dreams = await prisma.dream.findMany({
            where: {
                userId: session.user.id,
                isDraft: true,
            }
        })

        return buildResponse({
            data: dreams
        })
    }

    async createDraft(session: Session): Promise<NextResponse<Dream | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const dreamCount = await prisma.dream.aggregate({
            where: {
                isDraft: true,
            },
            _count: {id: true}
        })

        const createdDraft = await prisma.dream.create({
            data: {
                title: `Draft Dream #${dreamCount._count.id + 1}`,
                description: "",
                userId: session.user.id,
                isDraft: true,
            }
        })

        return buildResponse({
            data: createdDraft
        })
    }

    async editDraft(session: Session, dreamId: string, dto: PatchDraftDreamDto): Promise<NextResponse<Dream | null>> {
        const dtoValidated = PatchDraftDreamSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const updatedDream = await prisma.dream.update({
            where: {
                userId: session.user.id,
                id: dreamId,
                isDraft: true
            },
            data: dto
        })

        return buildResponse({
            data: updatedDream
        })
    }

    async deleteDraftWithParams(session: Session, searchParams: URLSearchParams): Promise<NextResponse<Dream | null>> {
        const paramsValidated = DeleteDraftDreamSchema.safeParse(searchParams)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {id} = paramsValidated.data
        return this.deleteDraft(session, id)
    }

    async deleteDraft(session: Session, draftId: string): Promise<NextResponse<Dream | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const deletedDream = await prisma.dream.delete({
            where: {
                id: draftId,
                userId: session.user.id,
                isDraft: true,
            }
        })

        return buildResponse({
            data: deletedDream
        })
    }

}

const dreamDraftsService = new DreamDraftsService()
export default dreamDraftsService