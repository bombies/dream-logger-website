import {zfd} from "zod-form-data";
import {
    DREAM_COMMENTS_MAX,
    DREAM_DESC_MAX,
    DREAM_DESC_MIN,
    DREAM_TITLE_MAX,
    DREAM_TITLE_MIN,
    PatchDreamDto
} from "@/app/api/me/dreams/dreams.dto";
import {z} from "zod";

export const DeleteDraftDreamSchema = zfd.formData({
    id: zfd.text()
})

export type PatchDraftDreamDto = Omit<PatchDreamDto, "tags" | "characters" | "newTags" | "newCharacters"> & {
    draftTags?: string[],
    draftCharacters?: string[]
}

export const PatchDraftDreamSchema = z.object({
    title: z.string()
        .min(DREAM_TITLE_MIN, `The title can't be less than ${DREAM_TITLE_MIN} character!`)
        .max(DREAM_TITLE_MAX, `The title can't be more than ${DREAM_TITLE_MAX} characters!`),

    description: z.string()
        .min(DREAM_DESC_MIN, `The description can't be less than ${DREAM_DESC_MIN} character!`)
        .max(DREAM_DESC_MAX, `The description can't be more than ${DREAM_DESC_MAX} characters!`),

    comments: z.string()
        .max(DREAM_COMMENTS_MAX, `The comment can't be more than ${DREAM_COMMENTS_MAX} characters!`)
        .optional(),

    draftTags: z.array(z.string()),
    draftCharacters: z.array(z.string())
}).strict().partial()