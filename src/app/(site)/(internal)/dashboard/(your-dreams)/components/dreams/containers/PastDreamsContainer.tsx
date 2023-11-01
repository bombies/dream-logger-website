"use client"

import {FC, Fragment, useMemo} from "react";
import DreamContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/DreamContainer";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import {Dream} from "@prisma/client";
import {useEndOfDay} from "@/app/(site)/hooks/time-hooks";
import PastDreamItem from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamItem";
import DreamCardSkeleton
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCardSkeleton";
import {Divider} from "@nextui-org/divider";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {useRouter} from "next/navigation";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import useDayDreams from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDayDreams";

export type GroupedDreams = {
    [K: string]: Dream[]
}

export type DayDreams = {
    timestamp: number,
    dreams: Dream[]
}

const NUMBER_OF_DAYS = 7

const PastDreamsContainer: FC = () => {
    const router = useRouter()
    const {dreams, tags, characters} = useDreamsData()
    const latestDate = useEndOfDay({
        dayOffset: -1
    })

    const pastDreams = useDayDreams({
        dreams: dreams.data,
        sortMode: "descending",
        dayCount: NUMBER_OF_DAYS,
        latestDate
    })


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
                    <Divider className="my-3"/>
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
                                <CloudIcon width={32}/>
                                <p className="font-semibold text-lg phone:text-medium self-center">View All Dreams</p>
                            </div>
                        </CardBody>
                    </Card>
                </Fragment>
                :
                <h3 className="text-center font-light text-3xl tablet:text-xl text-subtext/30 py-6">You have no previous
                    dreams for the past week...</h3>)
            }
        </DreamContainer>
    )
}

export default PastDreamsContainer