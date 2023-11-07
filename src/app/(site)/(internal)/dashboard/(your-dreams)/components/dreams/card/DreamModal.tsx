"use client"

import {FC, Fragment, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Dream} from "@prisma/client";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/react";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import DreamView from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/view/DreamView";

type Props = {
    dream: Dream,
    isOpen?: boolean,
    onClose?: () => void,
    onDelete?: () => void,
}


const DreamModal: FC<Props> = ({dream, isOpen, onClose, onDelete}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete Dream`}
                size="xl"
                isOpen={deleteModalOpen}
                onAccept={() => {
                    if (onDelete)
                        onDelete()
                    setDeleteModalOpen(false)
                }}
                onReject={() => setDeleteModalOpen(false)}
            >
                Are you sure you want to delete this dream?
            </ConfirmationModal>
            <Modal
                size="2xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <DreamView
                    dream={dream}
                    fetchDream={isOpen}
                />
                <Divider className="my-6"/>
                <div className="flex justify-end">
                    <Button
                        fullWidth={false}
                        size="lg"
                        color="danger"
                        variant="flat"
                        onPress={() => setDeleteModalOpen(true)}
                        startContent={<TrashIcon width={18}/>}
                    >
                        Delete Dream
                    </Button>
                </div>
            </Modal>
        </Fragment>

    )
}

export default DreamModal