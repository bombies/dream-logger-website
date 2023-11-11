import {ApiRoute, authenticated} from "@/app/api/utils/api-utils";
import dreamDraftsService from "@/app/api/me/dreams/drafts/dream-drafts.service";

export const GET: ApiRoute = async () => (
    authenticated((session) => (
        dreamDraftsService.getDrafts(session)
    ))
)

export const POST: ApiRoute = async () => (
    authenticated((session) => (
        dreamDraftsService.createDraft(session)
    ))
)

export const DELETE: ApiRoute = async (req) => (
    authenticated((session) => (
        dreamDraftsService.deleteDraft(session, new URL(req.url).searchParams)
    ), {
        prismaErrors: {
            recordNotFoundMessage: "Couldn't find a draft dream with that ID!"
        }
    })
)