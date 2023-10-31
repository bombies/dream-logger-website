"use client"

import {fetcher} from "@/utils/client/client-utils";
import useSWR from "swr";

const useCloudFrontUrl = (key?: string | null) => {
    return useSWR(key && `/api/s3?key=${key}`, fetcher<{ url: string } | null>, {
        refreshInterval: 0,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })
}

export default useCloudFrontUrl