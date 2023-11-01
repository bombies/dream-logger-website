"use client"

import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import AddTagForm from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/tags/AddTagForm";
import AddCharacterForm from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/characters/AddCharacterForm";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

const AddCharacterModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            size="xl"
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Character"
        >
            <AddCharacterForm onSuccess={onClose} />
        </Modal>
    )
}

export default AddCharacterModal