import {NextResponse} from "next/server";
import {Member} from "@prisma/client";
import {Session} from "next-auth";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import {DeleteSelfDtoSchema, PatchSelfDto, PatchSelfDtoSchema} from "@/app/api/me/self-user.dto";
import {compare} from "bcrypt";

class SelfUserService {

    public async getInfo(session: Session): Promise<NextResponse<Omit<Member, "password"> | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "Unauthenticated!"
            })

        let member = await prisma.member.findUnique({
            where: {
                email: session.user.email
            },
        })

        if (!member)
            return buildResponse({
                status: 404,
                message: "Couldn't find your information!"
            })

        const {password, ...memberDetails} = member

        return buildResponse({
            data: memberDetails
        })
    }

    public async update(session: Session, dto: PatchSelfDto): Promise<NextResponse<Member | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "Unauthenticated!"
            })

        const dtoValidated = PatchSelfDtoSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const updatedUser = await prisma.member.update({
            where: {
                email: session.user.email
            },
            data: dto
        })

        return buildResponse({
            data: updatedUser
        })
    }

    public async delete(session: Session, dto: URLSearchParams): Promise<NextResponse<Member | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "Unauthenticated!"
            })

        const dtoValidated = DeleteSelfDtoSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const {password} = dtoValidated.data
        const user = await prisma.member.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                password: true,
                accountProvider: true
            }
        })

        if (!user)
            return buildResponse({
                status: 404,
                message: "Couldn't find any information for you!"
            })

        if (user.password !== null && !(await compare(password ?? "", user.password)))
            return buildResponse({
                status: 400,
                message: "Invalid password!"
            })

        const deletedUser = await prisma.member.delete({
            where: {
                id: session.user.id
            }
        })

        return buildResponse({
            data: deletedUser
        })
    }
}

const selfUserService = new SelfUserService()
export default selfUserService