import {authenticated} from "@/app/api/utils/api-utils";
import dreamsService from "@/app/api/me/dreams/dreams.service";
import {PostDreamTagDto} from "@/app/api/me/dreams/dreams.dto";

export const GET = async () => {
    return authenticated((session) => (
        dreamsService.fetchTags(session)
    ))
}

export const POST = async (req: Request) => {
    return authenticated(async (session) => {
        const body: PostDreamTagDto = await req.json()
        return dreamsService.createTag(session, body)
    })
}