"use client"

import {useEffect, useMemo, useState} from "react";
import {defaultTutorialsState, TutorialsState} from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";

class LocalStorage {
    constructor(private readonly storage: Storage) {
    }

    get darkMode(): boolean {
        const existingState = this.storage.getItem("dark_mode")
        if (!existingState) {
            this.darkMode = true
            return true
        }

        return existingState === "true"
    }

    set darkMode(value: boolean) {
        this.storage.setItem("dark_mode", String(value))
    }

    get tutorialsState(): TutorialsState {
        let tutorialsJsonString = this.storage.getItem("tutorials_state")
        let state: TutorialsState = {...defaultTutorialsState}
        if (tutorialsJsonString)
            JSON.parse(tutorialsJsonString)
        return state
    }

    set tutorialsState(newState: Partial<TutorialsState>) {
        const prevState = this.tutorialsState
        this.storage.setItem("tutorials_state", JSON.stringify({...prevState, ...newState}))
    }
}


const useLocalStorage = () => {
    const [cachedLocalStorage, setLocalStorage] = useState<Storage>()
    const localStorageObject = useMemo<LocalStorage | undefined>(() =>
            cachedLocalStorage ? new LocalStorage(cachedLocalStorage) : undefined
        , [cachedLocalStorage])

    useEffect(() => {
        if (!localStorage)
            return;
        setLocalStorage(localStorage)
    }, [])

    return localStorageObject
}

export default useLocalStorage