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
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import useDayDreams from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDayDreams";
import {useTutorialsData} from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";
import Link from "next/link";

export type GroupedDreams = {
    [K: string]: Dream[]
}

export type DayDreams = {
    timestamp: number,
    dreams: Dream[]
}

const NUMBER_OF_DAYS = 7

const PastDreamsContainer: FC = () => {
    const [tutorialsState] = useTutorialsData()
    const {dreams} = useDreamsData()
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
            isDisabled={!tutorialsState?.yourDreams}
            key={dream.timestamp}
            dream={dream}
        />
    )), [pastDreams, tutorialsState?.yourDreams])


    return (
        <DreamContainer
            id="past_dreams"
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
                    <Link href="/dashboard/calendar" className="!w-full">
                        <Card
                            isPressable
                            isBlurred
                            classNames={{
                                base: "hover:scale-105 dark:bg-dark bg-primary text-light rounded-3xl w-full",
                                body: "py-8"
                            }}
                        >
                            <CardBody>
                                <div className="flex gap-4">
                                    <CloudIcon width={32}/>
                                    <p className="font-semibold text-lg phone:text-medium self-center">View All Dreams</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                </Fragment>
                :
                <h3 className="text-center font-light text-3xl tablet:text-xl text-subtext/30 py-6">You have no previous
                    dreams for the past week...</h3>)
            }
        </DreamContainer>
    )
}

export default PastDreamsContainer