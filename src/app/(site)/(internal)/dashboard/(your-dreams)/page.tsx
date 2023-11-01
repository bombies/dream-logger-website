"use client"

import {FC, Fragment} from "react";
import CurrentDreamsContainer from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/CurrentDreamsContainer";
import PastDreamsContainer from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamsContainer";

const DashboardHomePage: FC = () => {
    return (
        <Fragment>
            <h1 className="font-bold text-7xl phone:text-5xl mb-24 phone:mb-10">Your Dreams</h1>
            <div className="flex flex-wrap laptop:flex-col laptop:items-center gap-24 laptop-min:gap-12">
                <CurrentDreamsContainer/>
                <PastDreamsContainer/>
            </div>
        </Fragment>
    )
}

export default DashboardHomePage