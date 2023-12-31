"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {Dream} from "@prisma/client";
import {CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import Card from "@/app/(site)/components/Card";
import DreamModal from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamModal";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import {deleteMutator, handleAxiosError} from "@/utils/client/client-utils";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import clsx from "clsx";
import {Chip} from "@nextui-org/chip";
import LogDreamModal from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/LogDreamModal";
import DreamLogFormProvider
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamLogFormProvider";

type Props = {
    dream: Dream,
    isDisabled?: boolean,
    hideTime?: boolean,
    showCreatedAt?: boolean,
    onDelete?: (dream: Dream) => void,
}

const DeleteDream = (dreamId: string) => {
    return useSWRMutation(`/api/me/dreams/${dreamId}`, deleteMutator<Dream>())
}

const DreamCard: FC<Props> = ({isDisabled, dream, hideTime, showCreatedAt, onDelete}) => {
    const {dreams: {optimisticData: {removeOptimisticData: optimisticRemove}}} = useDreamsData()
    const [modalOpen, setModalOpen] = useState(false)
    const {trigger: deleteDream} = DeleteDream(dream.id)

    const doDelete = useCallback(() => (
        deleteDream()
            .then(res => res.data)
            .catch(handleAxiosError)
    ), [deleteDream])

    return (
        <Fragment>
            {
                dream.isDraft ? (
                    <DreamLogFormProvider>
                        <LogDreamModal
                            draftDream={dream}
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                        />
                    </DreamLogFormProvider>
                ) : (
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
                            if (onDelete)
                                onDelete(dream)
                            setModalOpen(false)
                        }}
                    />
                )
            }
            <Card
                isPressable={!isDisabled}
                onPress={() => {
                    if (!isDisabled)
                        setModalOpen(true)
                }}
                classNames={{
                    base: "hover:scale-105 dark:bg-dark bg-light-secondary rounded-3xl",
                    header: "px-8 phone:px-4 pb-0 z-1 block",
                    body: " px-8 phone:px-4 py-6 phone:py-4",
                    footer: "px-8 phone:px-4",
                }}>
                <CardHeader>
                    {dream.isDraft &&
                        <div className="w-full flex justify-start mb-4"><Chip size="sm" variant="flat">DRAFT</Chip>
                        </div>}
                    <div className="flex justify-between">
                        <h2 className={clsx(
                            "text-3xl tablet:text-xl font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis",
                            hideTime ? "max-w-full" : "max-w-[80%] tablet:max-w-[70%] phone:max-w-[75%]"
                        )}>{dream.title}</h2>
                        {
                            !hideTime && (
                                <p className="text-subtext text-lg phone:text-sm self-end">
                                    {new Date(dream.createdAt.toString()).toLocaleTimeString("en-US", {
                                        timeStyle: 'short'
                                    })}
                                </p>
                            )
                        }
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="phone:text-sm dark:text-subtext text-neutral-500 max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis">
                        {dream.description.substring(0, Math.min(dream.description.length, 100))}
                    </p>
                </CardBody>
                {
                    showCreatedAt && (
                        <CardFooter>
                            <p className="text-xs text-subtext">Created on {
                                new Date(dream.createdAt.toString()).toLocaleDateString("en-US", {
                                    dateStyle: 'medium'
                                })
                            }</p>
                        </CardFooter>
                    )
                }
            </Card>
        </Fragment>
    )
}

export default DreamCard