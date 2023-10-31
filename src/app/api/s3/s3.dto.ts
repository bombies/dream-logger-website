import {z} from "zod";
import {zfd} from "zod-form-data";

export type S3FileFetchFormDto = {
    key: string,
}

export const S3FileFetchFormSchema = zfd.formData({
    key: z.string({
        required_error: "The \"key\" query is required!"
    })
})

export const S3PostFormDataSchema = zfd.formData({
    key: z.string().optional(),
    path: z.string().regex(/.+\/$/, "The path must end with a forward slash!").optional(),
    file: z.custom<File>(),
    isPublic: z.string().optional(),
    oldKey: z.string().optional()
})