import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const DoubleBackIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 20 18"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="m19.76 15.966-4.004-6c-.4-.61-.4-1.322 0-1.932l4.004-6c.601-.915 0-2.034-1-2.034h-3.004c-.8 0-1.5.407-1.901 1.017L9.45 7.525c-.6.814-.6 1.933 0 2.848l4.305 6.61c.4.61 1.2 1.017 1.901 1.017h3.003c1.101 0 1.702-1.22 1.101-2.034Z"
            />
            <path
                d="m10.76 15.966-4.003-6c-.4-.61-.4-1.322 0-1.932l4.003-6c.601-.915 0-2.034-1-2.034H6.756c-.801 0-1.502.407-1.902 1.017L.45 7.525c-.6.814-.6 1.933 0 2.848l4.305 6.61c.4.61 1.1 1.017 1.901 1.017H9.66c1.101 0 1.702-1.22 1.101-2.034Z"
            />
        </g>
    </svg>
)
export default DoubleBackIcon
