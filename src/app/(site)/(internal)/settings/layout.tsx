import {Metadata} from "next";
import React, {FC, PropsWithChildren} from "react";
import SettingsSidebar from "@/app/(site)/(internal)/settings/components/SettingsSidebar";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'Dream Logger - Settings',
    description: 'Your Dream Logger settings'
}

const SettingsLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="min-h-screen">
            <div className="z-10 relative flex">
                <SettingsSidebar/>
                <div
                    className="flex-grow py-32 w-screen overflow-hidden phone:pt-32 flex flex-col phone:items-center phone-min:ml-16 tablet-min:ml-32">
                    {children}
                </div>
            </div>
            <Image
                priority
                src="/images/mesh-bg.png"
                alt=''
                className="!fixed !w-full !h-full top-0 left-0 opacity-10 z-[1] pointer-events-none"
                fill
                style={{
                    objectFit: "cover"
                }}
            />
        </main>
    )
}

export default SettingsLayout
