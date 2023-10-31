import {NextResponse} from "next/server";
import {Member} from "@prisma/client";
import {Session} from "next-auth";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";
import {PatchSelfDto, PatchSelfDtoSchema} from "@/app/api/me/self-user.dto";

class SelfUserService {

    public async getInfo(session: Session): Promise<NextResponse<Member | null>> {
        if (!session.user)
            return buildResponse({
                status: 403,
                message: "Unauthenticated!"
            })

        let member = await prisma.member.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!member)
            return buildResponse({
                status: 404,
                message: "Couldn't find your information!"
            })


        return buildResponse({
            data: member
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
}

const selfUserService = new SelfUserService()
export default selfUserService