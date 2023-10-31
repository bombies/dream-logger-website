import {z} from "zod";
import {PASSWORD_REGEX} from "@/app/api/auth/register/register.dto";

export type DecodeAndCompareDto = {
    token: string,
}

export const DecodeAndCompareSchema = z.object({
    token: z.string({
        required_error: "You must provide a JWT token to decode!"
    })
}).strict()

export type UpdatePasswordDto = {
    password: string,
    token: string,
}

export const UpdatePasswordSchema = z.object({
    password: z.string().regex(PASSWORD_REGEX, "Invalid password!"),
    token: z.string({
        required_error: "You must provide a JWT token to decode!"
    })
}).strict()