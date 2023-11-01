import {FC, Fragment} from "react";
import DreamCalendar from "@/app/(site)/(internal)/dashboard/calendar/components/DreamCalendar";

const CalendarPage: FC = () => {
    return (
        <Fragment>
            <h1 className="font-bold text-7xl phone:text-4xl mb-24 phone:mb-16">Dream Calendar</h1>
            <DreamCalendar/>
        </Fragment>
    )
}

export default CalendarPage