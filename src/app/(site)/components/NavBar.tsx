"use client";

import {FC, Fragment, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Button from "@/app/(site)/components/Button";
import clsx from "clsx";
import Image from "@/app/(site)/components/Image";
import {useSession} from "next-auth/react";
import UserProfile from "@/app/(site)/components/UserProfile";

const NavBar: FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const pathName = usePathname();
    const {data: session, status: authStatus} = useSession()
    const router = useRouter()

    return (
        <Navbar
            onMenuOpenChange={setMenuOpen}
            className={clsx(pathName.includes("/dashboard") || pathName.includes("/signin") && "hidden")}
            classNames={{
                base: 'bg-[#0C0015]'
            }}
        >
            <NavbarContent>
                <NavbarMenuToggle className="laptop-min:hidden"/>
                <NavbarBrand>
                    <Link href="/">
                        <Image
                            src="/images/DreamLoggerFull.png"
                            alt="Logo"
                            imgWidth={150} imgHeight={75}
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="laptop:hidden gap-4" justify="center">
                <NavbarItem isActive={pathName.includes("#about")}>
                    <Link href="#about">
                        ABOUT
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="laptop:hidden gap-4">
                {
                    authStatus !== 'authenticated' &&
                        (
                            <Fragment>
                                <NavbarItem>
                                    <Button
                                        color="secondary"
                                        onPress={() => router.push("/signin")}
                                    >
                                        Log In
                                    </Button>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button
                                        color="cta"
                                        variant="shadow"
                                        onPress={() => router.push("/signin?tab=register")}
                                    >
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </Fragment>
                        )
                }
            </NavbarContent>
            {
                authStatus === 'authenticated' && (
                    <NavbarContent justify='end'>
                        <UserProfile />
                    </NavbarContent>
                )
            }
            <NavbarMenu className="bg-[#0C0015]/95 backdrop-blur-md">
                <NavbarMenuItem>
                    <Link className="w-full" href="#about">
                        ABOUT
                    </Link>
                </NavbarMenuItem>
                {
                    authStatus !== 'authenticated' ?
                        (
                            <Fragment>
                                <NavbarMenuItem>
                                    <Button
                                        color="secondary"
                                        fullWidth
                                        onPress={() => router.push("/signin")}
                                    >
                                        Log In
                                    </Button>
                                </NavbarMenuItem>
                                <NavbarMenuItem>
                                    <Button
                                        color="cta"
                                        variant="shadow"
                                        fullWidth
                                        onPress={() => router.push("/signin?tab=register")}
                                    >
                                        Sign Up
                                    </Button>
                                </NavbarMenuItem>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                {/*TODO: Set up user profile*/}
                            </Fragment>
                        )
                }
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar