import {FC} from "react";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {signOut} from "next-auth/react";

type Props = {
    user: any
}

const UserProfile: FC<Props> = ({user}) => {
    console.log(user)

    return (
        <Dropdown placeholder="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={user?.image ?? undefined}
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
                <DropdownItem key="profile" isReadOnly>
                    <p>Hey <span className="capitalize">{user.firstName}</span></p>
                    <Divider className="my-6" />
                </DropdownItem>
                <DropdownItem color="danger" key="log_out">
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserProfile