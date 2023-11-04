import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const SortIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.477 7.962a.75.75 0 0 0 1.046 1.076L5.477 7.962ZM9.6 5h.75a.75.75 0 0 0-1.273-.538L9.6 5Zm-.75 14a.75.75 0 0 0 1.5 0h-1.5Zm9.673-2.962a.75.75 0 1 0-1.046-1.076l1.046 1.076ZM14.4 19h-.75a.75.75 0 0 0 1.273.538L14.4 19Zm.75-14a.75.75 0 0 0-1.5 0h1.5ZM6.523 9.038l3.6-3.5-1.046-1.076-3.6 3.5 1.046 1.076ZM8.85 5v14h1.5V5h-1.5Zm8.627 9.962-3.6 3.5 1.046 1.076 3.6-3.5-1.046-1.076ZM15.15 19V5h-1.5v14h1.5Z"
        />
    </svg>
)
export default SortIcon
