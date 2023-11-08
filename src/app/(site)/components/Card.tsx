import {FC} from "react";
import {Card as NextCard, CardBody, CardProps} from "@nextui-org/card";
import clsx from "clsx";

const Card: FC<CardProps> = ({classNames, ...props}) => {
    return (
        <NextCard
            classNames={{
                base: clsx("rounded-3xl border border-primary bg-light-secondary dark:bg-secondary dark:border-primary/20", classNames?.base),
                ...classNames,
            }}
            {...props}
        >
            {props.children}
        </NextCard>
    )
}

export default Card