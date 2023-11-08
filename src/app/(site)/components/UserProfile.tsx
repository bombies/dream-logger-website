import {FC} from "react";
import {Avatar, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import {signOut} from "next-auth/react";
import DashboardIcon from "@/app/(site)/components/icons/DashboardIcon";
import SettingsIcon from "@/app/(site)/components/icons/SettingsIcon";
import {OverlayPlacement} from "@nextui-org/aria-utils";
import Link from "next/link";
import Image from "@/app/(site)/components/Image";
import HomeIcon from "@/app/(site)/components/icons/HomeIcon";
import Dropdown from "@/app/(site)/components/Dropdown";
import {useMemberData} from "@/app/(site)/components/providers/user-data/UserProvider";
import useCDNUrl from "@/app/(site)/hooks/s3/useCDNUrl";
import SignOutIcon from "@/app/(site)/components/icons/SignOutIcon";
import DarkModeSwitch from "@/app/(site)/components/DarkModeSwitch";

type Props = {
    placement?: OverlayPlacement
}

const UserProfile: FC<Props> = ({placement}) => {
    const {memberData: {data: member}} = useMemberData()
    const memberImage = useCDNUrl(member?.image && `avatars/${member?.image}`)

    return (
        <Dropdown
            showArrow
            className="border font-semibold border-primary/30 px-4 py-6 bg-gradient-to-b from-[#8F00FF30] to-[#27007940] backdrop-blur-md"
            closeOnSelect
            placement={placement ?? "bottom"}
            offset={10}
        >
            <DropdownTrigger>
                <Avatar
                    color="primary"
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={memberImage}
                    classNames={{
                        name: "capitalize font-semibold"
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                onAction={(key) => {
                    switch (key) {
                        case "log_out": {
                            signOut()
                            break;
                        }
                    }
                }}
            >
                <DropdownSection showDivider>
                    <DropdownItem key="profile" isReadOnly>
                        <Link href="/">
                            <Image
                                src="/images/DreamLoggerFull.png"
                                alt="Logo"
                                imgWidth={75} imgHeight={45}
                            />
                        </Link>
                        <p className="font-bold text-xl">Hey <span className="capitalize">{member?.firstName}</span></p>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem
                        as={Link}
                        href="/"
                        key="home"
                        startContent={<HomeIcon width={16}/>}
                    >
                        Home Page
                    </DropdownItem>
                    <DropdownItem
                        as={Link}
                        href="/dashboard"
                        key="dashboard"
                        startContent={<DashboardIcon width={16}/>}
                    >
                        Dashboard
                    </DropdownItem>
                    <DropdownItem
                        as={Link}
                        href="/settings/account"
                        key="settings"
                        startContent={<SettingsIcon width={16}/>}
                    >
                        Settings
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem
                        isReadOnly
                        key="darkmode_switch"
                    >
                        <DarkModeSwitch showLabel/>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem
                    color="danger"
                    key="log_out"
                    startContent={<SignOutIcon width={16}/>}
                >
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserProfile