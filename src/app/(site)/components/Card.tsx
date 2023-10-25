import {FC} from "react";
import {Card as NextCard, CardBody, CardProps} from "@nextui-org/card";

const Card: FC<CardProps> = ({...props}) => {
    return (
        <NextCard
            classNames={{
                header: "bg-secondary",
                body: "bg-secondary",
                footer: "bg-secondary",
            }}
            {...props}
        >
            {props.children}
        </NextCard>
    )
}

export default Card