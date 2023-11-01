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
import {Dream, DreamCharacter, DreamTag} from "@prisma/client";
import {OptimisticWorker} from "@/utils/client/client-data-utils";

type Props = {
    dreams?: DayDreams
    day: CalendarMonthDay,
    allCharacters: DreamCharacter[],
    allTags: DreamTag[],
    optimisticRemove?: OptimisticWorker<Dream>,
    isToday: boolean,
}

const DreamCalendarDay: FC<Props> = ({dreams, day, allTags, allCharacters, optimisticRemove, isToday}) => {
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
                    {dreams?.dreams.map(dream => (
                        <DreamCard
                            key={dream.id}
                            dream={dream}
                            allCharacters={allCharacters}
                            allTags={allTags}
                            optimisticRemove={optimisticRemove}
                        />
                    ))}
                </DreamContainer>
            </Modal>
            <div
                className={clsx(
                    "min-h-[8rem] tablet:h-20 bg-[#9E23FF1A] border-primary ease-in-out duration-300 tablet:border-0 tablet:border-b-1",
                    dreams && "cursor-pointer hover:bg-primary/30"
                )}
                onClick={() => {
                    if (dreams)
                        setModalOpen(true)
                }}
            >
                {day.isCurrentMonth && (
                    <div className="h-full border-x border-b border-primary tablet:border-0">
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
                            dreams && (
                                <Fragment>
                                    <div className="px-2 py-6 space-y-2 tablet:hidden">
                                        {
                                            dreams.dreams.slice(0, Math.min(dreams.dreams.length, 2))
                                                .map(dream => (
                                                    <div
                                                        key={dream.id}
                                                        className="bg-primary/20 border border-primary/40 p-2 rounded-3xl whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                    >
                                                        <p className="text-xs overflow-hidden overflow-ellipsis">
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
                        }
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default DreamCalendarDay