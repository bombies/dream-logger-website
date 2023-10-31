import {authenticated} from "@/app/api/utils/api-utils";
import selfUserService from "@/app/api/me/self-user.service";

export const GET = async () => {
    return authenticated((session) =>
        selfUserService.getInfo(session)
    )
}

export const PATCH = async (req: Request) => {
    return authenticated(async (session) =>
            selfUserService.update(session, await req.json()), {
            prismaErrors: {
                recordNotFoundMessage: "Couldn't find your information!",
                uniqueConstraintFailed(target) {
                    return `There is already a user with that ${target}!`
                }
            }
        }
    )
}

export const DELETE = async (req: Request) => (
    authenticated(async (session) => (
        selfUserService.delete(session, new URL(req.url).searchParams)
    ))
)