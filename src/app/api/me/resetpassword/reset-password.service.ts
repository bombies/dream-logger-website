import {NextResponse} from "next/server";
import {buildResponse} from "@/app/api/utils/types";
import {Session} from "next-auth";
import {
    PasswordResetJWT,
    UpdatePasswordDto
} from "../../auth/forgotpassword/forgot-password.dto";
import forgotPasswordService from "@/app/api/auth/forgotpassword/forgot-password.service";
import {ResetPasswordDecodeAndCompareDto} from "@/app/api/me/resetpassword/reset-password.dto";

class ResetPasswordService {
    public async generateResetLink(session: Session): Promise<NextResponse<null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })
        const searchParams = new URLSearchParams({email: session.user.email})
        return forgotPasswordService.sendPasswordResetUrl(searchParams)
    }

    public async decodeAndCompare(session: Session, dto: ResetPasswordDecodeAndCompareDto): Promise<NextResponse<PasswordResetJWT | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        return forgotPasswordService.decodeAndCompare({
            ...dto,
            email: session.user.email
        })
    }

    public async updatePassword(session: Session, dto: UpdatePasswordDto) {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        return forgotPasswordService.updatePassword(dto, session.user.email)
    }
}

const resetPasswordService = new ResetPasswordService()
export default resetPasswordService