"use client"

import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import AddTagForm from "@/app/(site)/(internal)/dashboard/components/dreams/forms/tags/AddTagForm";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

const AddTagModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Tag"
        >
            <AddTagForm onSuccess={onClose} />
        </Modal>
    )
}

export default AddTagModal