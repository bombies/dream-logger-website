import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const SignInIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="m7.48.026-5.06.986C.99 1.232 0 2.547 0 3.972v14.031c0 1.425.99 2.74 2.42 2.96l5.06.986c1.76.33 3.3-.986 3.52-2.74V2.766c-.22-1.754-1.76-2.96-3.52-2.74ZM16.898 3H13v16h3.898c1.72 0 3.095-1.387 3.095-2.987V5.987C20.108 4.28 18.733 3 16.898 3Z"
        />
    </svg>
)
export default SignInIcon
