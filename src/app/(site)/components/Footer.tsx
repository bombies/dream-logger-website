"use client"

import {FC} from "react";
import Image from "@/app/(site)/components/Image";
import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/react";
import Logo from "@/app/(site)/components/Logo";

const Footer: FC = () => {
    const pathName = usePathname();

    return !["/signin", "/resetpassword"].some(word => pathName.includes(word)) && (
        <footer
            className="bg-light dark:bg-darker p-20 flex justify-between phone:flex-col phone:items-center !z-[2]">
            <div>
                <Logo width={250} height={100}/>
                <p className="text-subtext text-sm phone:text-center">&copy; 2023 Ajani Green - All rights reserved.</p>
            </div>
            <div className="phone:mt-12">
                <div className='phone:text-center'>
                    <h3 className="font-bold text-primary">Resources</h3>
                    <Link className="block" color="foreground" href="/terms">Terms of Service</Link>
                    <Link className="block" color="foreground" href="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer