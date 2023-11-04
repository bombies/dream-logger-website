import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {DreamTag} from "@prisma/client";
import {useCallback} from "react";
import {DataContextState, OptimisticWorker} from "@/utils/client/client-data-utils";

export type DreamTagsState = DataContextState<DreamTag[], DreamTag>

type Args = {
    load?: boolean
}

const API_ROUTE = '/api/me/dreams/tags'
const useDreamTags = (args?: Args): DreamTagsState => {
    const {
        data: tags,
        isLoading: tagsLoading,
        mutate: mutateTags
    } = useSWR(args?.load !== false && API_ROUTE, fetcher<DreamTag[]>)

    const addOptimisticCharacter = useCallback<OptimisticWorker<DreamTag>>(async (work, optimisticCharacter) => {
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

    const removeOptimisticCharacter = useCallback<OptimisticWorker<DreamTag>>(async (work, removedOptimisticCharacter) => {
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

    const editOptimisticTag = useCallback<OptimisticWorker<DreamTag>>(async (work, editedOptimisticTag) => {
        if (!tags)
            return;

        const doUpdate = (editedTag: DreamTag): DreamTag[] => {
            const newArr = tags.filter(tag => tag.id !== editedTag.id)
            newArr.push(editedTag)
            return newArr
        }

        const doWork = async (): Promise<DreamTag[]> => {
            const updatedTag = await work()
            if (!updatedTag)
                return tags
            return doUpdate(updatedTag)
        }

        await mutateTags(doWork, {
            optimisticData: doUpdate(editedOptimisticTag),
            rollbackOnError: true
        })
    }, [mutateTags, tags])

    return {
        data: tags ?? [],
        loading: tagsLoading,
        mutateData: tags ? (mutateTags as KeyedMutator<DreamTag[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticCharacter,
            removeOptimisticData: removeOptimisticCharacter,
            editOptimisticData: editOptimisticTag
        }
    }
}

export default useDreamTags