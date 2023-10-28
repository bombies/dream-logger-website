"use client"

import {FC, Fragment, useMemo} from "react";
import DreamContainer from "@/app/(site)/(internal)/dashboard/components/dreams/containers/DreamContainer";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import {Dream} from "@prisma/client";
import {useStartOfDay} from "@/app/(site)/hooks/time-hooks";
import PastDreamItem from "@/app/(site)/(internal)/dashboard/components/dreams/containers/PastDreamItem";
import DreamCardSkeleton from "@/app/(site)/(internal)/dashboard/components/dreams/card/DreamCardSkeleton";
import {Divider} from "@nextui-org/divider";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {useRouter} from "next/navigation";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";

type GroupedDreams = {
    [K: string]: Dream[]
}

export type PastDream = {
    timestamp: number,
    dreams: Dream[]
}

const NUMBER_OF_DAYS = 7

const PastDreamsContainer: FC = () => {
    const router = useRouter()
    const {dreams, tags, characters} = useDreamsData()
    const earliestDate = useStartOfDay({
        dayOffset: -NUMBER_OF_DAYS, // A week ago @ 12:00 AM
    })

    const pastDreams = useMemo<PastDream[]>(() => {
        const filteredDreams = dreams.data.filter(dream => new Date(dream.createdAt.toString()).getTime() >= earliestDate.getTime())
        const dayTimes = [earliestDate]
        for (let i = 1; i < NUMBER_OF_DAYS; i++) {
            const d = new Date(dayTimes[dayTimes.length - 1])
            d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
            dayTimes.push(d)
        }

        const groupedDreams = dayTimes.reduce<GroupedDreams>((previousValue, currentValue, i, arr) => {
            const endDate = new Date(arr[i])
            endDate.setHours(23, 59, 59, 999)

            const dreams = filteredDreams.filter(dream => {
                const dreamDate = new Date(dream.createdAt)
                return dreamDate >= currentValue && dreamDate <= endDate
            })

            return ({
                ...previousValue,
                [currentValue.getTime()]: dreams
            })
        }, {})

        const pastDreamsArr: PastDream[] = []
        for (let timestamp in groupedDreams) {
            const dreamsForDay = groupedDreams[timestamp]
            if (dreamsForDay.length === 0)
                continue
            pastDreamsArr.push({
                timestamp: Number(timestamp),
                dreams: dreamsForDay
            })
        }

        return pastDreamsArr.sort((a, b) => b.timestamp - a.timestamp)
    }, [dreams.data, earliestDate])


    const dreamItems = useMemo(() => pastDreams.map(dream => (
        <PastDreamItem
            key={dream.timestamp}
            dream={dream}
            allTags={tags.data}
            allCharacters={characters.data}
        />
    )), [characters.data, pastDreams, tags.data])


    return (
        <DreamContainer
            containerClassName="!py-12"
            title="Previous Dreams"
        >
            {dreams.loading ? (
                <Fragment>
                    <DreamCardSkeleton/>
                    <DreamCardSkeleton/>
                    <DreamCardSkeleton/>
                </Fragment>
            ) : (dreamItems.length ?
                <Fragment>
                    {dreamItems}
                    <Divider className="my-3" />
                    <Card
                        onPress={() => router.push("/dashboard/calendar")}
                        isPressable
                        isBlurred
                        classNames={{
                            base: "hover:scale-105",
                            body: "bg-secondary py-8"
                        }}
                    >
                        <CardBody>
                            <div className="flex gap-4">
                                <CloudIcon width={32} />
                                <p className="font-semibold text-lg phone:text-medium self-center">View All Dreams</p>
                            </div>
                        </CardBody>
                    </Card>
                </Fragment>
                :
                <h3 className="text-center font-light text-3xl tablet:text-xl text-subtext/30 py-6">You have no
                    dreams today...</h3>)
            }
        </DreamContainer>
    )
}

export default PastDreamsContainer