"use client"

import {FC} from "react";
import Image from "@/app/(site)/components/Image";
import {usePathname} from "next/navigation";

const Footer: FC = () => {
    const pathName = usePathname();

    return !pathName.includes("/signin") && (
        <footer className="bg-[#08000F] p-20 flex phone:flex-col">
            <div>
                <Image
                    src="/images/DreamLoggerFull.png"
                    alt="Logo"
                    imgWidth={250} imgHeight={100}
                />
                <p className="text-subtext text-sm">&copy; DreamLogger 2023 - All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer