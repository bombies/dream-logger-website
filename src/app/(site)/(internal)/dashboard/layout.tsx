import {FC, PropsWithChildren} from "react";
import DashboardSidebar from "@/app/(site)/(internal)/dashboard/components/DashboardSidebar";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Dream Logger - Dashboard',
    description: 'Your Dream Logger dashboard'
}

const DashboardLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="relative flex w-full min-h-screen">
            <DashboardSidebar />
            <div className="flex-grow pt-32 phone:pt-32 flex flex-col phone:items-center phone-min:ml-16 tablet-min:ml-32">
                {children}
            </div>
        </main>
    )
}

export default DashboardLayout