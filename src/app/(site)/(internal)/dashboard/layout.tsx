import React, {FC, PropsWithChildren} from "react";
import DashboardSidebar from "@/app/(site)/(internal)/dashboard/components/DashboardSidebar";
import {Metadata} from "next";
import DreamsProvider from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Dream Logger - Dashboard',
    description: 'Your Dream Logger dashboard',
}

const DashboardLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="relative ">
            <div className="z-10 relative flex min-h-screen">
                <DashboardSidebar/>
                <div
                    className="flex-grow py-32 w-screen overflow-hidden phone:pt-32 flex flex-col phone:items-center phone-min:ml-16 tablet-min:ml-32">
                    <DreamsProvider>
                        {children}
                    </DreamsProvider>
                </div>
            </div>
            <Image
                priority
                src="/images/mesh-bg.png"
                alt=''
                className="!fixed w-full h-full top-0 left-0 opacity-10 z-[1] pointer-events-none"
                fill
                style={{
                    objectFit: "cover"
                }}
            />
        </main>
    )
}

export default DashboardLayout