import {NextRequest, NextResponse} from "next/server";
import {rateLimited} from "@/app/api/utils/api-utils";
import forgotPasswordService from "@/app/api/auth/forgotpassword/forgot-password.service";

export const GET = async (req: NextRequest): Promise<NextResponse> => (
    rateLimited(req, async () => (
        forgotPasswordService.sendPasswordResetUrl(new URL(req.url).searchParams)
    ), {
        NAME: "send_forgotpassword_url",
        REQUEST_LIMIT: 1
    })
)

export const POST = async (req: NextRequest) => (
    rateLimited(req, async () => (
        forgotPasswordService.decodeAndCompare(await req.json())
    ), {
        NAME: "verify_forgotpassword_url",
    })
)

export const PATCH = async (req: NextRequest) => (
    rateLimited(req, async () => (
        forgotPasswordService.updatePassword(await req.json())
    ), {
        NAME: "forgotpassword_update",
    })
)