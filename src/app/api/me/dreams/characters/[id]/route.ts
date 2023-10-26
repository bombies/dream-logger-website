import {authenticated, IdObject, RouteContext} from "@/app/api/utils/api-utils";
import {PatchDreamCharacterDto} from "@/app/api/me/dreams/dreams.dto";
import dreamsService from "@/app/api/me/dreams/dreams.service";

type CharacterRouteContext = RouteContext<IdObject>

export const PATCH = async (req: Request, {params: {id}}: CharacterRouteContext) =>
    authenticated(async (session) => {
        const body: PatchDreamCharacterDto = await req.json()
        return dreamsService.editCharacter(session, id, body)
    }, {
        prismaErrors: {
            recordNotFoundMessage: `Couldn't find a character for you with ID: ${id}`
        }
    })

export const DELETE = async (req: Request, {params: {id}}: CharacterRouteContext) =>
    authenticated(
        (session) => dreamsService.deleteCharacter(session, id), {
            prismaErrors: {
                recordNotFoundMessage: `Couldn't find a character for you with ID: ${id}`
            }
        }
    )