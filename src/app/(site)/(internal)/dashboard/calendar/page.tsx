"use client"

import {FC, Fragment} from "react";
import DreamCalendar from "@/app/(site)/(internal)/dashboard/calendar/components/DreamCalendar";
import {useTutorialsData} from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";
import useComponentDidMount from "@/app/(site)/hooks/useComponentDidMount";
import {Step, Steps} from "intro.js-react";

const steps: Step[] = [
    {
        element: "#dash_calendar_title",
        title: "Welcome to your Dream Calendar",
        intro: "Here, you can see all the dreams you ever made on your personal calendar. You can add new dreams for today and edit past dreams here as well.",
    },
    {
        element: "#calendar-root",
        title: "This is your calendar.",
        intro: "This is where all the actions take place."
    },
    {
        element: "#calendar-nav",
        title: "Calendar Controls",
        intro: "These tools will allow you to control your calendar. You can choose the specific month and year and easily progress and regress your months. The years shown will only include the range of years you have dream data for."
    },
    {
        element: "#days-grid",
        title: "The Calendar",
        intro: "This is where all the magic happens. Once you start adding dreams, you will be able to see which days you've logged dreams for. You can click on those days to view those dreams and edit them."
    },
    {
        element: "#dream_calendar_day_today",
        title: "Today",
        intro: "This cell is the current day. You can click on this cell to view the current dreams for today and even log new dreams for today."
    },
    {
        element: "#calendar-root",
        title: "Lets Go!",
        intro: "That's it for the dream calendar. Go ahead and make it your own!"
    },
]

const CalendarPage: FC = () => {
    const [tutorialsState, setTutorialsState] = useTutorialsData()
    const mounted = useComponentDidMount()

    return (
        <Fragment>
            <Steps
                enabled={mounted && (tutorialsState && !tutorialsState.dreamCalendar)}
                initialStep={0}
                steps={steps}
                onExit={() => {
                    if (mounted)
                        setTutorialsState(prev => ({
                            ...prev!,
                            dreamCalendar: true,
                        }))
                }}
            />
            <h1 id="dash_calendar_title"
                className="font-bold text-7xl phone:text-4xl mb-24 phone:mb-16 w-fit">Dream Calendar</h1>
            <DreamCalendar/>
        </Fragment>
    )
}

export default CalendarPage