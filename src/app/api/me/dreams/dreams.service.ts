import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import {Dream, DreamCharacter, DreamTag} from "@prisma/client";
import prisma from "@/libs/prisma";
import {NextResponse} from "next/server";
import {Session} from "next-auth";
import {
    DreamWithRelations, FetchDreamsSchema, PatchDreamCharacterDto, PatchDreamCharacterSchema,
    PatchDreamDto, PatchDreamSchema, PatchDreamTagDto, PatchDreamTagSchema,
    PostDreamCharacterDto,
    PostDreamCharacterSchema,
    PostDreamDto,
    PostDreamSchema,
    PostDreamTagDto,
    PostDreamTagSchema
} from "@/app/api/me/dreams/dreams.dto";

class DreamsService {

    public async fetchDreams(session: Session, searchParams?: URLSearchParams): Promise<NextResponse<DreamWithRelations[] | null>> {
        const paramsValidated = FetchDreamsSchema.safeParse(searchParams)
        if (!paramsValidated.success)
            return buildFailedValidationResponse(paramsValidated.error)

        const {tags: tagsString, characters: charactersString, title: searchedTitle} = paramsValidated.data
        const tags = tagsString?.split(",")
        const characters = charactersString?.split(",")

        const member = session.user
        const dreams = await prisma.dream.findMany({
            where: {
                userId: member.id,
                title: searchedTitle && {
                    contains: searchedTitle,
                    mode: "insensitive"
                },
                tags: tags && {
                    some: {
                        id: {
                            in: tags
                        }
                    }
                },
                characters: characters && {
                    some: {
                        id: {
                            in: characters
                        }
                    }
                }
            },
            include: (tags || characters) && {
                tags: tags !== undefined,
                characters: characters !== undefined
            }
        });

        return buildResponse({
            data: dreams
        })
    }

    public async fetchDream(session: Session, dreamId: string, options?: {
        withTags?: boolean,
        withCharacters?: boolean
    }): Promise<NextResponse<DreamWithRelations | null>> {
        const dream = await this.fetchDreamRaw(session, dreamId, options)
        if (!dream)
            return buildResponse({
                status: 404,
                message: `Couldn't find a dream for you with ID: ${dreamId}`
            })

        return buildResponse({
            data: dream
        })
    }

    private async fetchDreamRaw(session: Session, dreamId: string, options?: {
        withTags?: boolean,
        withCharacters?: boolean
    }): Promise<Dream | null> {
        const member = session.user
        return prisma.dream.findFirst({
            where: {
                id: dreamId,
                userId: member.id
            },
            include: {
                tags: options?.withTags,
                characters: options?.withCharacters
            }
        });
    }

    public async createDream(session: Session, dto: PostDreamDto): Promise<NextResponse<Dream | null>> {
        const dtoValidated = PostDreamSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const dream = await prisma.dream.create({
            data: {
                title: dto.title,
                description: dto.description,
                comments: dto.comments,
                userId: session.user.id,
                tags: {connect: dto.tags?.map(id => ({id})) ?? []},
                characters: {connect: dto.characters?.map(id => ({id})) ?? []}
            }
        })

        return buildResponse({
            data: dream
        })
    }

    public async editDream(session: Session, dreamId: string, dto: PatchDreamDto): Promise<NextResponse<Dream | null>> {
        const dtoValidated = PatchDreamSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const {tags, characters, newTags, newCharacters, ...restDto} = dto

        const genConnections = (newArr?: string[], originalArr?: string[]) => {
            const toConnect = newArr ? newArr
                    .filter(newStr => !originalArr?.some(oldStr => oldStr === newStr))
                    .map(id => ({id}))
                : []

            const toDisconnect = originalArr ? originalArr
                    .filter(originalStr => !newArr?.some(newStr => newStr === originalStr))
                    .map(id => ({id}))
                : []

            return [toConnect, toDisconnect]
        }

        const [tagsToConnect, tagsToDisconnect] = genConnections(newTags, tags)
        const [charactersToConnect, charactersToDisconnect] = genConnections(newCharacters, characters)

        const updatedDream = await prisma.dream.update({
            where: {
                userId: session.user.id,
                id: dreamId
            },
            data: {
                ...restDto,
                tags: {
                    connect: tagsToConnect,
                    disconnect: tagsToDisconnect
                },
                characters: {
                    connect: charactersToConnect,
                    disconnect: charactersToDisconnect,
                }
            }
        })

        return buildResponse({
            data: updatedDream
        })
    }

    public async deleteDream(session: Session, dreamId: string): Promise<NextResponse<Dream | null>> {
        const member = session.user
        const dream = await prisma.dream.delete({
            where: {
                id: dreamId,
                userId: member.id
            },
        })

        return buildResponse({
            data: dream
        })
    }

    public async fetchCharacters(session: Session) {
        const characters = await prisma.dreamCharacter.findMany({
            where: {
                userId: session.user.id
            }
        })

        return buildResponse({
            data: characters
        })
    }

    public async createCharacter(session: Session, dto: PostDreamCharacterDto): Promise<NextResponse<DreamCharacter | null>> {
        const dtoValidated = PostDreamCharacterSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const character = await prisma.dreamCharacter.create({
            data: {
                name: dto.name.toLowerCase(),
                userId: session.user.id,
            }
        })

        return buildResponse({
            data: character
        })
    }

    public async editCharacter(session: Session, characterId: string, dto: PatchDreamCharacterDto): Promise<NextResponse<DreamCharacter | null>> {
        const dtoValidated = PatchDreamCharacterSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const updatedCharacter = await prisma.dreamCharacter.update({
            where: {
                id: characterId,
                userId: session.user.id
            },
            data: dto
        })

        return buildResponse({
            data: updatedCharacter
        })
    }

    public async deleteCharacter(session: Session, characterId: string): Promise<NextResponse<DreamCharacter | null>> {
        const deletedCharacter = await prisma.dreamCharacter.delete({
            where: {
                userId: session.user.id,
                id: characterId
            }
        })

        return buildResponse({
            data: deletedCharacter
        })
    }

    public async fetchTags(session: Session) {
        const tags = await prisma.dreamTag.findMany({
            where: {
                userId: session.user.id
            }
        })

        return buildResponse({
            data: tags
        })
    }

    public async createTag(session: Session, dto: PostDreamTagDto): Promise<NextResponse<DreamTag | null>> {
        const dtoValidated = PostDreamTagSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const tag = await prisma.dreamTag.create({
            data: {
                tag: dto.tag.toLowerCase(),
                userId: session.user.id,
            }
        })

        return buildResponse({
            data: tag
        })
    }

    public async editTag(session: Session, tagId: string, dto: PatchDreamTagDto): Promise<NextResponse<DreamTag | null>> {
        const dtoValidated = PatchDreamTagSchema.safeParse(dto)
        if (!dtoValidated.success)
            return buildFailedValidationResponse(dtoValidated.error)

        const updatedCharacter = await prisma.dreamTag.update({
            where: {
                id: tagId,
                userId: session.user.id
            },
            data: dto
        })

        return buildResponse({
            data: updatedCharacter
        })
    }

    public async deleteTag(session: Session, tagId: string): Promise<NextResponse<DreamTag | null>> {
        const deletedTag = await prisma.dreamTag.delete({
            where: {
                userId: session.user.id,
                id: tagId
            }
        })

        return buildResponse({
            data: deletedTag
        })
    }
}

const dreamsService = new DreamsService()
export default dreamsService