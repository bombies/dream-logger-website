import {Session} from "next-auth";
import {NextResponse} from "next/server";
import {Dream} from "@prisma/client";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import {DeleteDraftDreamSchema} from "@/app/api/me/dreams/drafts/dream-drafts.dto";

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
                userId: session.user.id
            }
        })

        return buildResponse({
            data: createdDraft
        })
    }

    async deleteDraft(session: Session, searchParams: URLSearchParams): Promise<NextResponse<Dream | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const paramsValidated = DeleteDraftDreamSchema.safeParse(searchParams)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {id} = paramsValidated.data
        const deletedDream = await prisma.dream.delete({
            where: {
                id,
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