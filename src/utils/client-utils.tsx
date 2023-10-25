"use client"

import axios from "axios";

export async function fetcher<T>(url: string): Promise<T | undefined> {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        console.error(e)
    }
}