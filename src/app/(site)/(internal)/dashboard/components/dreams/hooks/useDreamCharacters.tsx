import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client-utils";
import {DreamCharacter} from "@prisma/client";
import {useCallback} from "react";
import {DreamContextState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreams";

export type DreamCharactersState = DreamContextState<DreamCharacter[], DreamCharacter>

const useDreamCharacters = (): DreamCharactersState => {
    const {data: characters, isLoading: charactersLoading, mutate: mutateCharacters} = useSWR('/api/me/dreams/characters', fetcher<DreamCharacter[]>)

    const addOptimisticCharacter = useCallback(async (work: () => Promise<DreamCharacter | undefined | null>, optimisticCharacter: DreamCharacter) => {
        if (!characters)
            return
        const mutate = mutateCharacters as KeyedMutator<DreamCharacter[]>
        const doWork = async (): Promise<DreamCharacter[]> => {
            const character = await work()
            if (!character)
                return characters
            return [...characters, character]
        }

        await mutate(doWork, {
            optimisticData: [...characters, optimisticCharacter]
        })
    }, [characters, mutateCharacters])

    const removeOptimisticCharacter = useCallback(async (work: () => Promise<DreamCharacter | undefined | null>, removedOptimisticCharacter: DreamCharacter) => {
        if (!characters)
            return
        const mutate = mutateCharacters as KeyedMutator<DreamCharacter[]>
        const doWork = async (): Promise<DreamCharacter[]> => {
            const removedCharacter = await work()
            if (!removedCharacter)
                return characters
            return characters.filter(character => character.id !== removedCharacter.id)
        }

        await mutate(doWork, {
            optimisticData: characters.filter(dream => dream.id !== removedOptimisticCharacter.id)
        })
    }, [characters, mutateCharacters])

    return {
        data: characters ?? [],
        loading: charactersLoading,
        mutateData: characters ? (mutateCharacters as KeyedMutator<DreamCharacter[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticCharacter,
            removeOptimisticData: removeOptimisticCharacter
        }
    }
}

export default useDreamCharacters