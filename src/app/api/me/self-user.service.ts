import {NextResponse} from "next/server";
import {Member} from "@prisma/client";
import {Session} from "next-auth";
import {buildResponse} from "@/app/api/utils/types";
import prisma from "@/libs/prisma";

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
}

const selfUserService = new SelfUserService()
export default selfUserService