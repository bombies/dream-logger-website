import {z} from "zod";
import {Dream, DreamCharacter, DreamTag, Member} from "@prisma/client";
import {zfd} from "zod-form-data";

export const FetchDreamsSchema = zfd.formData({
    includeDrafts: z.string().regex(/(true)|(false)/).optional(),
    tags: z.string().optional(),
    characters: z.string().optional(),
    title: z.string().optional()
})

export type PostDreamDto = {
    id: string,
    title: string,
    description: string,
    comments?: string | null,
    tags?: string[]
    characters?: string[]
}

export type PatchDreamDto = Partial<PostDreamDto> & {
    newTags?: string[],
    newCharacters?: string[]
}

export const DREAM_TITLE_MIN = 1
export const DREAM_TITLE_MAX = 500
export const DREAM_DESC_MIN = 1
export const DREAM_DESC_MAX = 5000
export const DREAM_COMMENTS_MAX = 1000

export const PostDreamSchema = z.object({
    id: z.string(),
    title: z.string()
        .min(DREAM_TITLE_MIN, `The title can't be less than ${DREAM_TITLE_MIN} character!`)
        .max(DREAM_TITLE_MAX, `The title can't be more than ${DREAM_TITLE_MAX} characters!`),

    description: z.string()
        .min(DREAM_DESC_MIN, `The description can't be less than ${DREAM_DESC_MIN} character!`)
        .max(DREAM_DESC_MAX, `The description can't be more than ${DREAM_DESC_MAX} characters!`),

    comments: z.string()
        .max(DREAM_COMMENTS_MAX, `The comment can't be more than ${DREAM_COMMENTS_MAX} characters!`)
        .optional(),

    tags: z.array(z.string()).optional(),
    characters: z.array(z.string()).optional(),
    newTags: z.array(z.string()).optional(),
    newCharacters: z.array(z.string()).optional(),
}).strict()

export const PatchDreamSchema = PostDreamSchema.partial()

export type PostDreamTagDto = {
    tag: string,
}

export type PatchDreamTagDto = Partial<PostDreamTagDto>

export const DREAM_TAG_MIN = 1
export const DREAM_TAG_MAX = 64

export const PostDreamTagSchema = z.object({
    tag: z.string()
        .min(DREAM_TAG_MIN, `The tag can't be less than ${DREAM_TAG_MIN} character!`)
        .max(DREAM_TAG_MAX, `The tag can't be more than ${DREAM_TAG_MAX} characters!`)
}).strict()

export const PatchDreamTagSchema = PostDreamTagSchema.partial()

export type PostDreamCharacterDto = {
    name: string,
}

export type PatchDreamCharacterDto = Partial<PostDreamCharacterDto>

export const DREAM_CHARACTER_MIN = 1
export const DREAM_CHARACTER_MAX = 256

export const PostDreamCharacterSchema = z.object({
    name: z.string()
        .min(DREAM_CHARACTER_MIN, `The name can't be less than ${DREAM_CHARACTER_MIN} character!`)
        .max(DREAM_CHARACTER_MAX, `The name can't be more than ${DREAM_CHARACTER_MAX} characters!`)
}).strict()

export const PatchDreamCharacterSchema = PostDreamCharacterSchema.partial()

export type DreamWithRelations = Dream & {
    tags?: DreamTag[]
    characters?: DreamCharacter[]
    user?: Member[]
}