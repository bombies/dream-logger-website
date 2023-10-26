"use client"

import {FC, Fragment, useState} from "react";
import {CardBody} from "@nextui-org/card";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import Card from "@/app/(site)/components/Card";
import LogDreamModal from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/LogDreamModal";

const LogDreamCard: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <LogDreamModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Card
                onPress={() => setModalOpen(true)}
                isPressable
                classNames={{
                    body: "bg-primary py-8"
                }}
            >
                <CardBody>
                    <div className="flex gap-4">
                        <CloudIcon width={36}/>
                        <h3 className="font-semibold text-2xl phone:text-medium self-center">Log A New Dream</h3>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default LogDreamCard