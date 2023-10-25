import {authenticated} from "@/app/api/utils/api-utils";
import dreamsService from "@/app/api/me/dreams/dreams.service";
import {PostDreamCharacterDto} from "@/app/api/me/dreams/dreams.dto";

export const GET = async () => {
    return authenticated((session) => (
        dreamsService.fetchCharacters(session)
    ))
}

export const POST = async (req: Request) => {
    return authenticated(async (session) => {
        const body: PostDreamCharacterDto = await req.json()
        return dreamsService.createCharacter(session, body)
    })
}