import {RegisterUserDto, RegisterUserDtoSchema} from "@/app/api/auth/register/register.dto";
import {User} from "@prisma/client";
import prisma from "@/libs/prisma";
import bcrypt from 'bcrypt';
import {NextResponse} from "next/server";
import {buildResponse} from "@/app/api/utils/types";

class RegisterService {
    public async registerUser(dto: RegisterUserDto): Promise<NextResponse<User | undefined>> {
        const dtoValidated = RegisterUserDtoSchema.safeParse(dto);
        if (!dtoValidated.success)
            return buildResponse({
                status: 400,
                message: dtoValidated.error.message
            })

        const existingUser = await prisma.user.findFirst(({
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

        const salt = bcrypt.genSaltSync(12)
        const hashedPassword = await bcrypt.hash(dto.password, salt)
        const createdUser = await prisma.user.create({
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
}

const registerService = new RegisterService()
export default registerService