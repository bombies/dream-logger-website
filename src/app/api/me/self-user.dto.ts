import {z} from "zod";
import {USERNAME_REGEX} from "@/app/api/auth/register/register.dto";
import {zfd} from "zod-form-data";

export type PatchSelfDto = Partial<{
    username?: string,
    firstName?: string,
    lastName?: string,
    image?: string,
}>

export const PatchSelfDtoSchema = z.object({
    username: z.string().regex(USERNAME_REGEX, "Invalid username!"),
    firstName: z.string().min(1).max(60),
    lastName: z.string().min(1).max(60),
    image: z.string()
}).partial()

export type DeleteSelfDto = {
    password?: string
}

export const DeleteSelfDtoSchema = zfd.formData({
    password: z.string().optional()
})