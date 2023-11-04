"use client"

import {useMemo, useState} from "react";
import { SortOrder } from "../(internal)/dashboard/tags/components/GenericTagContainer";

const usePagination = <T>(
    data: T[],
    maxPerPage: number,
    options?: {
        sort?: (a: T, b: T) => number,
        filter?: (item: T) => boolean
    }
) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = useMemo(() => Math.ceil(data.length / maxPerPage), [data.length, maxPerPage])
    const paginatedData = useMemo(() => {
        let mutableData = [...data];
        
        if (options?.sort)
            mutableData = mutableData.sort(options.sort)
        
        if (options?.filter)
            mutableData = mutableData.filter(options.filter)
        
        return mutableData.slice((Math.abs(currentPage) - 1) * maxPerPage, Math.min((Math.abs(currentPage) * maxPerPage), data.length))
    }, [currentPage, data, maxPerPage, options?.filter, options?.sort])
    return {currentPage, setCurrentPage, totalPages, paginatedData}
}

export default usePagination