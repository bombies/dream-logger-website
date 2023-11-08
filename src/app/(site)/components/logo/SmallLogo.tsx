"use client"

import {FC} from "react";
import {useDarkMode} from "@/app/(site)/components/providers/DarkModeProvider";
import Image from "@/app/(site)/components/Image";

type Props = {
    width: number,
    height: number
}

const SmallLogo: FC<Props> = ({width, height}) => {
    const [darkMode] = useDarkMode()

    return darkMode ? (
        <Image
            src={"/images/DreamLoggerSmall.png"}
            alt="Logo"
            imgWidth={width} imgHeight={height}
        />
    ) : (
        <Image
            src={"/images/DreamLoggerSmallDark.png"}
            alt="Logo"
            imgWidth={width} imgHeight={height}
        />
    )
}

export default SmallLogo