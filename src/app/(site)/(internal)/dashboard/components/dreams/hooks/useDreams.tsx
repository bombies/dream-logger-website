import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client-utils";
import {Dream} from "@prisma/client";
import {useCallback} from "react";

export type DreamsState = DreamContextState<Dream[], Dream>

export type DreamContextState<T, O> = {
    loading: boolean,
    data: T,
    mutateData?: KeyedMutator<T>,
    optimisticData: {
        addOptimisticData: (work: () => Promise<O | undefined | null>, optimisticData: O) => Promise<void>,
        removeOptimisticData: (work: () => Promise<O | undefined | null>, removedData: O) => Promise<void>,
    }
}

const useDreams = (): DreamsState => {
    const {data: dreams, isLoading: dreamsLoading, mutate: mutateDreams} = useSWR('/api/me/dreams', fetcher<Dream[]>)

    const addOptimisticDream = useCallback(async (work: () => Promise<Dream | undefined | null>, optimisticDream: Dream) => {
        if (!dreams)
            return
        const mutate = mutateDreams as KeyedMutator<Dream[]>
        const doWork = async (): Promise<Dream[]> => {
            const dream = await work()
            if (!dream)
                return dreams
            return [...dreams, dream]
        }

        await mutate(doWork, {
            optimisticData: [...dreams, optimisticDream]
        })
    }, [dreams, mutateDreams])

    const removeOptimisticDream = useCallback(async (work: () => Promise<Dream | undefined | null>, removedOptimisticDream: Dream) => {
        if (!dreams)
            return
        const mutate = mutateDreams as KeyedMutator<Dream[]>
        const doWork = async (): Promise<Dream[]> => {
            const removedDream = await work()
            if (!removedDream)
                return dreams
            return dreams.filter(dream => dream.id !== removedDream.id)
        }

        await mutate(doWork, {
            optimisticData: dreams.filter(dream => dream.id !== removedOptimisticDream.id)
        })
    }, [dreams, mutateDreams])

    return {
        data: dreams ?? [],
        loading: dreamsLoading,
        mutateData: dreams ? (mutateDreams as KeyedMutator<Dream[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticDream,
            removeOptimisticData: removeOptimisticDream
        }
    }
}

export default useDreams