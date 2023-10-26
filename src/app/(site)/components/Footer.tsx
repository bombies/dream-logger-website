"use client"

import {FC} from "react";
import Image from "@/app/(site)/components/Image";
import {usePathname} from "next/navigation";
import {Link} from "@nextui-org/react";

const Footer: FC = () => {
    const pathName = usePathname();

    return !pathName.includes("/signin") && (
        <footer className="bg-[#08000F] p-20 flex justify-between phone:flex-col phone:items-center">
            <div>
                <Image
                    className="phone:flex phone:justify-center"
                    src="/images/DreamLoggerFull.png"
                    alt="Logo"
                    imgWidth={250} imgHeight={100}
                />
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