import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import LogDreamForm from "@/app/(site)/(internal)/dashboard/components/dreams/forms/log/LogDreamForm";

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

const LogDreamModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Log A New Dream"
            subtitle="Had a new dream huh?"
            size="3xl"
        >
            <LogDreamForm
                onForget={onClose}
                onCreate={onClose}
            />
        </Modal>
    )
}

export default LogDreamModal