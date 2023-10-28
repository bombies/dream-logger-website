"use client"

import {useMemo} from "react";

const useTodayTimeRange = () => {
    return useDayTimeRange()
}

type  DayTimeArgs = {
    date?: Date,
    dayOffset?: number
}

export const useStartOfDay = (options?: DayTimeArgs) => {
    return useMemo(() => {
        const d = options?.date ? new Date(options.date) : new Date()
        d.setHours(0, 0, 0, 0)

        if (options?.dayOffset)
            d.setTime(d.getTime() + (options.dayOffset * 24 * 60 * 60 * 1000))
        return d;
    }, [options?.date, options?.dayOffset])
}

export const useEndOfDay = (options?: DayTimeArgs) => {
    return useMemo(() => {
        const d = options?.date ? new Date(options.date) : new Date()
        d.setHours(23, 59, 59, 999)

        if (options?.dayOffset)
            d.setTime(d.getTime() + (options.dayOffset * 24 * 60 * 60 * 1000))
        return d;
    }, [options?.date, options?.dayOffset])
}

type DayTimeRangeArgs = Partial<{
    date: Date,
    startDayOffset: number
    endDayOffset: number
}>

export const useDayTimeRange = (options?: DayTimeRangeArgs): [Date, Date] => {
    const startOfDay = useStartOfDay({date: options?.date, dayOffset: options?.startDayOffset})
    const endOfDay = useEndOfDay({date: options?.date, dayOffset: options?.endDayOffset})
    return [startOfDay, endOfDay]
}

export default useTodayTimeRange