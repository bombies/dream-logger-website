import {authenticated, IdObject, RouteContext} from "@/app/api/utils/api-utils";
import dreamsService from "@/app/api/me/dreams/dreams.service";
import {PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import {json} from "stream/consumers";

export type DreamRouteContext = RouteContext<IdObject>

const TAGS_SEARCH_PARAM = "tags"
const CHARACTERS_SEARCH_PARAM = "characters"

export const GET = async (request: Request, {params: {id}}: DreamRouteContext) =>
    authenticated((session) => {
        const searchParams = new URL(request.url).searchParams
        const withTags = searchParams.get(TAGS_SEARCH_PARAM)?.toLowerCase() === "true"
        const withCharacters = searchParams.get(CHARACTERS_SEARCH_PARAM)?.toLowerCase() === "true"
        return dreamsService.fetchDream(session, id, {withTags, withCharacters})
    })

export const PATCH = async (req: Request, {params}: DreamRouteContext) =>
    authenticated(async (session) => {
        const body: PatchDreamDto = await req.json()
        return dreamsService.editDream(session, params.id, body)
    }, {
        prismaErrors: {
            recordNotFoundMessage: `Couldn't find a dream for you with ID: ${params.id}`
        }
    })

export const DELETE = async (req: Request, {params}: DreamRouteContext) =>
    authenticated((session) => {
        return dreamsService.deleteDream(session, params.id)
    }, {
        prismaErrors: {
            recordNotFoundMessage: `Couldn't find a dream for you with ID: ${params.id}`
        }
    })