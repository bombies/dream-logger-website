"use client"

import {FC, Fragment, useEffect, useMemo, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Dream} from "@prisma/client";
import useSWR from "swr";
import {calcEstimatedReadingTime, fetcher} from "@/utils/client/client-utils";
import {DreamWithRelations} from "@/app/api/me/dreams/dreams.dto";
import {Chip} from "@nextui-org/chip";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/react";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";

type Props = {
    dream: Dream,
    isOpen?: boolean,
    onClose?: () => void,
    onDelete?: () => void,
}

const FetchFullDream = (dream: Dream, modalOpen: boolean) => {
    return useSWR(modalOpen && `/api/me/dreams/${dream.id}?tags=true&characters=true`, fetcher<DreamWithRelations | null>, {refreshInterval: 0})
}

const DreamModal: FC<Props> = ({dream, isOpen, onClose, onDelete}) => {
    const {data: fullDream, error: fullDreamError} = FetchFullDream(dream, isOpen ?? false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const tagChips = useMemo(() => fullDream?.tags?.map(tag => (
        <Chip key={tag.id} color="primary" variant="flat" size="sm">
            {tag.tag}
        </Chip>
    )), [fullDream?.tags])

    useEffect(() => {
        if (fullDreamError)
            console.error(fullDreamError)
    }, [fullDreamError])

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete Dream`}
                size="xl"
                isOpen={deleteModalOpen}
                onAccept={onDelete}
                onReject={() => setDeleteModalOpen(false)}
            >
                Are you sure you want to delete this dream?
            </ConfirmationModal>
            <Modal
                size="2xl"
                header={
                    <Fragment>
                        {(tagChips || fullDreamError) && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tagChips ?? (fullDreamError &&
                                    <Chip color="danger" variant="flat" size="sm">
                                        Error Loading Tags
                                    </Chip>
                                )}
                            </div>
                        )}
                        <h1 className="text-4xl phone:text-2xl">{dream.title}</h1>
                        <h3 className="text-subtext text-sm font-semibold italic">{dream.comments}</h3>
                        <h3 className="text-subtext text-xs italic">~{calcEstimatedReadingTime(dream.description)} min.
                            read</h3>
                    </Fragment>
                }
                isOpen={isOpen}
                onClose={onClose}
            >
                <article
                    className="text-[#EAE0FF] phone:text-sm whitespace-pre-wrap rounded-3xl border border-primary/40 bg-[#0C0015]/50 p-6">{dream.description}</article>
                <Divider className="my-6"/>
                <div className="flex justify-end">
                    <Button
                        fullWidth={false}
                        size="lg"
                        color="danger"
                        variant="flat"
                        onPress={() => setDeleteModalOpen(true)}
                        startContent={<TrashIcon width={18} />}
                    >
                        Delete Dream
                    </Button>
                </div>
            </Modal>
        </Fragment>

    )
}

export default DreamModal