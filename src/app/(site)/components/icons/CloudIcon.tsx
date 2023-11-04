import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CloudIcon = ({width, className, fill, height, svgClassName}: IconProps) => (
    <svg
        className={svgClassName}
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 25}
        fill="none"
        viewBox="0 0 24 25"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="M15.2 4.968c-2.8 0-5.3 1.5-6.7 3.9-.5-.1-1-.2-1.5-.2-3.3 0-6 2.8-6 6.1s2.7 6.2 6 6.2h8.2c4.3 0 7.8-3.6 7.8-8s-3.5-8-7.8-8Z"
        />
    </svg>
)
export default CloudIcon
