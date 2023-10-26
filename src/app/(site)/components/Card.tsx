import {FC} from "react";
import {Card as NextCard, CardBody, CardProps} from "@nextui-org/card";

const Card: FC<CardProps> = ({classNames, ...props}) => {
    return (
        <NextCard
            classNames={{
                base: "rounded-3xl",
                header: "bg-secondary",
                body: "bg-secondary",
                footer: "bg-secondary",
                ...classNames,
            }}
            {...props}
        >
            {props.children}
        </NextCard>
    )
}

export default Card