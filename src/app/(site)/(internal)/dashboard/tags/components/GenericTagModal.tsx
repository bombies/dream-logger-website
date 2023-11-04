"use client"

import {FC, Fragment, useCallback, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {DreamCharacter, DreamTag} from "@prisma/client";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {Chip} from "@nextui-org/chip";
import useSWR from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {DreamWithRelations} from "@/app/api/me/dreams/dreams.dto";
import EditableInput from "@/app/(site)/components/inputs/editable/EditableInput";
import {EditIcon} from "@nextui-org/shared-icons";
import {Spacer} from "@nextui-org/react";
import GenericTagDreamContainer from "@/app/(site)/(internal)/dashboard/tags/components/GenericTagDreamContainer";

type Props = {
    isOpen?: boolean,
    onClose?: () => void,
    item: DreamTag | DreamCharacter,
    itemType: "tags" | "characters",
}

const FetchDreams = (item: DreamTag | DreamCharacter, stateType: "tags" | "characters", isOpen?: boolean) => {
    return useSWR(
        isOpen && ('/api/me/dreams?' + (stateType === "tags" ? new URLSearchParams({tags: [item.id].toString()}) : new URLSearchParams({characters: [item.id].toString()}))),
        fetcher<DreamWithRelations[] | null>
    )
}

const GenericTagModal: FC<Props> = ({isOpen, onClose, item, itemType}) => {
    const {data: dreams} = FetchDreams(item, itemType, isOpen)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const getItemName = useCallback(() => itemType === "tags" ? (item as DreamTag).tag : (item as DreamCharacter).name, [item, itemType])

    return (
        <Fragment>
            <ConfirmationModal
                title="Delete Tag"
                size="xl"
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
            >
                <p className="break-all">Are you sure you want to
                    delete <Chip variant="flat">
                        {getItemName()}
                    </Chip>?</p>
            </ConfirmationModal>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="2xl"
                title={getItemName()}
                subtitle={`Created on ${new Date(item.createdAt.toString()).toLocaleDateString("en-us", {
                    dateStyle: "medium"
                })} at ${new Date(item.createdAt.toString()).toLocaleTimeString("en-us", {
                    timeStyle: "short"
                })}`}
            >
                <div>
                    <div className="bg-[#0C0015] p-8 rounded-3xl">
                        <h4 className="text-subtext font-semibold mb-2">NAME</h4>
                        <EditableInput
                            isEditable
                            isRequired
                            value={getItemName()}
                            minLength={1}
                            maxLength={64}
                            size="md"
                            onEdit={async (newValue) => {
                                if (!newValue)
                                    return
                            }}
                        >
                            <p className="flex justify-between gap-2">{getItemName()}
                                <span className="self-center">
                                    <EditIcon/>
                                </span>
                            </p>
                        </EditableInput>
                    </div>
                    {
                        (dreams && dreams.length > 0) && (
                            <Fragment>
                                <Spacer y={6}/>
                                <GenericTagDreamContainer dreams={dreams}/>
                            </Fragment>

                        )
                    }
                    <Divider className="my-6"/>
                    <div className="flex gap-4 justify-end">
                        <Button
                            onPress={() => setDeleteModalOpen(true)}
                            startContent={<TrashIcon/>}
                            color="danger"
                        >Delete Tag</Button>
                    </div>
                </div>
            </Modal>
        </Fragment>

    )
}

export default GenericTagModal