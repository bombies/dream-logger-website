import {FC, PropsWithChildren} from "react";
import clsx from "clsx";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";

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
            <Card
                className={clsx(className, "py-6 px-4 phone:p-3 w-[36rem] tablet:w-[24rem] phone:w-[20rem] tablet:self-center")}>
                <CardBody className="flex flex-col gap-y-6 phone:gap-y-3 overflow-hidden">
                    {children}
                </CardBody>
            </Card>
        </div>
    )
}

export default DreamContainer