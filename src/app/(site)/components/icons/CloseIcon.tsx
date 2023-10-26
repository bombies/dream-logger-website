import * as React from "react"
import {SVGProps} from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CloseIcon = ({ className, fill, width, height }: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("self-center", className)}
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        stroke="#000"
        viewBox="0 0 24 24"
    >
        <path
            stroke={clsx(fill ?? "currentColor")}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
        />
    </svg>
)
export default CloseIcon