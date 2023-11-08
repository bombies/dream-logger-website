"use client"

import {FC} from "react";
import {CardBody, CardHeader} from "@nextui-org/card";
import Card from "@/app/(site)/components/Card";
import {Skeleton} from "@nextui-org/react";

const DreamCardSkeleton: FC = () => {
    return (
        <Card
            classNames={{
                base: "hover:scale-105 dark:bg-dark bg-light-secondary rounded-3xl",
                header: "pt-6 px-8 pb-0",
                body: "px-8 pt-4",
                footer: "px-8",
            }}>
            <CardHeader className="flex justify-between">
                <Skeleton className="rounded-full w-[70%] phone:w-[50%] h-6"/>
                <Skeleton className="rounded-full self-end h-5 w-[20%]"/>
            </CardHeader>
            <CardBody>
                <Skeleton className="rounded-full w-[85%] h-3 my-4"/>
            </CardBody>
        </Card>
    )
}

export default DreamCardSkeleton