import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const DoubleBackIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 512 512"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="m297.2 478 20.7-21.6L108.7 256 317.9 55.6 297.2 34 65.5 256l231.7 222zM194.1 256 425.8 34l20.7 21.6L237.3 256l209.2 200.4-20.7 21.6-231.7-222z"/>
    </svg>
)
export default DoubleBackIcon
