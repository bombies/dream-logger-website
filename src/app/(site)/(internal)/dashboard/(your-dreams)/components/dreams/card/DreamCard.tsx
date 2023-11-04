"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {Dream} from "@prisma/client";
import {CardBody, CardHeader} from "@nextui-org/card";
import Card from "@/app/(site)/components/Card";
import DreamModal from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamModal";
import {OptimisticWorker} from "@/utils/client/client-data-utils";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import {deleteMutator, handleAxiosError} from "@/utils/client/client-utils";

type Props = {
    dream: Dream,
    isDisabled?: boolean,
    optimisticRemove?: OptimisticWorker<Dream>,
}

const DeleteDream = (dreamId: string) => {
    return useSWRMutation(`/api/me/dreams/${dreamId}`, deleteMutator<Dream>())
}

const DreamCard: FC<Props> = ({isDisabled, dream, optimisticRemove}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const {trigger: deleteDream} = DeleteDream(dream.id)

    const doDelete = useCallback(() => (
        deleteDream()
            .then(res => res.data)
            .catch(handleAxiosError)
    ), [deleteDream])

    return (
        <Fragment>
            <DreamModal
                dream={dream}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onDelete={() => {
                    if (optimisticRemove)
                        optimisticRemove(
                            doDelete,
                            dream
                        )
                            .then(() => {
                                toast.success("Successfully removed that dream!")
                            })
                    setModalOpen(false)
                }}
            />
            <Card
                isPressable={!isDisabled}
                onPress={() => {
                    if (!isDisabled)
                        setModalOpen(true)
                }}
                classNames={{
                    base: "hover:scale-105",
                    header: "bg-[#0C0015] pt-6 px-8 phone:px-4 pb-0 z-1",
                    body: "bg-[#0C0015] px-8 phone:px-4 pt-4 phone:pt-2",
                    footer: "bg-[#0C0015] px-8 phone:px-4",
                }}>
                <CardHeader className="flex justify-between">
                    <h2 className="text-3xl tablet:text-xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[80%] tablet:max-w-[70%] phone:max-w-[75%]">{dream.title}</h2>
                    <p className="text-subtext text-lg phone:text-sm self-end">
                        {new Date(dream.createdAt.toString()).toLocaleTimeString("en-US", {
                            timeStyle: 'short'
                        })}
                    </p>
                </CardHeader>
                <CardBody>
                    <p className="mb-4 phone:text-sm text-subtext max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {dream.description.substring(0, Math.min(dream.description.length, 100))}
                    </p>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default DreamCard