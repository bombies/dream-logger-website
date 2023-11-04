"use client"

import {FC, Fragment, useState} from "react";
import clsx from "clsx";
import {Chip} from "@nextui-org/chip";
import {
    DayDreams
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamsContainer";
import {CalendarMonthDay} from "@/app/(site)/(internal)/dashboard/calendar/utils/calendar-utils";
import Modal from "@/app/(site)/components/Modal";
import DreamContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/DreamContainer";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import {Dream} from "@prisma/client";
import {OptimisticWorker} from "@/utils/client/client-data-utils";
import LogDreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/LogDreamCard";
import PlusIcon from "@/app/(site)/components/icons/PlusIcon";

type Props = {
    dreams?: DayDreams
    day: CalendarMonthDay,
    optimisticRemove?: OptimisticWorker<Dream>,
    isToday: boolean,
}

const DreamCalendarDay: FC<Props> = ({dreams, day, optimisticRemove, isToday}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const dateStrSplit = day.dateString.split("-")

    return (
        <Fragment>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                size="2xl"
            >
                <DreamContainer
                    title={`Dreams For ${new Date(Number(dateStrSplit[0]), Number(dateStrSplit[1]) - 1, Number(dateStrSplit[2])).toLocaleDateString("en-US", {
                        dateStyle: "long"
                    })}`}
                >
                    <Fragment>
                        {isToday && <LogDreamCard/>}
                        {dreams?.dreams.map(dream => (
                            <DreamCard
                                key={dream.id}
                                dream={dream}
                                optimisticRemove={optimisticRemove}
                            />
                        ))}
                    </Fragment>
                </DreamContainer>
            </Modal>
            <div
                className={clsx(
                    "min-h-[8rem] tablet:min-h-[5rem] bg-[#9E23FF1A] border-primary ease-in-out duration-300 tablet:border-0 tablet:border-b-1",
                    ((dreams || isToday) && day.isCurrentMonth) && "cursor-pointer hover:bg-primary/30"
                )}
                onClick={() => {
                    if ((dreams || isToday) && day.isCurrentMonth)
                        setModalOpen(true)
                }}
            >
                {day.isCurrentMonth && (
                    <div className="flex flex-col h-full border-x border-b border-primary tablet:border-0">
                        <div
                            className="bg-primary tablet:bg-primary/0 p-2 font-semibold text-xl phone:text-medium tablet:justify-center flex gap-2">
                            <p className={clsx(isToday && "tablet:text-primary")}>{day.dayOfMonth}</p>
                            {isToday && (
                                <Chip
                                    variant="flat"
                                    color="secondary"
                                    size="sm"
                                    className="self-center tablet:hidden"
                                >
                                    <p className="font-semibold text-white">
                                        TODAY
                                    </p>
                                </Chip>
                            )}
                        </div>
                        {
                            dreams ? (
                                    <Fragment>
                                        <div className="px-2 py-6 space-y-2 tablet:hidden">
                                            {
                                                dreams.dreams.slice(0, Math.min(dreams.dreams.length, 2))
                                                    .map(dream => (
                                                        <div
                                                            key={dream.id}
                                                            className="bg-primary/10 border border-primary/60 py-2 px-4 rounded-3xl whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                        >
                                                            <p className="text-xs font-semibold overflow-hidden overflow-ellipsis">
                                                                {dream.title}
                                                            </p>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                        <div className="flex justify-center tablet-min:hidden">
                                            <span className="w-3 h-3 bg-primary/30 rounded-full"></span>
                                        </div>
                                    </Fragment>

                                )
                                :
                                (isToday && (
                                    <div
                                        className="flex-grow flex gap-2 flex-col justify-center tablet:justify-start items-center text-primary">
                                        <div className="rounded-full bg-primary/30">
                                            <PlusIcon width={16}/>
                                        </div>
                                        <p className="text-xs font-semibold text-primary/60 tablet:hidden">Log Dream</p>
                                    </div>
                                ))
                        }
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default DreamCalendarDay