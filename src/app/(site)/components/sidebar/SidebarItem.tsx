import {FC, MouseEventHandler, ReactElement, useMemo} from "react";
import Link from "next/link";
import {useSidebar} from "@/app/(site)/components/sidebar/SidebarProvider";
import {Tooltip} from "@nextui-org/react";
import clsx from "clsx";
import { motion } from "framer-motion";

export type SidebarItemProps = {
    title: string,
    startContent?: ReactElement,
    href?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
}

const SidebarItem: FC<SidebarItemProps> = ({title, startContent, href, onClick}) => {
    const sidebarState = useSidebar();
    const [isOpen] = sidebarState.openState;

    const item = useMemo(() => (
        <motion.div
            initial={{
                backgroundColor: "#9E23FF00",
                color: "#EAE0FF"
            }}
            whileHover={{
                backgroundColor: "#9E23FF10",
                color: "#c77dff",
                filter: "drop-shadow(0px 2px 10px rgba(82, 0, 255, 0.65))"
            }}
            className="flex gap-4 cursor-pointer rounded-lg font-semibold p-3"
            onClick={onClick}
        >
            {startContent && startContent}
            <p className={clsx(!isOpen && "hidden", "capitalize")}>{title}</p>
        </motion.div>
    ), [isOpen, onClick, startContent, title])

    const toolTipItem = useMemo(() => (
        <Tooltip
            content={title}
            placement="right"
            closeDelay={10}
        >
            {item}
        </Tooltip>
    ), [item, title])

    return href ?
        (
            <Link href={href}>
                {isOpen ? item : toolTipItem}
            </Link>
        )
        :
        (isOpen ? item : toolTipItem)
}

export default SidebarItem