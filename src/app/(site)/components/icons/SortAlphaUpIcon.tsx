import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const SortAlphaUpIcon = ({className, fill, width, height}: IconProps) => (
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
            d="M10.22 15.97 9 17.19V5c0-.41-.34-.75-.75-.75s-.75.34-.75.75v12.19l-1.22-1.22a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2.5 2.5a.776.776 0 0 0 .53.22.776.776 0 0 0 .53-.22l2.5-2.5c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0ZM14 11.21c.39.14.82-.06.96-.45l.28-.78h2.03l.28.78c.11.31.4.5.71.5.08 0 .17-.01.25-.04a.75.75 0 0 0 .45-.96l-1.71-4.79c-.17-.43-.56-.71-1-.71-.44 0-.83.28-1 .73l-1.7 4.77c-.14.39.06.82.45.96v-.01Zm2.73-2.73h-.96l.48-1.34.48 1.34ZM18.67 13.46c-.19-.44-.59-.71-1.05-.71h-3.11c-.41 0-.75.34-.75.75s.34.75.75.75h2.39l-2.83 2.95c-.34.36-.43.88-.24 1.34.19.44.59.71 1.05.71h3.13c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-2.39l2.82-2.93c.34-.36.44-.89.24-1.35l-.01-.01Z"
        />
    </svg>
)
export default SortAlphaUpIcon