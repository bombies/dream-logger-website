import {FC, Fragment} from "react";
import Calendar from "@/app/(site)/(internal)/dashboard/calendar/components/Calendar";

const CalendarPage: FC = () => {
    return (
        <Fragment>
            <h1 className="font-bold text-7xl phone:text-5xl mb-24 phone:mb-10">Dream Calendar</h1>
            <Calendar/>
        </Fragment>
    )
}

export default CalendarPage