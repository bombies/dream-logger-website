import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const ExpandIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 20}
        height={height ?? width ?? 21}
        fill="none"
        viewBox="0 0 20 21"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="M18.5.296h-5.4c-1.3 0-2 1.6-1 2.5l2 2-3.1 3.1c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3l3.1-3.1 2 2c.9.9 2.5.3 2.5-1v-5.4c0-.8-.7-1.5-1.5-1.5ZM17.5 12.396l-2 2-3.1-3.1c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.1 3.1-2 2c-.9.9-.3 2.5 1 2.5h5.4c.8 0 1.5-.7 1.5-1.5v-5.4c0-1.3-1.6-1.9-2.5-1ZM7.6 11.296l-3.1 3.1-2-2c-.9-.9-2.5-.3-2.5 1v5.4c0 .8.7 1.5 1.5 1.5h5.4c1.3 0 2-1.6 1-2.5l-2-2 3.1-3.1c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0ZM5.9 4.796l2-2c.9-.9.3-2.5-1-2.5H1.5c-.8 0-1.5.7-1.5 1.5v5.4c0 1.3 1.6 2 2.5 1l2-2 3.1 3.1c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-3.1-3.1Z"
            />
        </g>
    </svg>
)
export default ExpandIcon
