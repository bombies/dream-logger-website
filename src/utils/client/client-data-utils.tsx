"use client"
import {KeyedMutator} from "swr";
import {Context, createContext, useContext} from "react";

export type DataContextState<T, O> = {
    loading: boolean,
    data: T,
    mutateData?: KeyedMutator<T>,
    optimisticData: {
        addOptimisticData: (work: () => Promise<O | undefined | null>, optimisticData: O) => Promise<void>,
        removeOptimisticData: (work: () => Promise<O | undefined | null>, removedData: O) => Promise<void>,
    }
}

export interface DataContextProps {
    [K: string]: DataContextState<any, any>
}

export function createDataContext<T extends DataContextProps>(hookErr?: string): [Context<T | undefined>, () => T] {
    const context = createContext<T | undefined>(undefined)
    const useHook = () => useGenericContextHook(context, hookErr)
    return [context, useHook]
}

export function useGenericContextHook<T>(context: Context<T | undefined>, hookErr?: string): T {
    const data = useContext(context)
    if (!data)
        throw new Error(hookErr ?? "This hook cannot be used here!")
    return data
}