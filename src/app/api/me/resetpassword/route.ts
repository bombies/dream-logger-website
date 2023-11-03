import {authenticated} from "@/app/api/utils/api-utils";
import resetPasswordService from "@/app/api/me/resetpassword/reset-password.service";
import {NextRequest} from "next/server";

export const GET = async (req: NextRequest) =>
    authenticated((session) =>
            resetPasswordService.generateResetLink(session),
        {
            request: req,
            rateLimiter: {
                NAME: "send_resetpassword_url",
                REQUEST_LIMIT: 1
            }
        }
    )

export const POST = async (req: Request) =>
    authenticated(async (session) =>
        resetPasswordService.decodeAndCompare(session, await req.json())
    )

export const PATCH = async (req: Request) =>
    authenticated(async (session) =>
        resetPasswordService.updatePassword(session, await req.json())
    )