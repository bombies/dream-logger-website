import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const SettingsIcon = ({className, fill, width, height}: IconProps) => (
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
            d="M20.2 5.259 14 1.529a3.857 3.857 0 0 0-3.9 0L3.8 5.26C2.7 5.964 2 7.275 2 8.585v6.754c0 1.31.7 2.62 1.8 3.327l6.2 3.83c.6.403 1.3.504 2 .504s1.4-.202 2-.504l6.2-3.73A3.902 3.902 0 0 0 22 15.44V8.585c0-1.31-.7-2.62-1.8-3.326ZM12 15.742c-2 0-3.7-1.713-3.7-3.73 0-2.015 1.6-3.73 3.7-3.73s3.7 1.614 3.7 3.73c0 2.017-1.7 3.73-3.7 3.73Z"
        />
    </svg>
)
export default SettingsIcon
