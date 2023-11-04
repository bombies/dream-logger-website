import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const HomeIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 24 24"
    >
        <g className={clsx("self-center", className)}
           fill={clsx(fill ?? "currentColor")}>
            <path
                d="M8.731 21H5.418A2.41 2.41 0 0 1 3 18.576v-8.439c0-1.077.537-2.154 1.522-2.783l6.18-3.95a2.289 2.289 0 0 1 2.597 0l6.179 3.95C20.373 7.983 21 8.97 21 10.137v8.44A2.41 2.41 0 0 1 18.582 21H8.731Z"
            />
            <path
                fillRule="evenodd"
                d="M12.743 4.235a1.29 1.29 0 0 0-1.486 0l-.017.012-6.179 3.95A2.31 2.31 0 0 0 4 10.137v8.44C4 19.372 4.63 20 5.418 20h13.164A1.41 1.41 0 0 0 20 18.576v-8.439c0-.779-.412-1.477-1.08-1.953l-6.16-3.937-.017-.012Zm1.102-1.669a3.288 3.288 0 0 0-3.69 0l-6.17 3.945A4.31 4.31 0 0 0 2 10.137v8.44A3.41 3.41 0 0 0 5.418 22h13.164A3.41 3.41 0 0 0 22 18.576v-8.439c0-1.549-.835-2.82-1.948-3.601a.934.934 0 0 0-.036-.024l-6.171-3.946Z"
                clipRule="evenodd"
            />
        </g>
    </svg>
)
export default HomeIcon
