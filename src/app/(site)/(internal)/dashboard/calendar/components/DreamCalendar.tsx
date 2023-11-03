"use client"

import {FC, useMemo, useState} from "react";
import Select from "@/app/(site)/components/inputs/Select";
import {
    createDaysForCurrentMonth,
    createDaysForNextMonth, createDaysForPreviousMonth,
    daysOfWeek, getMonthDropdownOptions, getYearDropdownOptions
} from "@/app/(site)/(internal)/dashboard/calendar/utils/calendar-utils";
import {Chip} from "@nextui-org/chip";
import {SelectItem} from "@nextui-org/react";
import DreamCalendarDay from "@/app/(site)/(internal)/dashboard/calendar/components/DreamCalendarDay";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import useDayDreams from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDayDreams";
import {Button} from "@nextui-org/button";
import DoubleBackIcon from "@/app/(site)/components/icons/DoubleBackIcon";
import DoubleForwardIcon from "@/app/(site)/components/icons/DoubleForwardIcon";

const DreamCalendar: FC = () => {
    const [[currentYear, currentMonth], setCurrentYearAndMonth] = useState<[number, number]>([new Date().getFullYear(), new Date().getMonth() + 1]);

    let currentMonthDays = createDaysForCurrentMonth(currentYear, currentMonth);
    let previousMonthDays = createDaysForPreviousMonth(
        currentYear,
        currentMonth,
        currentMonthDays
    );
    let nextMonthDays = createDaysForNextMonth(currentYear, currentMonth, currentMonthDays);
    let calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];


    const {dreams, tags, characters} = useDreamsData()
    const dayDreams = useDayDreams({dreams: dreams.data})
    const earliestYear = useMemo(() => dayDreams.length ? new Date(dayDreams[0].timestamp).getFullYear() : undefined, [dayDreams])

    const selectMonths = useMemo(() => getMonthDropdownOptions(), [])
    const selectYears = useMemo(() => getYearDropdownOptions(new Date().getUTCFullYear(), {
        startingYear: earliestYear
    }), [earliestYear])

    const displayPreviousMonth = () => {
        setCurrentYearAndMonth(([prevYear, prevMonth]) => {
            let nextYear = prevYear
            let nextMonth = prevMonth - 1

            if (nextMonth === 0) {
                nextMonth = 12
                nextYear = prevYear - 1
            }

            if (earliestYear && nextYear < earliestYear)
                return [prevYear, prevMonth]

            return [nextYear, nextMonth]
        })
    }

    const displayNextMonth = () => {
        setCurrentYearAndMonth(([prevYear, prevMonth]) => {
            let nextYear = prevYear
            let nextMonth = prevMonth + 1

            if (nextMonth === 13) {
                nextMonth = 1
                nextYear = prevYear + 1
            }

            if (nextYear > new Date().getFullYear())
                return [prevYear, prevMonth]

            return [nextYear, nextMonth]
        })
    }

    return (
        <div id="calendar-root" className="flex flex-col justify-center w-3/4 laptop:w-5/6 phone:w-[90%]">
            <div id="calendar-nav" className="flex justify-center mb-12 gap-4">
                <div className="flex w-3/4 phone:w-full gap-2">
                    <Button
                        disableRipple
                        isIconOnly
                        color="default"
                        variant="light"
                        className="self-center"
                        onPress={displayPreviousMonth}
                    >
                        <DoubleBackIcon width={16}/>
                    </Button>
                    <Select
                        classNames={{
                            trigger: "py-0",
                        }}
                        labelPlacement="outside"
                        label="Month"
                        id="month_selector"
                        items={selectMonths}
                        selectedKeys={[currentMonth.toString()]}
                        onSelectionChange={(keys) => {
                            const keyArr = Array.from(keys) as string[]
                            setCurrentYearAndMonth(prev => ([prev[0], Number(keyArr[0])]))
                        }}
                        renderValue={(items) => (
                            <div className="flex gap-2">
                                {items.map(item => (
                                    <Chip
                                        key={item.key}
                                        color="primary"
                                        variant="flat"
                                        className="max-w-[10rem]"
                                        classNames={{
                                            content: "overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold"
                                        }}
                                    >
                                        {item.data?.label}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    >
                        {(item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                textValue={item.label}
                            >
                                {item.label}
                            </SelectItem>
                        )}
                    </Select>
                    <Select
                        classNames={{
                            trigger: "py-0"
                        }}
                        labelPlacement="outside"
                        label="Year"
                        aria-label="Calendar Year"
                        id="year_selector"
                        selectedKeys={[currentYear.toString()]}
                        onSelectionChange={(keys) => {
                            const keyArr = Array.from(keys) as string[]
                            setCurrentYearAndMonth(prev => ([Number(keyArr[0]), prev[1]]))
                        }}
                        items={selectYears}
                        renderValue={(items) => (
                            <div className="flex gap-2">
                                {items.map(item => (
                                    <Chip
                                        key={item.key}
                                        color="primary"
                                        variant="flat"
                                        className="max-w-[10rem]"
                                        classNames={{
                                            content: "overflow-ellipsis whitespace-nowrap overflow-hidden font-semibold"
                                        }}
                                    >
                                        {item.data?.label}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    >
                        {(item) => (
                            <SelectItem
                                key={item.value}
                                value={item.value}
                                textValue={item.label}
                            >
                                <p>{item.label}</p>
                            </SelectItem>
                        )}
                    </Select>
                    <Button
                        disableRipple
                        isIconOnly
                        color="default"
                        variant="light"
                        className="self-center"
                        onPress={displayNextMonth}
                    >
                        <DoubleForwardIcon width={16}/>
                    </Button>
                </div>
            </div>
            <div id="days_of_week" className="grid grid-cols-7 mb-4 tablet:hidden">
                {daysOfWeek.map((day, i) => (
                    <p
                        className="text-center font-semibold"
                        key={i}
                    >
                        {day}
                    </p>
                ))}
            </div>
            <div id="days_of_week"
                 className="grid grid-cols-7 rounded-t-2xl  bg-primary p-2 font-semibold text-xl phone:text-medium tablet:border-x-1 tablet:border-primary tablet-min:hidden">
                {daysOfWeek.map((day, i) => (
                    <p
                        key={i}
                        className="text-center font-semibold"
                    >
                        {day.charAt(0)}
                    </p>

                ))}
            </div>
            <div id="days-grid"
                 className="grid rounded-2xl tablet:rounded-t-none overflow-hidden grid-cols-7 border border-primary">
                {
                    calendarGridDayObjects.map(day => {
                        const dateStrSplit = day.dateString.split("-")
                        const date = new Date(Number(dateStrSplit[0]), Number(dateStrSplit[1]) - 1, Number(dateStrSplit[2]))
                        date.setHours(0, 0, 0, 0)

                        const dayIsToday = () => {
                            const today = new Date()
                            return date.getFullYear() === today.getFullYear() &&
                                date.getMonth() === today.getMonth() &&
                                date.getDate() === today.getDate()
                        }

                        const dreamsForDay = dayDreams.find(dayDream => {
                            const endOfDay = new Date(dayDream.timestamp)
                            endOfDay.setHours(23, 59, 59, 999)
                            return date.getTime() >= dayDream.timestamp && date.getTime() <= endOfDay.getTime()
                        })

                        return (
                            <DreamCalendarDay
                                key={day.dateString}
                                day={day}
                                allTags={tags.data}
                                allCharacters={characters.data}
                                optimisticRemove={dreams.optimisticData.removeOptimisticData}
                                isToday={dayIsToday()}
                                dreams={dreamsForDay}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DreamCalendar