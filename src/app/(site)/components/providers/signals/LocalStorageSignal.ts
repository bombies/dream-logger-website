"use client"

import {signal} from "@preact/signals-react";
import {LocalStorage} from "@/app/(site)/hooks/useLocalStorage";

export const LocalStorageSignal = () => {
    const localStorageObj = signal(new LocalStorage(localStorage))

    const updateDarkMode = (newVal: boolean) => {
        localStorageObj.value.darkMode = newVal
    }

    return {localStorageObj, updateDarkMode}
}