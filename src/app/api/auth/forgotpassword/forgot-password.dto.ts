import {z} from "zod";
import {PASSWORD_REGEX} from "@/app/api/auth/register/register.dto";
import {JwtPayload} from "jsonwebtoken";
import {zfd} from "zod-form-data";

export type ForgotPasswordDto = {
    email: string,
}

export const ForgotPasswordSchema = zfd.formData({
    email: z.string().email("Invalid email!")
})

export type DecodeAndCompareDto = {
    email?: string,
    token: string,
}


export const DecodeAndCompareSchema = z.object({
    email: z.string().email("Invalid email!").optional(),
    token: z.string({
        required_error: "You must provide a JWT token to decode!"
    })
}).strict()

export type UpdatePasswordDto = {
    password: string,
    token: string,
}

export const UpdatePasswordSchema = z.object({
    email: z.string().email("Invalid email!").optional(),
    password: z.string().regex(PASSWORD_REGEX, "Invalid password!"),
    token: z.string({
        required_error: "You must provide a JWT token to decode!"
    })
}).strict()

export type PasswordResetJWT = { id: string, email: string, expiresAt: number } & JwtPayload