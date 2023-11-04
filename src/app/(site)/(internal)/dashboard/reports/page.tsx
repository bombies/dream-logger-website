import {FC, Fragment} from "react";
import DreamReportsContext from "@/app/(site)/(internal)/dashboard/reports/components/DreamReportsContext";
import {notFound} from "next/navigation";

const DreamReportsPage: FC = () => {
    if (process.env.NODE_ENV !== "development")
        notFound()

    return (
        <Fragment>
            <h1 id="dash_reports_title"
                className="font-bold text-7xl phone:text-4xl mb-24 phone:mb-16 w-fit">Dream Reports</h1>
            <DreamReportsContext/>
        </Fragment>
    )
}

export default DreamReportsPage