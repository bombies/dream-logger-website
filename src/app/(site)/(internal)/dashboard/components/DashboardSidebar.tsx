"use client"

import {FC} from "react";
import Sidebar from "@/app/(site)/components/sidebar/Sidebar";
import SidebarItem from "@/app/(site)/components/sidebar/SidebarItem";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import SidebarProvider from "@/app/(site)/components/sidebar/SidebarProvider";
import CalendarIcon from "@/app/(site)/components/icons/CalendarIcon";
import SearchFilledIcon from "@/app/(site)/components/icons/SearchFilledIcon";
import StatisticsIcon from "@/app/(site)/components/icons/StatisticsIcon";
import TagIcon from "@/app/(site)/components/icons/TagIcon";

const DashboardSidebar: FC = () => {
    return (
        <SidebarProvider>
            <Sidebar headerText="Your Dashboard">
                <SidebarItem
                    startContent={<CloudIcon/>}
                    title="Your Dreams"
                    href="/dashboard"
                />
                <SidebarItem
                    startContent={<CalendarIcon/>}
                    title="Dream Calendar"
                    href="/dashboard/calendar"
                />
                <SidebarItem
                    startContent={<TagIcon/>}
                    title="Tags & Characters"
                    href="/dashboard/tags"
                />
                <SidebarItem
                    startContent={<SearchFilledIcon/>}
                    title="Search Dreams"
                    href="/dashboard"
                />
                <SidebarItem
                    startContent={<StatisticsIcon/>}
                    title="Dream Reports"
                    href="/dashboard"
                />
            </Sidebar>
        </SidebarProvider>
    )
}

export default DashboardSidebar