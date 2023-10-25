import {RegisterUserDto} from "@/app/api/auth/register/register.dto";
import registerService from "@/app/api/auth/register/register.service";

export const POST = async (req: Request) => {
    const body: RegisterUserDto = await req.json()
    return registerService.registerUser(body)
}