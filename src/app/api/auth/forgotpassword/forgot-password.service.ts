import {NextResponse} from "next/server";
import {
    DecodeAndCompareDto, DecodeAndCompareSchema,
    ForgotPasswordDto,
    ForgotPasswordSchema, PasswordResetJWT,
    UpdatePasswordDto, UpdatePasswordSchema
} from "@/app/api/auth/forgotpassword/forgot-password.dto";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import Mailer from "@/app/api/utils/mailer";
import {generateRandomString} from "@/app/api/utils/node-utils";
import {JwtPayload, sign, verify} from "jsonwebtoken";
import registerService from "@/app/api/auth/register/register.service";


class ForgotPasswordService {

    /**
     * This function will work in a way such that when a user requests
     * a password resets, if there's already an existing one, the previous
     * request will be invalidated and the new one created and pushed to the
     * database. Once the database record has been created, a URL will be
     * generated to redirect the user to a page which allows them to reset
     * their password. The URL will be "signed", meaning it contains a signed
     * JWT token to ensure the integrity of the requests.
     */
    public async sendPasswordResetUrl(dto: URLSearchParams): Promise<NextResponse<null>> {
        const dtoValidated = ForgotPasswordSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const {email} = dtoValidated.data
        // Delete existing request
        await prisma.memberPasswordReset.findUnique({
            where: {email}
        }).then(req => {
            if (req)
                return this.deleteResetRequest(email)
        })

        const linkId = generateRandomString(64)
        const expiresAt = new Date(Date.now() + (1000 * 60 * 15))

        // Check if email belongs to a valid user
        const emailHolder = await prisma.member.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        if (!emailHolder || emailHolder.accountProvider != null)
            return buildResponse({})

        const payload = {email, id: linkId}

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
                email,
                expiresAt
            }
        })

        await Mailer.sendPasswordReset(email, emailHolder.firstName, url)
        return buildResponse({})
    }

    public async updatePassword(dto: UpdatePasswordDto, restrictToEmail?: string) {
        const dtoValidated = UpdatePasswordSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const verified = await this.decodeAndCompare({
            email: restrictToEmail,
            token: dto.token
        })

        if (verified.status !== 200)
            return verified

        const decodedToken: ForgotPasswordDto = await verified.json()

        const hashedPassword = await registerService.hashPassword(dto.password)
        await prisma.member.update({
            where: {
                email: restrictToEmail ?? decodedToken.email
            },
            data: {
                password: hashedPassword
            }
        })

        await this.deleteResetRequest(restrictToEmail ?? decodedToken.email)
        return buildResponse({
            status: 200
        })
    }

    public async decodeAndCompare(dto: DecodeAndCompareDto): Promise<NextResponse<PasswordResetJWT | null>> {
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

            if (dto.email && decoded.email !== dto.email)
                return buildResponse({
                    status: 403,
                    message: "You can't do this!"
                })

            if (Date.now() > decoded.expiresAt) {
                await this.deleteResetRequest(decoded.email)
                return buildResponse({
                    status: 401,
                    message: "This reset token is expired!"
                })
            }

            return buildResponse({
                data: decoded
            })
        } catch (e) {
            return buildResponse({
                status: 400,
                message: "Invalid token!"
            })
        }
    }

    private async deleteResetRequest(email?: string) {
        if (!email)
            return

        return prisma.memberPasswordReset.delete({
            where: {
                email: email
            }
        })
    }
}

const forgotPasswordService = new ForgotPasswordService()
export default forgotPasswordService