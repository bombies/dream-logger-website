import {FC, PropsWithChildren} from "react";
import clsx from "clsx";

type Props = {
    title: string,
    className?: string,
    containerClassName?: string,
    id?: string,
} & PropsWithChildren

const DreamContainer: FC<Props> = ({id, title, children, className, containerClassName}) => {
    return (
        <div id={id} className={clsx(className, "flex flex-col")}>
            <h2 className="text-4xl phone:text-2xl font-semibold mb-8 phone:mb-4 tablet:text-center">{title}</h2>
            <div
                className={clsx(
                    containerClassName,
                    "bg-primary/20 rounded-3xl py-6 px-4 phone:p-3 w-[36rem] tablet:w-[24rem] phone:w-[20rem] tablet:self-center flex flex-col gap-y-6 phone:gap-y-3"
                )}>
                {children}
            </div>
        </div>
    )
}

export default DreamContainer