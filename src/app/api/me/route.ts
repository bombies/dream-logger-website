import {authenticated} from "@/app/api/utils/api-utils";
import selfUserService from "@/app/api/me/self-user.service";

export const GET = async () => {
    return authenticated((session) =>
        selfUserService.getInfo(session)
    )
}