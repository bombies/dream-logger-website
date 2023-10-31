import {authenticated} from "@/app/api/utils/api-utils";
import resetPasswordService from "@/app/api/me/resetpassword/reset-password.service";

export const GET = async () =>
    authenticated((session) =>
        resetPasswordService.generateResetLink(session)
    )

export const POST = async (req: Request) =>
    authenticated(async (session) =>
        resetPasswordService.decodeAndCompare(session, await req.json())
    )

export const PATCH = async (req: Request) =>
    authenticated(async (session) =>
        resetPasswordService.updatePassword(session, await req.json())
    )