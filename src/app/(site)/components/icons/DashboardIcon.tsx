import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const DashboardIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        className="icon glyph"
        viewBox="0 0 24 24"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="M6.3 2H11v20H6.3C3.9 22 2 20.1 2 17.7V6.3C2 3.9 3.9 2 6.3 2ZM22 6.3v1.5h-9V2h4.7C20.1 2 22 3.9 22 6.3ZM22 9.7h-9v4.5h9V9.7ZM13 16.3h9v1.5c0 2.3-1.9 4.3-4.3 4.3H13v-5.8Z"
            />
        </g>
    </svg>
)
export default DashboardIcon
