import {FC, PropsWithChildren, ReactElement} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import CheckIcon from "@/app/(site)/components/icons/CheckIcon";
import CloseIcon from "@/app/(site)/components/icons/CloseIcon";

type Props = {
    title?: string
    size?: "lg" | "xl" | "2xl"
    onAccept?: () => void,
    onReject?: () => void,
    isOpen?: boolean,
} & PropsWithChildren

const ConfirmationModal: FC<Props> = ({title, children, size, isOpen, onAccept, onReject}) => {
    return (
        <Modal
            placement="center"
            size={size}
            title={title}
            isOpen={isOpen}
            onClose={onReject}
            isDismissable={false}
        >
            {children}
            <Divider className="my-6" />
            <div className="flex justify-end gap-4">
                <Button
                    color="primary"
                    variant="flat"
                    onPress={onAccept}
                    startContent={<CheckIcon />}
                >
                    I&apos;m sure
                </Button>
                <Button
                    color="danger"
                    variant="shadow"
                    onPress={onReject}
                    startContent={<CloseIcon />}
                >
                    Nevermind
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal