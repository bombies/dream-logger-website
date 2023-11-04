import {authenticated} from "@/app/api/utils/api-utils";
import dreamsService from "@/app/api/me/dreams/dreams.service";
import {PostDreamDto} from "@/app/api/me/dreams/dreams.dto";

export const GET = async (req: Request) => {
    return authenticated((session) => (
        dreamsService.fetchDreams(session, new URL(req.url).searchParams)
    ))
}

export const POST = async (req: Request) => {
    return authenticated(async (session) => {
        const body: PostDreamDto = await req.json()
        return dreamsService.createDream(session, body)
    })
}