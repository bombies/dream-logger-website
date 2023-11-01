import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const DoubleForwardIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        data-name="Layer 1"
        viewBox="0 0 512 512"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="m214.78 478-20.67-21.57L403.27 256 194.11 55.57 214.78 34l231.68 222Zm103.11-222L86.22 34 65.54 55.57 274.7 256 65.54 456.43 86.22 478Z"/>
    </svg>
)
export default DoubleForwardIcon
