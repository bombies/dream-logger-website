import {FC, PropsWithChildren} from "react";
import clsx from "clsx";

type Props = {
    className?: string
} & PropsWithChildren

const SubTitle: FC<Props> = ({className, children}) => {
    return (
        <h2 className={clsx(
            "text-4xl phone:text-2xl font-semibold mb-8 phone:mb-4 tablet:text-center",
            className
        )}>{children}</h2>
    )
}

export default SubTitle