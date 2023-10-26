"use client"

import {useMemo} from "react";

const useTodayTimeRange = () => {
    return useTimeRange(new Date())
}

export const useTimeRange = (date: Date): [Date, Date] => {
    const startOfDay = useMemo(() => {
        const today = new Date(date)
        today.setHours(0, 0, 0, 0)
        return today;
    }, [date])
    const endOfDay = useMemo(() => {
        const today = new Date(date)
        today.setHours(23, 59, 59, 999)
        return today;
    }, [date])

    return [startOfDay, endOfDay]
}

export default useTodayTimeRange