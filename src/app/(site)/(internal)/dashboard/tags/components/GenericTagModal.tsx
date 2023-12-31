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
import {deleteMutator, fetcher, handleAxiosError, patchMutator} from "@/utils/client/client-utils";
import {DreamWithRelations, PatchDreamCharacterDto, PatchDreamTagDto} from "@/app/api/me/dreams/dreams.dto";
import EditableInput from "@/app/(site)/components/inputs/editable/EditableInput";
import {EditIcon} from "@nextui-org/shared-icons";
import {Spacer} from "@nextui-org/react";
import GenericTagDreamContainer from "@/app/(site)/(internal)/dashboard/tags/components/GenericTagDreamContainer";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import useSWRMutation from "swr/mutation";

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

const DeleteDreamMeta = (item: DreamTag | DreamCharacter, stateType: "tags" | "characters") => {
    return useSWRMutation(`/api/me/dreams/${stateType}/${item.id}`, deleteMutator<DreamTag | DreamCharacter>())
}

const UpdateDreamMeta = (item: DreamTag | DreamCharacter, stateType: "tags" | "characters") => {
    return useSWRMutation(`/api/me/dreams/${stateType}/${item.id}`, patchMutator<PatchDreamTagDto | PatchDreamCharacterDto, DreamTag | DreamCharacter>())
}

const GenericTagModal: FC<Props> = ({isOpen, onClose, item, itemType}) => {
    const {tags: {optimisticData: optimisticTagData}, characters: {optimisticData: optimisticCharacterData}} = useDreamsData()
    const {data: dreams} = FetchDreams(item, itemType, isOpen)
    const {trigger: deleteDreamMetaItem} = DeleteDreamMeta(item, itemType)
    const {trigger: updateDreamMetaItem} = UpdateDreamMeta(item, itemType)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const getItemName = useCallback(() => itemType === "tags" ? (item as DreamTag).tag : (item as DreamCharacter).name, [item, itemType])

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete ${itemType === "tags" ? "Tag" : "Character"}`}
                size="xl"
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const deleteItem = () => deleteDreamMetaItem()
                        .then((res) => res.data)
                        .catch(handleAxiosError)

                    if (itemType === "tags" && optimisticTagData.removeOptimisticData)
                        await optimisticTagData.removeOptimisticData(deleteItem as () => Promise<DreamTag>, item as DreamTag)
                    else if (itemType === "characters" && optimisticCharacterData.removeOptimisticData)
                        await optimisticCharacterData.removeOptimisticData(deleteItem as () => Promise<DreamCharacter>, item as DreamCharacter)
                }}
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
                    <div className="border border-primary dark:border-none bg-light dark:bg-secondary p-8 rounded-3xl">
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

                                const updateItem = () => updateDreamMetaItem({
                                    body: itemType === "tags" ? {
                                        tag: newValue.toLowerCase()
                                    } : {
                                        name: newValue.toLowerCase()
                                    }
                                })
                                    .then((res) => res.data)
                                    .catch(handleAxiosError)

                                if (itemType === "tags" && optimisticTagData.editOptimisticData) {
                                    await optimisticTagData.editOptimisticData(updateItem as () => Promise<DreamTag>, {
                                        ...item,
                                        tag: newValue.toLowerCase()
                                    } as DreamTag)
                                } else if (itemType === "characters" && optimisticCharacterData.editOptimisticData) {
                                    await optimisticCharacterData.editOptimisticData(updateItem as () => Promise<DreamCharacter>, {
                                        ...item,
                                        name: newValue.toLowerCase()
                                    } as DreamCharacter)
                                }
                            }}
                        >
                            <p className="flex justify-between gap-2 break-all text-dark dark:text-light">{getItemName()}
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