"use client"

import {FC, Fragment, ReactElement, useRef} from "react";
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
import useOnClickOutside from "use-onclickoutside";
import {SidebarSectionProps} from "@/app/(site)/components/sidebar/SidebarSection";
import {Spacer, Tooltip} from "@nextui-org/react";
import {useMemberData} from "@/app/(site)/components/providers/user-data/UserProvider";
import SignOutLinedIcon from "@/app/(site)/components/icons/SignOutLinedIcon";
import {signOut} from "next-auth/react";
import CircledArrowIcon from "@/app/(site)/components/icons/CircledArrowIcon";
import CircledBackArrowIcon from "@/app/(site)/components/icons/CircledBackArrowIcon";

type Props = {
    children?: ReactElement<SidebarItemProps | SidebarSectionProps> | ReactElement<SidebarItemProps | SidebarSectionProps>[],
    headerText?: string
}

const Sidebar: FC<Props> = ({children, headerText}) => {
    const sidebarState = useSidebar()
    const [isOpen, setOpen] = sidebarState.openState
    const sidebarRef = useRef<HTMLDivElement>(null)
    const {memberData} = useMemberData()

    useOnClickOutside(sidebarRef, () => {
        setOpen(false)
    })

    return (
        <motion.aside
            ref={sidebarRef}
            className={clsx(
                "relative bg-secondary min-h-screen data-[isopen=true]:w-96 w-24 pt-12 px-2",
                "z-[100] tablet:!bg-opacity-0 tablet:data-[isopen=true]:!bg-opacity-90 tablet:data-[isopen=true]:backdrop-blur-md tablet:w-16 data-[isopen=true]:tablet:w-72 tablet:fixed",
                "phone:w-12 data-[isopen=true]:phone:w-64",
                "data-[isopen=true]:p-6 flex flex-col data-[isopen=false]:items-center data-[isopen=false]:z-0"
            )}
            layout
            data-isopen={isOpen}
        >
            <div className={clsx("absolute self-end flex justify-end mb-3 -right-4 z-20", !isOpen && "phone:right-2")}>
                <Button
                    size="sm"
                    isIconOnly
                    color="primary"
                    variant="flat"
                    onClick={() => setOpen(prev => !prev)}
                >
                    {
                        isOpen ?
                            <CircledArrowIcon width={16}/>
                            :
                            <CircledBackArrowIcon width={16}/>
                    }
                </Button>
            </div>
            <div>
                <div className={clsx("mt-6", !isOpen && "tablet:hidden")}>
                    {
                        isOpen ? (
                            <Fragment>
                                <Link href="/">
                                    <Image
                                        src="/images/DreamLoggerFull.png"
                                        alt="Logo"
                                        imgWidth={175} imgHeight={50}
                                    />
                                </Link>
                                <h3 className="font-semibold text-medium">{headerText}</h3>
                                <Divider className="my-6"/>
                            </Fragment>

                        ) : (
                            <Link href="/">
                                <Image
                                    src="/images/DreamLoggerSmall.png"
                                    alt="Logo"
                                    imgWidth={40} imgHeight={40}
                                />
                            </Link>
                        )
                    }
                </div>
            </div>
            <nav className={clsx("space-y-4", !isOpen && "tablet:hidden")}>
                {children}
                <Divider className={clsx(!isOpen && "hidden", "my-6")}/>
            </nav>
            <div className={clsx(!isOpen && "tablet:hidden")}>
                <Spacer y={6}/>
                <div className="flex gap-4">
                    <div className="w-fit">
                        <UserProfile placement="right-end"/>
                    </div>
                    {isOpen && (
                        <Fragment>
                            <div className="overflow-hidden flex-grow-0">
                                <p className="text-purple-400 break-all">@{memberData.data?.username}</p>
                                <p className="text-sm text-subtext">{memberData.data?.email}</p>
                            </div>
                            <Tooltip
                                placement="right"
                                className="bg-secondary/90 border border-primary/40 backdrop-blur-md p-3 font-semibold text-lg"
                                content="Sign Out"
                            >
                                <Button
                                    isIconOnly
                                    color="danger"
                                    variant="light"
                                    onPress={() => signOut()}
                                >
                                    <SignOutLinedIcon width={20}/>
                                </Button>
                            </Tooltip>
                        </Fragment>
                    )}
                </div>
            </div>
        </motion.aside>
    )
}

export default Sidebar