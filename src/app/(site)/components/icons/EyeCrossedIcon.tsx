import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const EyeCrossedIcon = ({fill, width, height, className, svgClassName}: IconProps) => (
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
            d="M14.83 9.18A4 4 0 0 0 8 12.01a4 4 0 0 0 1.16 2.82M12 16.01a4 4 0 0 0 4-4"
        />
        <path
            className={clsx("self-center", className)}
            stroke={clsx(fill ?? "currentColor")}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.61 6.39 6.38 17.62A21.8 21.8 0 0 1 2 11.99c4.71-8.23 10.44-10.1 15.61-5.6ZM21 3l-3.39 3.39M6.38 17.62 3 21M19.57 8.43A25.336 25.336 0 0 1 22 12.01c-4 7-8.73 9.39-13.23 7.22"
        />
    </svg>
)
export default EyeCrossedIcon
