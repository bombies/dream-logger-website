import useSWR, {KeyedMutator} from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {DreamCharacter} from "@prisma/client";
import {useCallback} from "react";
import {DataContextState, OptimisticWorker} from "@/utils/client/client-data-utils";

export type DreamCharactersState = DataContextState<DreamCharacter[], DreamCharacter>

const API_ROUTE = '/api/me/dreams/characters'

type Args = {
    load?: boolean
}

const useDreamCharacters = (args?: Args): DreamCharactersState => {
    const {
        data: characters,
        isLoading: charactersLoading,
        mutate: mutateCharacters
    } = useSWR(args?.load !== false && API_ROUTE, fetcher<DreamCharacter[]>)

    const addOptimisticCharacter = useCallback<OptimisticWorker<DreamCharacter>>(async (work, optimisticCharacter) => {
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
            optimisticData: [...characters, optimisticCharacter],
            rollbackOnError: true,
            revalidate: false,
        })
    }, [characters, mutateCharacters])

    const removeOptimisticCharacter = useCallback<OptimisticWorker<DreamCharacter>>(async (work, removedOptimisticCharacter) => {
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
            optimisticData: characters.filter(dream => dream.id !== removedOptimisticCharacter.id),
            rollbackOnError: true,
            revalidate: false,
        })
    }, [characters, mutateCharacters])

    const editOptimisticCharacter = useCallback<OptimisticWorker<DreamCharacter>>(async (work, editedOptimisticCharacter) => {
        if (!characters)
            return;

        const doUpdate = (editedCharacter: DreamCharacter): DreamCharacter[] => {
            const characterIndex = characters.findIndex((character) => character.id === editedCharacter.id)
            if (characterIndex === -1)
                return characters

            const arrCopy = [...characters]
            arrCopy.splice(characterIndex, 1, editedCharacter)
            return arrCopy
        }

        const doWork = async (): Promise<DreamCharacter[]> => {
            const updatedCharacter = await work()
            if (!updatedCharacter)
                return characters
            return doUpdate(updatedCharacter)
        }

        await mutateCharacters(doWork, {
            optimisticData: doUpdate(editedOptimisticCharacter),
            rollbackOnError: true,
            revalidate: false,
        })
    }, [characters, mutateCharacters])

    return {
        data: characters ?? [],
        loading: charactersLoading,
        mutateData: characters ? (mutateCharacters as KeyedMutator<DreamCharacter[]>) : undefined,
        optimisticData: {
            addOptimisticData: addOptimisticCharacter,
            removeOptimisticData: removeOptimisticCharacter,
            editOptimisticData: editOptimisticCharacter
        }
    }
}

export default useDreamCharacters