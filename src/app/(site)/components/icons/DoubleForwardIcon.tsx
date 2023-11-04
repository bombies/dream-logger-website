import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const DoubleForwardIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        data-name="Layer 1"
        viewBox="0 0 20 18"
    >
        <g className={clsx("self-center", className)}
           fill={clsx(fill ?? "currentColor")}>
            <path
                d="m.24 2.034 4.003 6c.4.61.4 1.322 0 1.932l-4.003 6c-.601.915 0 2.034 1 2.034h3.003c.801 0 1.502-.407 1.902-1.017l4.405-6.508c.6-.814.6-1.933 0-2.848l-4.305-6.61C5.845.407 5.045 0 4.344 0H1.34C.24 0-.361 1.22.24 2.034Z"
            />
            <path
                d="m9.24 2.034 4.003 6c.4.61.4 1.322 0 1.932l-4.003 6c-.601.915 0 2.034 1 2.034h3.003c.801 0 1.502-.407 1.902-1.017l4.405-6.508c.6-.814.6-1.933 0-2.848l-4.305-6.61A2.268 2.268 0 0 0 13.344 0H10.34C9.24 0 8.639 1.22 9.24 2.034Z"
            />
        </g>
    </svg>
)
export default DoubleForwardIcon
