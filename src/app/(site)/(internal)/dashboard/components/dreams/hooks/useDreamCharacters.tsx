import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {DreamCharacter, DreamTag} from "@prisma/client";
import {useCallback} from "react";
import {DataContextState} from "@/utils/client/client-data-utils";
import useSWRMutation from "swr/mutation";

export type DreamCharactersState = DataContextState<DreamCharacter[], DreamCharacter>

const API_ROUTE = '/api/me/dreams/characters'

export const FetchDreamCharacters = () => {
    return useSWRMutation(API_ROUTE, fetcher<DreamCharacter[]>)
}

type Args = {
    load?: boolean
}

const useDreamCharacters = (args?: Args): DreamCharactersState => {
    const {
        data: characters,
        isLoading: charactersLoading,
        mutate: mutateCharacters
    } = useSWR(args?.load !== false && API_ROUTE, fetcher<DreamCharacter[]>)

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