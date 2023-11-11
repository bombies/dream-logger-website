import {ApiRoute, authenticated, IdObject} from "@/app/api/utils/api-utils";
import dreamDraftsService from "@/app/api/me/dreams/drafts/dream-drafts.service";

export const PATCH: ApiRoute<IdObject> = async (req, {params: {id}}) => (
    authenticated(async (session) => (
        dreamDraftsService.editDraft(session, id, await req.json())
    ), {
        prismaErrors: {
            recordNotFoundMessage: "Couldn't update a draft with that ID!"
        }
    })
)

export const DELETE: ApiRoute<IdObject> = async (req, {params: {id}}) => (
    authenticated((session) => (
        dreamDraftsService.deleteDraft(session, id)
    ), {
        prismaErrors: {
            recordNotFoundMessage: "Couldn't delete a draft with that ID!"
        }
    })
)