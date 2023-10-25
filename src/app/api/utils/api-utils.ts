import {NextResponse} from "next/server";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {buildResponse} from "@/app/api/utils/types";

export const authenticated = async (logic: (session: Session) => Promise<NextResponse>): Promise<NextResponse> => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user)
        return buildResponse({
            status: 403,
            message: "Unauthorized!"
        })
    return logic(session)
}