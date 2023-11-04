"use client"

import {FC, Fragment, useState} from "react";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {DreamCharacter, DreamTag} from "@prisma/client";
import GenericTagModal from "@/app/(site)/(internal)/dashboard/tags/components/GenericTagModal";

type Props = {
    data: DreamCharacter | DreamTag,
    stateType: "tags" | "characters",
}

const GenericTagCard: FC<Props> = ({data, stateType}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <GenericTagModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                item={data}
                itemType={stateType}
            />
            <Card
                isPressable
                onPress={() => setModalOpen(true)}
                disableRipple
                classNames={{
                    base: "hover:scale-105",
                    header: "bg-[#0C0015] pt-6 px-8 pb-0 z-1",
                    body: "bg-[#0C0015] px-8 py-4",
                    footer: "bg-[#0C0015] px-8",
                }}
            >
                <CardBody>
                    <h2 className="text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">{
                        stateType === "tags" ? (
                            (data as DreamTag).tag
                        ) : (
                            (data as DreamCharacter).name
                        )
                    }</h2>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default GenericTagCard