import {z} from "zod";

export type ForgotPasswordDto = {
    email: string,
}

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email!")
})