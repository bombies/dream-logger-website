import {z} from "zod";

export type RegisterUserDto = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,1024}$/
export const USERNAME_REGEX = /^[a-zA-Z_](\w{2,32})$/

export const RegisterUserDtoSchema = z.object({
    username: z.string().regex(USERNAME_REGEX, "Invalid username! Usernames must begin with a letter or an underscore and should be 3-32 characters long."),
    email: z.string().email("Invalid email!"),
    password: z.string().regex(PASSWORD_REGEX, "Password must have at least 1 uppercase and lower character and 1 number while being at least 8 characters long."),
    firstName: z.string().min(1).max(60),
    lastName: z.string().min(1).max(60),
}).strict()

