"use client"

import {FC} from "react";
import Sidebar from "@/app/(site)/components/sidebar/Sidebar";
import SidebarItem from "@/app/(site)/components/sidebar/SidebarItem";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import SidebarProvider from "@/app/(site)/components/sidebar/SidebarProvider";
import CalendarIcon from "@/app/(site)/components/icons/CalendarIcon";
import SearchFilledIcon from "@/app/(site)/components/icons/SearchFilledIcon";
import StatisticsIcon from "@/app/(site)/components/icons/StatisticsIcon";

const DashboardSidebar: FC = () => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarItem
                    startContent={<CloudIcon />}
                    title="Your Dreams"
                    href="/dashboard"
                />
                <SidebarItem
                    startContent={<CalendarIcon />}
                    title="Dream Calendar"
                    href="/dashboard"
                />
                <SidebarItem
                    startContent={<SearchFilledIcon />}
                    title="Search Dreams"
                    href="/dashboard"
                />
                <SidebarItem
                    startContent={<StatisticsIcon />}
                    title="Dream Reports"
                    href="/dashboard"
                />
            </Sidebar>
        </SidebarProvider>
    )
}

export default DashboardSidebar