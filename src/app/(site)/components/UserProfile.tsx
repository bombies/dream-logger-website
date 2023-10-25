import {FC} from "react";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import DashboardIcon from "@/app/(site)/components/icons/DashboardIcon";
import SettingsIcon from "@/app/(site)/components/icons/SettingsIcon";
import useMemberInfo from "@/app/(site)/hooks/useMemberInfo";
import {OverlayPlacement} from "@nextui-org/aria-utils";
import Link from "next/link";

type Props = {
    placement?: OverlayPlacement
}

const UserProfile: FC<Props> = ({placement}) => {
    const member = useMemberInfo()

    return (
        <Dropdown
            showArrow
            closeOnSelect
            placement={placement ?? "bottom"}
            offset={10}
            classNames={{
                base: "border font-semibold border-primary/30 px-4 py-6 bg-gradient-to-b from-[#8F00FF30] to-[#27007940] backdrop-blur-md"
            }}
        >
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={member?.image ?? undefined}
                    name={member?.firstName.toLowerCase()}
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
                        <p className="font-bold text-xl">Hey <span className="capitalize">{member?.firstName}</span></p>

                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
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
                        href="/settings"
                        key="settings"
                        startContent={<SettingsIcon width={16}/>}
                    >
                        Settings
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem color="danger" key="log_out">
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserProfile