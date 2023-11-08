"use client"

import {FC} from "react";
import Image from "@/app/(site)/components/Image";
import {useDarkMode} from "@/app/(site)/components/providers/DarkModeProvider";

type Props = {
    width: number,
    height: number,
}

const Logo: FC<Props> = ({width, height}) => {
    const [darkMode] = useDarkMode()

    return darkMode ? (
        <Image
            src={"/images/DreamLoggerFull.png"}
            alt="Logo"
            imgWidth={width} imgHeight={height}
        />
    ) : (
        <Image
            src={"/images/DreamLoggerFullDark.png"}
            alt="Logo"
            imgWidth={width} imgHeight={height}
        />
    )
}

export default Logo