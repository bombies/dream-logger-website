"use client"

import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

export async function fetcher<T>(url: string): Promise<T | undefined> {
    try {
        return (await axios.get<T>(url)).data;
    } catch (e) {
        console.error(e)
    }
}

export async function fetcherWithArgs<A extends Record<string, string>, R>(url: string, args?: MutatorArgs<A>): Promise<R | undefined> {
    try {
        if (args) {
            const filteredBody = {...args.arg.body}
            Object.keys(filteredBody).forEach(key => {
                if (!filteredBody[key])
                    delete filteredBody[key]
            })
            return (await axios.get<R>(url + `?${new URLSearchParams(filteredBody).toString()}`)).data;
        } else
            return (await axios.get<R>(url)).data;
    } catch (e) {
        console.error(e)
    }
}


export type MutatorArgs<T> = {
    arg: {
        body: T
    }
}

export const postMutator = <B, R>() => (url: string, {arg}: MutatorArgs<B>) => axios.post<R>(url, arg.body)
export const patchMutator = <B, R>() => (url: string, {arg}: MutatorArgs<B>) => axios.patch<R>(url, arg.body)

export const deleteMutatorWithArgs = <B extends Record<string, string> | undefined, R>() => (url: string, args?: MutatorArgs<B>) => axios.delete<R>(`${url}${args ? "?" + new URLSearchParams(args.arg.body).toString() : ""}`)
export const deleteMutator = <R, >() => (url: string) => axios.delete<R>(url)


export function handleAxiosError(error: any): undefined {
    if (!(error instanceof AxiosError)) {
        console.error(error)
        toast.error("Something went wrong!")
        return undefined;
    }

    toast.error(error.response?.statusText ?? "Something went wrong!")
    return undefined
}

/**
 * Calculated the estimated reading time for a string
 * @param text The text to analyze
 * @return number The number of estimated minutes it would take to read
 * the text
 */
export function calcEstimatedReadingTime(text: string): number {
    const WORDS_PER_MINUTE = 200 // Based on research of the average case
    const numOfWords = text.split(" ").length
    return Math.ceil(numOfWords / WORDS_PER_MINUTE)
}