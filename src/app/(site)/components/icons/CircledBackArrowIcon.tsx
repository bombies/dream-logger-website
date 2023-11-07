import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CircledBackArrowIcon = ({className, fill, width, height}: IconProps) => (
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
            d="M12 22c5.5 0 10-4.5 10-10 0-.6-.4-1-1-1h-9.9l3.2-3.2c.4-.4.4-1 0-1.4-.2-.2-.4-.3-.7-.3-.3 0-.5.1-.7.3l-4.8 4.9c-.4.4-.4 1 0 1.4l4.7 4.9c.4.4 1.1.4 1.4 0 .4-.4.4-1 0-1.4L11.1 13h8.8c-.5 3.9-3.8 7-7.9 7-4.4 0-8-3.6-8-8s3.6-8 8-8c3.3 0 6.2 2 7.5 5.1.2.5.8.8 1.3.6.5-.2.8-.8.6-1.3C19.8 4.5 16.1 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10Z"
        />
    </svg>
)
export default CircledBackArrowIcon
