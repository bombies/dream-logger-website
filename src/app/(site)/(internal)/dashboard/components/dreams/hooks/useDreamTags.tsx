import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client-utils";
import {DreamTag} from "@prisma/client";
import {useCallback} from "react";
import {DreamContextState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreams";

export type DreamTagsState = DreamContextState<DreamTag[], DreamTag>

const useDreamTags = (): DreamTagsState => {
    const {data: tags, isLoading: tagsLoading, mutate: mutateTags} = useSWR('/api/me/dreams/tags', fetcher<DreamTag[]>)

    const addOptimisticCharacter = useCallback(async (work: () => Promise<DreamTag | undefined | null>, optimisticCharacter: DreamTag) => {
        if (!tags)
            return
        const mutate = mutateTags as KeyedMutator<DreamTag[]>
        const doWork = async (): Promise<DreamTag[]> => {
            const tag = await work()
            if (!tag)
                return tags
            return [...tags, tag]
        }

        await mutate(doWork, {
            optimisticData: [...tags, optimisticCharacter]
        })
    }, [tags, mutateTags])

    const removeOptimisticCharacter = useCallback(async (work: () => Promise<DreamTag | undefined | null>, removedOptimisticCharacter: DreamTag) => {
        if (!tags)
            return
        const mutate = mutateTags as KeyedMutator<DreamTag[]>
        const doWork = async (): Promise<DreamTag[]> => {
            const removedTag = await work()
            if (!removedTag)
                return tags
            return tags.filter(character => character.id !== removedTag.id)
        }

        await mutate(doWork, {
            optimisticData: tags.filter(dream => dream.id !== removedOptimisticCharacter.id)
        })
    }, [tags, mutateTags])

    return {
        data: tags ?? [],
        loading: tagsLoading,
        mutateData: tags ? (mutateTags as KeyedMutator<DreamTag[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticCharacter,
            removeOptimisticData: removeOptimisticCharacter
        }
    }
}

export default useDreamTags