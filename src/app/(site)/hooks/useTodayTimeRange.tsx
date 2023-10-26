"use client"

import {useMemo} from "react";

const useTodayTimeRange = () => {
    const startOfToday = useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return today;
    }, [])
    const endOfToday = useMemo(() => {
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        return today;
    }, [])

    return [startOfToday, endOfToday]
}

export default useTodayTimeRange