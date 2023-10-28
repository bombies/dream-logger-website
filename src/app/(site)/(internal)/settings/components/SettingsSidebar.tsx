"use client"

import {FC} from "react";
import SidebarProvider from "@/app/(site)/components/sidebar/SidebarProvider";
import Sidebar from "@/app/(site)/components/sidebar/Sidebar";
import SidebarItem from "@/app/(site)/components/sidebar/SidebarItem";
import {AvatarIcon} from "@nextui-org/shared-icons";

const SettingsSidebar: FC = () => {
    return (
        <SidebarProvider>
            <Sidebar headerText="Your Settings">
                <SidebarItem
                    title="Account"
                    startContent={<AvatarIcon className="self-center" />}
                    href={"/settings/account"}
                />
            </Sidebar>
        </SidebarProvider>
    )
}

export default SettingsSidebar