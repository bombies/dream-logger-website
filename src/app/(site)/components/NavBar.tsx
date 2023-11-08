"use client";

import {FC, Fragment} from "react";
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
import SignInIcon from "@/app/(site)/components/icons/SignInIcon";
import DarkModeSwitch from "@/app/(site)/components/DarkModeSwitch";

const NavBar: FC = () => {
    const pathName = usePathname();
    const {status: authStatus} = useSession()
    const router = useRouter()

    return (
        <Navbar
            className={clsx((["/dashboard", "/signin", "/settings", "/resetpassword"].some(name => pathName.includes(name))) && "hidden")}
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
                                    startContent={<SignInIcon/>}
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
                            <NavbarItem>
                                <DarkModeSwitch/>
                            </NavbarItem>
                        </Fragment>
                    )
                }
            </NavbarContent>
            {
                authStatus === 'authenticated' && (
                    <NavbarContent justify='end'>
                        <UserProfile/>
                    </NavbarContent>
                )
            }
            <NavbarMenu className="bg-[#0C0015]/95 backdrop-blur-md">
                <NavbarMenuItem>
                    <Link className="w-full" href="#about">
                        ABOUT
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="w-full" href="/terms">
                        TERMS OF SERVICE
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link className="w-full" href="/privacy">
                        PRIVACY POLICY
                    </Link>
                </NavbarMenuItem>
                {
                    authStatus !== 'authenticated' &&
                    (
                        <Fragment>
                            <NavbarMenuItem>
                                <Button
                                    color="secondary"
                                    fullWidth
                                    onPress={() => router.push("/signin")}
                                    startContent={<SignInIcon/>}
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
                            <NavbarMenuItem>
                                <DarkModeSwitch size="lg" showLabel />
                            </NavbarMenuItem>
                        </Fragment>
                    )
                }
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar