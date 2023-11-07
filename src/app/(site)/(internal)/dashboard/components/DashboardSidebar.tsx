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
import SidebarSection from "@/app/(site)/components/sidebar/SidebarSection";

const DashboardSidebar: FC = () => {
    return (
        <SidebarProvider>
            <Sidebar headerText="Your Dashboard">
                <SidebarSection title="Main">
                    <SidebarItem
                        startContent={<CloudIcon width={20}/>}
                        title="Your Dreams"
                        href="/dashboard"
                    />
                    <SidebarItem
                        startContent={<CalendarIcon width={20}/>}
                        title="Dream Calendar"
                        href="/dashboard/calendar"
                    />
                    <SidebarItem
                        startContent={<TagIcon width={20}/>}
                        title="Tags & Characters"
                        href="/dashboard/tags"
                    />
                    <SidebarItem
                        startContent={<SearchFilledIcon width={20}/>}
                        title="Search Dreams"
                        href="/dashboard/search"
                    />
                </SidebarSection>
                {/*<SidebarItem*/}
                {/*    startContent={<StatisticsIcon/>}*/}
                {/*    title="Dream Reports"*/}
                {/*    href="/dashboard/reports"*/}
                {/*/>*/}
            </Sidebar>
        </SidebarProvider>
    )
}

export default DashboardSidebar