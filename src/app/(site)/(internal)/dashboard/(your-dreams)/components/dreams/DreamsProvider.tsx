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
const [UserDreamsContext, useUserDreamsHook] = createDataContext<DreamsState>("useUserDreams must be used in a UserDreamsProvider!")
const [UserDreamTagsContext, useUserDreamTagsHook] = createDataContext<DreamTagsState>("useUserDreamTags must be used in a UserDreamTagsProvider!")
const [UserDreamCharactersContext, useUserDreamCharactersHook] = createDataContext<DreamCharactersState>("useUserDreamCharacters must be used in a UserDreamCharactersProvider!")

const DreamsProvider: FC<PropsWithChildren> = ({children}) => {
    const dreams = useDreams()
    const characters = useDreamCharacters()
    const tags = useDreamTags()

    return (
        <DreamsContext.Provider value={{dreams, characters, tags}}>
            <UserDreamsContext.Provider value={dreams}>
                <UserDreamTagsContext.Provider value={tags}>
                    <UserDreamCharactersContext.Provider value={characters}>
                        {children}
                    </UserDreamCharactersContext.Provider>
                </UserDreamTagsContext.Provider>
            </UserDreamsContext.Provider>
        </DreamsContext.Provider>
    )
}

export default DreamsProvider
export const useDreamsData = useHook
export const useUserDreams = useUserDreamsHook
export const useUserDreamTags = useUserDreamTagsHook
export const useUserDreamCharacters = useUserDreamCharactersHook
