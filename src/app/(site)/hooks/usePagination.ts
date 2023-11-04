"use client"

import {useMemo, useState} from "react";

const usePagination = <T>(data: T[], maxPerPage: number) => {
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = useMemo(() => Math.ceil(data.length / maxPerPage), [data.length, maxPerPage])
    const paginatedData = useMemo(() => data.slice((Math.abs(currentPage) - 1) * maxPerPage, Math.min((Math.abs(currentPage) * maxPerPage), data.length)), [currentPage, data, maxPerPage])
    return {currentPage, setCurrentPage, totalPages, paginatedData}
}

export default usePagination