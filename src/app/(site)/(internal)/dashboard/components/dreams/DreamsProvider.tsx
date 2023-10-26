"use client"

import {createContext, FC, PropsWithChildren, useContext} from "react";
import useDreams, {DreamsState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreams";
import useDreamCharacters, {
    DreamCharactersState
} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreamCharacters";
import useDreamTags, {DreamTagsState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreamTags";

type DreamsContextProps = {
    dreams: DreamsState,
    characters: DreamCharactersState,
    tags: DreamTagsState,
}

const DreamsContext = createContext<DreamsContextProps | undefined>(undefined)

const DreamsProvider: FC<PropsWithChildren> = ({children}) => {
    const dreams = useDreams()
    const characters = useDreamCharacters()
    const tags = useDreamTags()

    return (
        <DreamsContext.Provider value={{dreams, characters, tags}}>
            {children}
        </DreamsContext.Provider>
    )
}

export default DreamsProvider

export const useDreamsData = () => {
    const dreams = useContext(DreamsContext)
    if (!dreams)
        throw new Error("useDreams can only be used in a DreamProvider!")
    return dreams;
}