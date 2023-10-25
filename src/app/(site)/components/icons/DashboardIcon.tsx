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
            <rect width={9} height={11} x={2} y={2} rx={2}/>
            <rect width={9} height={7} x={13} y={2} rx={2}/>
            <rect width={9} height={7} x={2} y={15} rx={2}/>
            <rect width={9} height={11} x={13} y={11} rx={2}/>
        </g>
    </svg>
)
export default DashboardIcon
