import {Metadata} from "next";
import {FC, PropsWithChildren} from "react";
import SettingsSidebar from "@/app/(site)/(internal)/settings/components/SettingsSidebar";

export const metadata: Metadata = {
    title: 'Dream Logger - Settings',
    description: 'Your Dream Logger settings'
}

const SettingsLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="relative flex min-h-screen">
            <SettingsSidebar />
            <div
                className="flex-grow py-32 w-screen overflow-hidden phone:pt-32 flex flex-col phone:items-center phone-min:ml-16 tablet-min:ml-32">
                {children}
            </div>
        </main>
    )
}

export default SettingsLayout
