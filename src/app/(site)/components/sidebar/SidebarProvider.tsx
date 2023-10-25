"use client"

import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState} from "react";

type SidebarContextType = {
    openState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const SidebarProvider: FC<PropsWithChildren> = ({children}) => {
    const openState = useState(false)

    return (
        <SidebarContext.Provider value={{openState}}>
            {children}
        </SidebarContext.Provider>
    )
}

export default SidebarProvider

export const useSidebar = () => {
    const sidebar = useContext(SidebarContext)
    if (!sidebar)
        throw new Error("useSidebar can only be used in a SidebarProvider!")
    return sidebar
}