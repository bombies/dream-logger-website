import {authenticated, IdObject, RouteContext} from "@/app/api/utils/api-utils";
import {PatchDreamTagDto} from "@/app/api/me/dreams/dreams.dto";
import dreamsService from "@/app/api/me/dreams/dreams.service";

type TagsRouteContext = RouteContext<IdObject>

export const PATCH = async (req: Request, {params: {id}}: TagsRouteContext) =>
    authenticated(async (session) => {
        const body: PatchDreamTagDto = await req.json()
        return dreamsService.editTag(session, id, body)
    }, {
        prismaErrors: {
            recordNotFoundMessage: `Couldn't find a tag for you with ID: ${id}`
        }
    })

export const DELETE = async (req: Request, {params: {id}}: TagsRouteContext) =>
    authenticated(
        (session) => dreamsService.deleteTag(session, id), {
            prismaErrors: {
                recordNotFoundMessage: `Couldn't find a tag for you with ID: ${id}`
            }
        }
    )