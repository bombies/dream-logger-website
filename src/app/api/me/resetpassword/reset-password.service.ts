import {NextResponse} from "next/server";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import {generateRandomString} from "@/app/api/utils/node-utils";
import {JwtPayload, sign, verify} from "jsonwebtoken";
import {Session} from "next-auth";
import prisma from "@/libs/prisma";
import {
    DecodeAndCompareDto,
    DecodeAndCompareSchema,
    UpdatePasswordDto, UpdatePasswordSchema
} from "@/app/api/me/resetpassword/reset-password.dto";
import registerService from "@/app/api/auth/register/register.service";
import Mailer from "@/app/api/utils/mailer";

class ResetPasswordService {
    public async generateResetLink(session: Session): Promise<NextResponse<null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        // Delete existing request
        await prisma.memberPasswordReset.findUnique({
            where: {
                email: session.user.email
            }
        }).then(req => {
            if (req)
                return this.deleteResetRequest(session.user.email)
        })

        const linkId = generateRandomString(64)
        const expiresAt = new Date(Date.now() + (1000 * 60 * 15))
        const payload = {
            email: session.user.email,
            id: linkId
        }

        if (!process.env.NEXTAUTH_SECRET)
            return buildResponse({
                status: 500,
                message: "JWT secret isn't provided!"
            })

        const url = `${process.env.NEXTAUTH_URL}/resetpassword?token=${sign({
            ...payload,
            expiresAt: expiresAt.getTime()
        }, process.env.NEXTAUTH_SECRET, {
            expiresIn: "15m"
        })}`

        await prisma.memberPasswordReset.create({
            data: {
                id: linkId,
                email: session.user.email,
                expiresAt
            }
        })

        await Mailer.sendPasswordReset(session.user.email, session.user.firstName, url)
        return buildResponse({})
    }

    public async decodeAndCompare(session: Session, dto: DecodeAndCompareDto): Promise<NextResponse<null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const dtoValidated = DecodeAndCompareSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        if (!process.env.NEXTAUTH_SECRET)
            return buildResponse({
                status: 500,
                message: "JWT secret isn't provided!"
            })

        try {
            const decoded = verify(dto.token, process.env.NEXTAUTH_SECRET) as {
                id: string,
                email: string,
                expiresAt: number
            } & JwtPayload
            if (decoded.email !== session.user.email)
                return buildResponse({
                    status: 403,
                    message: "You can't do this!"
                })

            if (Date.now() > decoded.expiresAt) {
                await this.deleteResetRequest(session.user.email)
                return buildResponse({
                    status: 401,
                    message: "This reset token is expired!"
                })
            }

            return buildResponse({
                status: 200
            })
        } catch (e) {
            return buildResponse({
                status: 400,
                message: "Invalid token!"
            })
        }
    }

    public async updatePassword(session: Session, dto: UpdatePasswordDto) {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "You aren't authenticated!"
            })

        const dtoValidated = UpdatePasswordSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const verified = await this.decodeAndCompare(session, {
            token: dto.token
        })

        if (verified.status !== 200)
            return verified

        const hashedPassword = await registerService.hashPassword(dto.password)
        await prisma.member.update({
            where: {
                email: session.user.email
            },
            data: {
                password: hashedPassword
            }
        })

        await this.deleteResetRequest(session.user.email)

        return buildResponse({
            status: 200
        })
    }

    private async deleteResetRequest(email: string) {
        return prisma.memberPasswordReset.delete({
            where: {
                email: email
            }
        })
    }
}

const resetPasswordService = new ResetPasswordService()
export default resetPasswordService