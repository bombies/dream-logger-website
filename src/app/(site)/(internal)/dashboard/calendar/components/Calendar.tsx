"use client"

import {FC, useState} from "react";
import Select from "@/app/(site)/components/inputs/Select";
import {
    createDaysForCurrentMonth,
    createDaysForNextMonth, createDaysForPreviousMonth,
    daysOfWeek
} from "@/app/(site)/(internal)/dashboard/calendar/utils/calendar-utils";

const Calendar: FC = () => {
    const [[year, month], setCurrentYearAndMonth] = useState<[number, number]>([new Date().getFullYear(), new Date().getMonth() + 1]);

    let currentMonthDays = createDaysForCurrentMonth(year, month);
    let previousMonthDays = createDaysForPreviousMonth(
        year,
        month,
        currentMonthDays
    );
    let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
    let calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays
    ];

    return (
        <div id="calendar-root" className="flex flex-col justify-center w-3/4 phone:w-5/6">
            <div id="calendar-nav" className="flex justify-center mb-12 gap-4">
                <div className="flex w-1/2 gap-2">
                    <Select
                        label="Month"
                        id="month_selector"
                        items={[]}
                    >
                        {(item) => <></>}
                    </Select>
                    <Select
                        label="Year"
                        id="year_selector"
                        items={[]}
                    >
                        {(item) => <></>}
                    </Select>
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
                 className="grid grid-cols-7 bg-primary p-2 font-semibold text-xl phone:text-medium tablet:border-x-1 tablet:border-primary tablet-min:hidden">
                {daysOfWeek.map((day, i) => (
                    <p
                        key={i}
                        className="text-center font-semibold"
                    >
                        {day.charAt(0)}
                    </p>

                ))}
            </div>
            <div id="days-grid" className="grid grid-cols-7 tablet:border-x-1 tablet:border-primary">
                {
                    calendarGridDayObjects.map(day => (
                        <div
                            key={day.dateString}
                            className="h-fit border border-primary tablet:border-0 tablet:border-b-1"
                        >
                            <div
                                className="bg-primary tablet:bg-[#9E23FF1A] p-2 font-semibold text-xl phone:text-medium">
                                {day.dayOfMonth}
                            </div>
                            <div className="p-2 bg-[#9E23FF1A]">
                                hi
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Calendar