import {FC, Fragment} from "react";
import {Dream} from "@prisma/client";
import {CardBody, CardHeader} from "@nextui-org/card";
import Card from "@/app/(site)/components/Card";

type Props = {
    dream: Dream
}

const DreamCard: FC<Props> = ({dream}) => {
    return (
        <Fragment>
            <Card classNames={{
                header: "bg-secondary",
                body: "bg-secondary",
                footer: "bg-secondary",
            }}>
                <CardHeader className="flex justify-between">
                    <h2>{dream.title}</h2>
                    <p>
                        {new Date(dream.createdAt.toString()).toLocaleTimeString("en-US", {
                            timeStyle: 'short'
                        })}
                    </p>
                </CardHeader>
                <CardBody>
                    <p>
                        {dream.description.substring(0, Math.min(dream.description.length, 100))}
                    </p>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default DreamCard