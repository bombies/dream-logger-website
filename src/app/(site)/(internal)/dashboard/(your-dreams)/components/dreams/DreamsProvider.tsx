"use client"

import {FC, PropsWithChildren} from "react";
import useDreams, {
    DreamsState
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreams";
import useDreamCharacters, {
    DreamCharactersState
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreamCharacters";
import useDreamTags, {
    DreamTagsState
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreamTags";
import {createDataContext, DataContextProps} from "@/utils/client/client-data-utils";

interface DreamsContextProps extends DataContextProps {
    dreams: DreamsState,
    characters: DreamCharactersState,
    tags: DreamTagsState,
}

const [DreamsContext, useHook] = createDataContext<DreamsContextProps>("useDreamsData must be used in a DreamsProvider!")

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
export const useDreamsData = useHook
