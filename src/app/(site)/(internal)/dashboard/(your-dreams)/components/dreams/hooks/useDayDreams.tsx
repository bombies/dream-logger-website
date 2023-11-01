import {Dream} from "@prisma/client";
import {
    DayDreams, GroupedDreams
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamsContainer";
import {useEffect, useMemo} from "react";

type Args = {
    dreams: Dream[],
    latestDate?: Date,
    dayCount?: number,
    sortMode?: "ascending" | "descending"
}

const useDayDreams = ({dreams, latestDate, dayCount, sortMode}: Args): DayDreams[] => {
    const filteredDreams = useMemo<Dream[]>(() => dreams.filter(dream => latestDate ? new Date(dream.createdAt.toString()).getTime() <= latestDate.getTime() : true), [dreams, latestDate])
    const sortedDreams = useMemo<Dream[]>(() => filteredDreams.sort((a, b) => {
        const aDate = new Date(a.createdAt.toString())
        const bDate = new Date(b.createdAt.toString())
        return sortMode === "descending" ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime()
    }), [filteredDreams, sortMode])

    const dreamCreationDates = useMemo(() => (
        sortedDreams.map(dream => {
            const creationDate = new Date(dream.createdAt.toString())
            creationDate.setHours(0, 0, 0, 0)
            return creationDate.getTime()
        })
            // Remove duplicates
            .filter((creationTime, i, arr) => arr.indexOf(creationTime) === i)
    ), [sortedDreams])

    const groupedDreams = useMemo<GroupedDreams>(() => (
        dreamCreationDates.reduce<GroupedDreams>((prev, curr, i, arr) => {
            const endDate = new Date(arr[i])
            endDate.setHours(23, 59, 59, 999)

            const dreams = sortedDreams.filter(dream => {
                const dreamDate = new Date(dream.createdAt)
                return dreamDate.getTime() >= curr && dreamDate <= endDate
            })

            return ({
                ...prev,
                [curr]: dreams
            })
        }, {})
    ), [dreamCreationDates, sortedDreams])


    const pastDreamsArr = useMemo<DayDreams[]>(() => Object.keys(groupedDreams)
        .filter(timestamp => groupedDreams[timestamp].length)
        .map(timestamp => {
            const dreamsForDay = groupedDreams[timestamp]
            return ({
                timestamp: Number(timestamp),
                dreams: dreamsForDay
            })
        }), [groupedDreams])

    return dayCount && dayCount > 0 && pastDreamsArr.length ? pastDreamsArr.slice(0, Math.min(pastDreamsArr.length, dayCount)) : pastDreamsArr
}

export default useDayDreams