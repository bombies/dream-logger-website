import {FC} from "react";
import {Card as NextCard, CardBody, CardProps} from "@nextui-org/card";
import clsx from "clsx";

const Card: FC<CardProps> = ({classNames, ...props}) => {
    return (
        <NextCard
            classNames={{
                base: clsx("rounded-3xl", classNames?.base),
                header: clsx("bg-secondary", classNames?.header),
                body: clsx("bg-secondary", classNames?.body),
                footer: clsx("bg-secondary", classNames?.footer),
            }}
            {...props}
        >
            {props.children}
        </NextCard>
    )
}

export default Card