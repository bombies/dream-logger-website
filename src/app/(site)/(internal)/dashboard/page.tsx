"use client"

import {FC, Fragment} from "react";
import {Spacer} from "@nextui-org/react";

const DashboardHomePage: FC = () => {
    return (
        <Fragment>
            <h1 className="font-bold text-5xl phone:text-4xl">Your Dreams</h1>
            <Spacer y={12} />
            <div className="flex phone:flex-col phone:items-center justify-evenly">
            </div>
        </Fragment>
    )
}

export default DashboardHomePage