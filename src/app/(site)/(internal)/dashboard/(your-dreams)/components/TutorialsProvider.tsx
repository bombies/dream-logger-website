"use client"

import {createGenericContext, UseStateArray} from "@/utils/client/client-data-utils";
import {FC, PropsWithChildren, useEffect, useState} from "react";

const [TutorialsContext, useHook] = createGenericContext<UseStateArray<TutorialsState | undefined>>("useYourDreamsTutorialData must be used in a YourDreamsTutorialProvider!")

type TutorialsState = {
    yourDreams: boolean,
    dreamCalendar: boolean,
    dreamSearch: boolean,
    dreamReports: boolean,
}

const defaultTutorialsState: TutorialsState = {
    yourDreams: false,
    dreamCalendar: false,
    dreamSearch: false,
    dreamReports: false,
}

const TutorialsProvider: FC<PropsWithChildren> = ({children}) => {
    const [tutorialsState, setTutorialsState] = useState<TutorialsState>()

    useEffect(() => {
        if (!localStorage)
            return

        const tutorialsJsonString = localStorage.getItem("tutorials_state")
        let state: TutorialsState = {...defaultTutorialsState}
        if (!tutorialsJsonString)
            localStorage.setItem("tutorials_state", JSON.stringify(defaultTutorialsState))
        else state = JSON.parse(tutorialsJsonString)

        setTutorialsState(state)
    }, [])

    useEffect(() => {
        if (!localStorage || !tutorialsState)
            return

        localStorage.setItem("tutorials_state", JSON.stringify(tutorialsState))
    }, [tutorialsState]);

    return (
        <TutorialsContext.Provider value={[tutorialsState, setTutorialsState]}>
            {children}
        </TutorialsContext.Provider>
    )
}

export default TutorialsProvider
export const useTutorialsData = useHook