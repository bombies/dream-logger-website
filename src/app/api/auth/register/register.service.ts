import {RegisterUserDto, RegisterUserDtoSchema} from "@/app/api/auth/register/register.dto";
import {Member} from "@prisma/client";
import prisma from "@/libs/prisma";
import bcrypt from 'bcrypt';
import {NextResponse} from "next/server";
import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";

class RegisterService {
    public async registerUser(dto: RegisterUserDto): Promise<NextResponse<Member | null>> {
        const dtoValidated = RegisterUserDtoSchema.safeParse(dto);
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const existingUser = await prisma.member.findFirst(({
            where: {
                OR: [
                    {username: dto.username.toLowerCase()},
                    {email: dto.email.toLowerCase()}
                ]
            }
        }))

        if (existingUser)
            return buildResponse({
                status: 400,
                message: "There is already a user with that username/email!"
            })

        const hashedPassword = await this.hashPassword(dto.password)
        const createdUser = await prisma.member.create({
            data: {
                firstName: dto.firstName.toLowerCase(),
                lastName: dto.lastName.toLowerCase(),
                username: dto.username.toLowerCase(),
                password: hashedPassword,
                email: dto.email.toLowerCase(),
            }
        })

        return buildResponse({
            data: createdUser
        })
    }

    public async hashPassword(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync(12)
        return bcrypt.hash(password, salt)
    }
}

const registerService = new RegisterService()
export default registerService