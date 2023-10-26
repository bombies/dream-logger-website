"use client"

import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";

export async function fetcher<T>(url: string): Promise<T | undefined> {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        console.error(e)
    }
}

export function handleAxiosError(error: any): undefined {
    if (!(error instanceof AxiosError)) {
        console.error(error)
        toast.error("Something went wrong!")
        return undefined;
    }

    toast.error(error.response?.statusText ?? "Something went wrong!")
    return undefined
}