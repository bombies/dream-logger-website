import {FC, ReactElement} from "react";
import {SidebarItemProps} from "@/app/(site)/components/sidebar/SidebarItem";
import {useSidebar} from "@/app/(site)/components/sidebar/SidebarProvider";
import clsx from "clsx";

export type SidebarSectionProps = {
    children?: ReactElement<SidebarItemProps> | ReactElement<SidebarItemProps>[],
    title: string,
}

const SidebarSection: FC<SidebarSectionProps> = ({children, title}) => {
    const sidebarState = useSidebar()
    const [isOpen] = sidebarState.openState

    return (
        <section>
            <h3 className={clsx(!isOpen && "hidden", "font-semibold text-purple-400")}>{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </section>
    )
}

export default SidebarSection