import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const StatisticsIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 512 512"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="M469.333 42.667h-92.444V106.666c0 35.29-28.71 64-64 64H199.111c-35.291 0-64-28.712-64-64V42.667H42.667c-11.782 0-21.333 9.552-21.333 21.333v426.667c0 11.78 9.552 21.333 21.333 21.333h426.667c11.782 0 21.333-9.553 21.333-21.333V64c0-11.782-9.552-21.333-21.334-21.333zM401.82 236.244 301.254 336.811a21.327 21.327 0 0 1-30.168 0l-45.255-45.255-85.481 85.48a21.265 21.265 0 0 1-15.084 6.251c-5.46 0-10.92-2.084-15.084-6.251-8.331-8.33-8.331-21.837 0-30.17L210.746 246.3a21.335 21.335 0 0 1 30.17 0l45.254 45.257 85.481-85.483c8.33-8.33 21.838-8.33 30.17 0 8.331 8.332 8.331 21.839-.001 30.17z"/>
            <path
                d="M312.889 0H199.111c-11.782 0-21.333 9.552-21.333 21.333v85.333c0 11.782 9.552 21.333 21.333 21.333h113.778c11.782 0 21.333-9.552 21.333-21.333V21.333C334.222 9.552 324.671 0 312.889 0z"/>
        </g>
    </svg>
)
export default StatisticsIcon
