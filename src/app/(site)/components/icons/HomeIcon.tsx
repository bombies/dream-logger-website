import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const HomeIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 512 512"
    >
        <path
            d="M453.794 170.688 283.185 10.753c-15.287-14.337-39.083-14.337-54.37 0L58.206 170.688a39.763 39.763 0 0 0-12.565 29V472.25c0 21.954 17.803 39.75 39.75 39.75h120.947V395.145h99.324V512h120.946c21.947 0 39.751-17.796 39.751-39.75V199.688a39.767 39.767 0 0 0-12.565-29z"
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        />
    </svg>
)
export default HomeIcon
