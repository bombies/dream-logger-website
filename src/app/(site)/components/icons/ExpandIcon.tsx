import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const ExpandIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="0 0 20 20"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="M5.707 15.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 1 1 1.414 1.414l-4 4Z"
            />
            <path d="M5 16a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2H5Z"/>
            <path
                d="M6 15a1 1 0 1 1-2 0v-4a1 1 0 1 1 2 0v4ZM11.707 9.707a1 1 0 0 1-1.414-1.414l4-4a1 1 0 1 1 1.414 1.414l-4 4Z"
            />
            <path d="M16 9a1 1 0 1 1-2 0V5a1 1 0 1 1 2 0v4Z"/>
            <path d="M11 6a1 1 0 1 1 0-2h4a1 1 0 1 1 0 2h-4Z"/>
        </g>
    </svg>
)
export default ExpandIcon
