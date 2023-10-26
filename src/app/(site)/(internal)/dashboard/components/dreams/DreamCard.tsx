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
                header: "bg-[#0C0015] pt-6 px-8 pb-0",
                body: "bg-[#0C0015] px-8 pt-4",
                footer: "bg-[#0C0015] px-8",
            }}>
                <CardHeader className="flex justify-between">
                    <h2 className="text-3xl tablet:text-xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[80%] phone:max-w-[50%]">{dream.title}</h2>
                    <p className="text-subtext text-lg self-end">
                        {new Date(dream.createdAt.toString()).toLocaleTimeString("en-US", {
                            timeStyle: 'short'
                        })}
                    </p>
                </CardHeader>
                <CardBody>
                    <p className="mb-4 text-subtext max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {dream.description.substring(0, Math.min(dream.description.length, 100))}
                    </p>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default DreamCard