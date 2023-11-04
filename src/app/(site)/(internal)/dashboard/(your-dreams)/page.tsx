"use client"

import {FC, Fragment} from "react";
import CurrentDreamsContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/CurrentDreamsContainer";
import PastDreamsContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamsContainer";
import {Step, Steps} from "intro.js-react";
import {useTutorialsData} from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";
import useComponentDidMount from "@/app/(site)/hooks/useComponentDidMount";

const steps: Step[] = [
    {
        element: "#dash_dreams_title",
        title: "Welcome to your dashboard!",
        intro: "In your dashboard you can log new dreams, view your recent dreams, view all your dreams with the dream calendar, search for specific dreams and even see dream insights. On this page specifically, you will be able to create new dreams and view your recent dreams.",
        position: "right",
    },
    {
        element: "#today_dreams",
        title: "Dreams for today",
        intro: "This container will allow you to log new dreams and see the dreams you've made for today. Click on the \"Log A New Dream\" button to log a new dream.",
        position: "left",
    },
    {
        element: "#past_dreams",
        title: "Past dreams",
        intro: "This container will display the most recent dreams you've had in past days. This container will only display up to 7 days worth of dream data. If you want a full view of your dreams there is a button at the bottom allowing you to view all dreams in your dream calendar.",
        position: "left",
    }
]

const DashboardHomePage: FC = () => {
    const [tutorialsState, setTutorialsState] = useTutorialsData()
    const mounted = useComponentDidMount()

    return (
        <Fragment>
            <Steps
                enabled={mounted && (tutorialsState && !tutorialsState.yourDreams)}
                initialStep={0}
                steps={steps}
                onExit={() => {
                    if (mounted)
                        setTutorialsState(prev => ({
                            ...prev!,
                            yourDreams: true
                        }))
                }}
            />
            <h1 id="dash_dreams_title" className="font-bold w-fit text-7xl phone:text-5xl mb-24 phone:mb-10">Your
                Dreams</h1>
            <div className="flex flex-wrap laptop:flex-col laptop:items-center gap-24 laptop-min:gap-12">
                <CurrentDreamsContainer/>
                <PastDreamsContainer/>
            </div>
        </Fragment>
    )
}

export default DashboardHomePage