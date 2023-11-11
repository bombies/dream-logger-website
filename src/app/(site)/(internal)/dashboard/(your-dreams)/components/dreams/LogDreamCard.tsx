"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {CardBody} from "@nextui-org/card";
import CloudIcon from "@/app/(site)/components/icons/CloudIcon";
import Card from "@/app/(site)/components/Card";
import LogDreamModal from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/LogDreamModal";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import useSWRMutation from "swr/mutation";
import {handleAxiosError, postMutatorWithoutArgs} from "@/utils/client/client-utils";
import {Dream} from "@prisma/client";
import DreamLogFormProvider from "./forms/log/DreamLogFormProvider";
import clsx from "clsx";

type Props = {
    isDisabled?: boolean,
    content?: string,
    className?: string,
}

const CreateDraftDream = () => (
    useSWRMutation(`/api/me/dreams/drafts`, postMutatorWithoutArgs<Dream | null>())
)

const LogDreamCard: FC<Props> = ({isDisabled, content, className}) => {
    const {dreams: {data: dreams, optimisticData: {addOptimisticData: addOptimisticDream}}} = useDreamsData()
    const {trigger: createDraft} = CreateDraftDream()
    const [modalOpen, setModalOpen] = useState(false)
    const [draftDream, setDraftDream] = useState<Dream>()

    const createDraftAndHandleOptimistic = useCallback(async () => {
        const create = () => createDraft()
            .then(res => {
                const draftDream = res.data!
                setDraftDream(draftDream)
                return draftDream
            })
            .catch(handleAxiosError)

        if (addOptimisticDream) {
            const draftCount = dreams.filter(dream => dream.isDraft).length
            const optimisticDream = {
                id: '',
                title: `Draft Dream #${draftCount + 1}`,
                description: "",
                userId: "",
                comments: "",
                draftTags: [],
                draftCharacters: [],
                isDraft: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            setDraftDream(optimisticDream)
            await addOptimisticDream(create, optimisticDream, {
                    revalidate: true
                }
            )
        }
    }, [addOptimisticDream, createDraft, dreams])

    return (
        <Fragment>
            <DreamLogFormProvider>
                <LogDreamModal
                    draftDream={draftDream}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            </DreamLogFormProvider>
            <Card
                onPress={() => {
                    if (!isDisabled) {
                        createDraftAndHandleOptimistic()
                        setModalOpen(true)
                    }
                }}
                isPressable={!isDisabled}
                classNames={{
                    base: clsx("bg-primary rounded-3xl text-light hover:scale-105", className),
                    body: "py-8"
                }}
            >
                <CardBody>
                    <div className="flex gap-4">
                        <CloudIcon width={36}/>
                        <h3 className="font-semibold text-2xl phone:text-medium self-center">{content ?? "Log A New Dream"}</h3>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default LogDreamCard