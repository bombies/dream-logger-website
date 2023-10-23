"use client";

import {FC, useState} from "react";
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
import {usePathname} from "next/navigation";
import Button, {MotionButton} from "@/app/(site)/components/Button";
import clsx from "clsx";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";

const NavBar: FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const pathName = usePathname();

    return (
        <Navbar
            onMenuOpenChange={setMenuOpen}
            className={clsx(pathName.includes("/dashboard") && "hidden")}
            classNames={{
                base: 'bg-[#0C0015]'
            }}
        >
            <NavbarContent>
                <NavbarMenuToggle className="laptop-min:hidden" />
                <NavbarBrand>
                    <h1 className="font-bold text-xl relative">
                        Dream<span className="text-primary">Logger</span>
                        <CloudIcon svgClassName="absolute -bottom-[0.5px] -left-2" width={16} />
                    </h1>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="laptop:hidden gap-4" justify="center">
                <NavbarItem isActive={pathName.includes("#about")}>
                    <Link href="#">
                        ABOUT
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="laptop:hidden gap-4">
                {/*TODO: Setup authentication*/}
                <NavbarItem>
                    <Button color="secondary">
                        Log In
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        color="cta"
                        variant="shadow"
                    >
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-[#0C0015]/95 backdrop-blur-md">
                <NavbarMenuItem>
                    <Link className="w-full" href="#about">
                        ABOUT
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button color="secondary">
                        Log In
                    </Button>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button color="cta" variant="shadow">
                        Sign Up
                    </Button>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar