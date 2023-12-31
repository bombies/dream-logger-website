import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {Dream} from "@prisma/client";
import {useCallback} from "react";
import {DataContextState, OptimisticWorker} from "@/utils/client/client-data-utils";

export type DreamsState = DataContextState<Dream[], Dream>

const useDreams = (): DreamsState => {
    const {
        data: dreams,
        isLoading: dreamsLoading,
        mutate: mutateDreams
    } = useSWR('/api/me/dreams?includeDrafts=true', fetcher<Dream[]>)

    const addOptimisticDream = useCallback<OptimisticWorker<Dream>>(async (work, optimisticDream, options) => {
        if (!dreams)
            return
        const mutate = mutateDreams
        const doWork = async (): Promise<Dream[]> => {
            const dream = await work()
            if (!dream)
                return dreams
            return [...dreams, dream]
        }

        await mutate(doWork, {
            optimisticData: [...dreams, optimisticDream],
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [dreams, mutateDreams])

    const removeOptimisticDream = useCallback<OptimisticWorker<Dream>>(async (work, removedOptimisticDream) => {
        if (!dreams)
            return
        const mutate = mutateDreams
        const doWork = async (): Promise<Dream[]> => {
            const removedDream = await work()
            if (!removedDream)
                return dreams
            return dreams.filter(dream => dream.id !== removedDream.id)
        }

        await mutate(doWork, {
            optimisticData: dreams.filter(dream => dream.id !== removedOptimisticDream.id),
            rollbackOnError: true,
            revalidate: false,
        })
    }, [dreams, mutateDreams])

    const editOptimisticDream = useCallback<OptimisticWorker<Dream>>(async (work, editedOptimisticDream, options) => {
        if (!dreams)
            return

        const mutate = mutateDreams

        const doUpdate = (editedDream: Dream): Dream[] => {
            const newArr = dreams.filter(dream => dream.id !== editedDream.id)
            newArr.push(editedDream)
            return newArr
        }

        const doWork = async (): Promise<Dream[]> => {
            const updatedDream = await work()
            if (!updatedDream)
                return dreams
            return doUpdate(updatedDream)
        }

        await mutate(doWork, {
            optimisticData: doUpdate(editedOptimisticDream),
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [dreams, mutateDreams])

    return {
        data: dreams ?? [],
        loading: dreamsLoading,
        mutateData: dreams ? (mutateDreams as KeyedMutator<Dream[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticDream,
            removeOptimisticData: removeOptimisticDream,
            editOptimisticData: editOptimisticDream
        }
    }
}

export default useDreams