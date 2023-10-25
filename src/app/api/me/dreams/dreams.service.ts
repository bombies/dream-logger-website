import {buildFailedValidationResponse, buildResponse} from "@/app/api/utils/types";
import {Dream, DreamCharacter, DreamTag} from "@prisma/client";
import prisma from "@/libs/prisma";
import {NextResponse} from "next/server";
import {Session} from "next-auth";
import {
    PostDreamCharacterDto,
    PostDreamCharacterSchema,
    PostDreamDto,
    PostDreamSchema, PostDreamTagDto
} from "@/app/api/me/dreams/dreams.dto";

class DreamsService {

    public async fetchDreams(session: Session): Promise<NextResponse<Dream[] | undefined>> {
        const member = session.user
        const dreams = await prisma.dream.findMany({
            where: {
                userId: member.id
            }
        });

        return buildResponse({
            data: dreams
        })
    }

    public async createDream(session: Session, dto: PostDreamDto): Promise<NextResponse<Dream | undefined>> {
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

    public async createCharacter(session: Session, dto: PostDreamCharacterDto): Promise<NextResponse<DreamCharacter | undefined>> {
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

    public async createTag(session: Session, dto: PostDreamTagDto): Promise<NextResponse<DreamTag | undefined>> {
        const dtoValidated = PostDreamCharacterSchema.safeParse(dto)
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
}

const dreamsService = new DreamsService()
export default dreamsService