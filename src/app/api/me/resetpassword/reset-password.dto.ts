import {z} from "zod";

export type ResetPasswordDecodeAndCompareDto = {
    token: string,
}