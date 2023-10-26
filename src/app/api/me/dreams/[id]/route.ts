import {authenticated} from "@/app/api/utils/api-utils";
import dreamsService from "@/app/api/me/dreams/dreams.service";

export type DreamRouteContext = {
    params: {
        id: string
    }
}

const TAGS_SEARCH_PARAM = "tags"
const CHARACTERS_SEARCH_PARAM = "characters"

export const GET = async (request: Request, {params}: DreamRouteContext) =>
    authenticated((session) => {
        const searchParams = new URL(request.url).searchParams
        const withTags = searchParams.get(TAGS_SEARCH_PARAM)?.toLowerCase() === "true"
        const withCharacters = searchParams.get(CHARACTERS_SEARCH_PARAM)?.toLowerCase() === "true"
        return dreamsService.fetchDream(session, params.id, {withTags, withCharacters})
    })