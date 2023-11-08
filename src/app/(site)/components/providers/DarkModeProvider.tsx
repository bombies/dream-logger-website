"use client"

import {createGenericContext, UseStateArray} from "@/utils/client/client-data-utils";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import useLocalStorage from "@/app/(site)/hooks/useLocalStorage";


const [DarkModeContext, hook] = createGenericContext<UseStateArray<boolean>>("useDarkMode must be used in a DarkModeProvider!")

const DarkModeProvider: FC<PropsWithChildren> = ({children}) => {
    const localStorage = useLocalStorage()
    const [darkMode, setDarkMode] = useState<boolean>(localStorage?.darkMode ?? true)

    useEffect(() => {
        if (!localStorage)
            return
        setDarkMode(localStorage.darkMode)
    }, [localStorage]);

    return (
        <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider

export const useDarkMode = hook