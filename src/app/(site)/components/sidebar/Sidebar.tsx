"use client"

import {FC, ReactElement} from "react";
import {Button} from "@nextui-org/button";
import CollapseIcon from "@/app/(site)/components/icons/CollapseIcon";
import {motion} from "framer-motion";
import ExpandIcon from "@/app/(site)/components/icons/ExpandIcon";
import clsx from "clsx";
import UserProfile from "@/app/(site)/components/UserProfile";
import Image from "@/app/(site)/components/Image";
import Link from "next/link";
import {Divider} from "@nextui-org/divider";
import {useSidebar} from "@/app/(site)/components/sidebar/SidebarProvider";
import {SidebarItemProps} from "@/app/(site)/components/sidebar/SidebarItem";

type Props = {
    children?: ReactElement<SidebarItemProps> | ReactElement<SidebarItemProps>[]
}

const Sidebar: FC<Props> = ({children}) => {
    const sidebarState = useSidebar()
    const [isOpen, setOpen] = sidebarState.openState

    return (
        <motion.aside
            className={clsx(
                "bg-secondary min-h-screen data-[isopen=true]:w-64 w-24 pt-12 px-2",
                "tablet:z-[10] tablet:!bg-opacity-0 tablet:data-[isopen=true]:!bg-opacity-50 tablet:data-[isopen=true]:backdrop-blur-md tablet:w-16 data-[isopen=true]:tablet:w-72 tablet:absolute",
                "phone:w-12 data-[isopen=true]:phone:w-64",
                "data-[isopen=true]:p-6 flex flex-col data-[isopen=false]:items-center"
            )}
            layout
            data-isopen={isOpen}
        >
            <div className="self-end flex justify-end mb-3">
                <Button
                    size="sm"
                    isIconOnly
                    color="primary"
                    variant="light"
                    onClick={() => setOpen(prev => !prev)}
                >
                    {
                        isOpen ?
                            <CollapseIcon/>
                            :
                            <ExpandIcon/>
                    }
                </Button>
            </div>
            <div className={clsx(!isOpen && "tablet:hidden")}>
                <div className="flex gap-4">
                    <UserProfile placement="right-end"/>
                    <div className={clsx(!isOpen && "hidden")}>
                        <Link href="/">
                            <Image
                                src="/images/DreamLoggerFull.png"
                                alt="Logo"
                                imgWidth={100} imgHeight={50}
                            />
                        </Link>
                        <h3 className="font-semibold text-lg">Your Dashboard</h3>
                    </div>
                </div>
                <Divider className={clsx(!isOpen && "hidden", "my-6")}/>
            </div>
            <nav className={clsx("space-y-4", !isOpen && "mt-6 tablet:hidden")}>
                {children}
            </nav>
        </motion.aside>
    )
}

export default Sidebar