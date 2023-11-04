import {z} from "zod";
import {zfd} from "zod-form-data";

export type CountResponse = {
    count: number
}

export type DreamReportsParams = {
    from?: string,
    to?: string,
    tags?: string,
    characters?: string
}

export const DreamReportsParamsSchema = zfd.formData({
    from: z.string().regex(/[0-9]+/, "\"from\" must be a valid number!").optional(),
    to: z.string().regex(/[0-9]+/, "\"to\" must be a valid number!").optional(),
    tags: z.string().optional(),
    characters: z.string().optional()
})