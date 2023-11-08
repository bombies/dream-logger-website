"use client"

import {createGenericContext} from "@/utils/client/client-data-utils";
import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import useLocalStorage from "@/app/(site)/hooks/useLocalStorage";


const [DarkModeContext, hook] = createGenericContext<[boolean, (newVal: boolean) => void]>("useDarkMode must be used in a DarkModeProvider!")

const DarkModeProvider: FC<PropsWithChildren> = ({children}) => {
    const localStorage = useLocalStorage()
    const [darkMode, setDarkMode] = useState<boolean>(localStorage?.darkMode ?? true)

    useEffect(() => {
        if (!localStorage)
            return
        setDarkMode(localStorage.darkMode)
    }, [localStorage]);

    const changeDarkMode = useCallback((newVal: boolean) => {
        setDarkMode(() => {
            if (localStorage)
                localStorage.darkMode = newVal
            return newVal
        })
    }, [localStorage])

    return (
        <DarkModeContext.Provider value={[darkMode, changeDarkMode]}>
            {children}
        </DarkModeContext.Provider>
    )
}

export default DarkModeProvider

export const useDarkMode = hook