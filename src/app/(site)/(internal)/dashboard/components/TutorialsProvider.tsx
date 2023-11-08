"use client"

import {createGenericContext, UseStateArray} from "@/utils/client/client-data-utils";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import useLocalStorage from "@/app/(site)/hooks/useLocalStorage";

const [TutorialsContext, useHook] = createGenericContext<UseStateArray<TutorialsState | undefined>>("useYourDreamsTutorialData must be used in a YourDreamsTutorialProvider!")

export type TutorialsState = {
    yourDreams: boolean,
    dreamCalendar: boolean,
    dreamSearch: boolean,
    dreamReports: boolean,
}

export const defaultTutorialsState: TutorialsState = {
    yourDreams: false,
    dreamCalendar: false,
    dreamSearch: false,
    dreamReports: false,
}

const TutorialsProvider: FC<PropsWithChildren> = ({children}) => {
    const localStorage = useLocalStorage()
    const [tutorialsState, setTutorialsState] = useState<TutorialsState | undefined>(localStorage?.tutorialsState)

    useEffect(() => {
        if (!localStorage)
            return;
        setTutorialsState(localStorage.tutorialsState)
    }, [localStorage]);

    useEffect(() => {
        if (!localStorage || !tutorialsState)
            return
        
        localStorage.tutorialsState = tutorialsState
    }, [localStorage, tutorialsState]);

    return (
        <TutorialsContext.Provider value={[tutorialsState, setTutorialsState]}>
            {children}
        </TutorialsContext.Provider>
    )
}

export default TutorialsProvider
export const useTutorialsData = useHook