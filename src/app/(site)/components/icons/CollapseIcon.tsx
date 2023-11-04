import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CollapseIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 21}
        height={height ?? width ?? 21}
        fill="none"
        viewBox="0 0 21 21"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="M13.1 8.696h5.3c1.3 0 1.9-1.6 1-2.5l-2-2 2.3-2.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-2.3 2.3-2-2c-.9-.9-2.5-.3-2.5 1v5.3c.1.9.8 1.6 1.6 1.6ZM5.9.896l-2 2-2.2-2.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2.3 2.3-2 2c-.9.9-.3 2.5 1 2.5h5.3c.8 0 1.4-.6 1.4-1.4v-5.5c.1-1.3-1.5-1.9-2.4-1ZM6.9 11.896H1.6c-1.3 0-1.9 1.6-1 2.5l2 2-2.3 2.3c-.4.4-.4 1 0 1.4.2.1.4.2.7.2.3 0 .5-.1.7-.3l2.3-2.3 2 2c.9.9 2.5.3 2.5-1v-5.3c-.1-.8-.8-1.5-1.6-1.5ZM17.5 16.396l2-2c.9-.9.3-2.5-1-2.5h-5.3c-.8 0-1.4.6-1.4 1.4v5.3c0 1.3 1.6 1.9 2.5 1l2-2 2.3 2.3c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-2.5-2.1Z"
            />
        </g>

    </svg>
)
export default CollapseIcon
