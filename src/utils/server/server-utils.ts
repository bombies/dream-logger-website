"use server"

import axios from "axios"
import crypto from "crypto"

export async function verifyCaptcha(token: string | null) {
    const res = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`
    )
    if (res.data.success) {
        return "success!"
    } else {
        throw new Error("Failed Captcha")
    }
}

const useServerFetch = (url: string) => {

}

const GlobalServerCache = new Map<string, any>()

export const useServerCache = <T extends object>(data?: T | null, key: string = crypto.randomBytes(8).toString('hex')): {
    key?: string,
    data?: T,
    mutator?: ServerCacheMutator<T>
} => {
    if (!data)
        return {}

    const dataCopy = {...data}
    GlobalServerCache.set(key, dataCopy)

    const mutator = new ServerCacheMutator<T>(key)
    return {key, data, mutator}
}

class ServerCacheMutator<T> {

    constructor(private readonly key: string) {
    }

    public async mutate({work, optimisticData}: {
        work?: () => Promise<T>,
        optimisticData: (prevData: T) => T
    }) {
        const originalCache = this.getCurrentCache()
        if (work) {
            this.setCache(optimisticData(originalCache))
            await work()
                .then((res) => this.setCache(res))
                .catch(err => {
                    this.setCache(originalCache)
                    throw err
                })
        } else {
            this.setCache(optimisticData(originalCache))
        }
    }

    private getCurrentCache() {
        return GlobalServerCache.get(this.key)
    }

    private setCache(data: T) {
        GlobalServerCache.set(this.key, data)
    }
}