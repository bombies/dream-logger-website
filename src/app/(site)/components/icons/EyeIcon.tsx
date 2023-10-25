import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const EyeIcon = ({fill, width, height, className, svgClassName}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="0 0 24 24"
        className={svgClassName}
    >
        <path
            className={clsx("self-center", className)}
            stroke={clsx(fill ?? "currentColor")}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 16.01a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        />
        <path
            className={clsx("self-center", className)}
            stroke={clsx(fill ?? "currentColor")}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2 11.98c6.09-10.66 13.91-10.65 20 0M22 12.01c-6.09 10.66-13.91 10.65-20 0"
        />
    </svg>
)
export default EyeIcon
