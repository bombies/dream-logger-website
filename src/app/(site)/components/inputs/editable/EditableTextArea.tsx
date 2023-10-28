"use client"

import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@nextui-org/button";
import {SubmitHandler, useForm} from "react-hook-form";
import CheckIcon from "@/app/(site)/components/icons/CheckIcon";
import CloseIcon from "@/app/(site)/components/icons/CloseIcon";
import {TextAreaProps} from "@nextui-org/input";
import TextArea from "@/app/(site)/components/inputs/TextArea";
import {Divider} from "@nextui-org/divider";

type FormProps = {
    value: string
}

type Props = {
    isEditable?: boolean,
    value?: string,
    onEdit?: (value?: string) => void,
} & Pick<TextAreaProps, "classNames" | "placeholder" | "label" | "size" | "isRequired"> & PropsWithChildren

const EditableTextArea: FC<Props> = ({isEditable, value, children, onEdit, ...inputProps}) => {
    const {register, handleSubmit} = useForm<FormProps>()
    const [currentValue, setCurrentValue] = useState(value ?? "")
    const [editToggled, setEditToggled] = useState(false)

    useEffect(() => {
        if (isEditable)
            setCurrentValue(value ?? "")
        else setEditToggled(false)
    }, [isEditable, value])

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        if (data.value === value)
            return setEditToggled(false)

        if (onEdit)
            onEdit(data.value.length === 0 ? undefined : data.value)
        setEditToggled(false)
        setCurrentValue(value ?? "")
    }, [onEdit, value])

    return (
        <AnimatePresence>
            {isEditable ? (editToggled ?
                    <motion.form
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 1}}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextArea
                            {...inputProps}
                            register={register}
                            id={"value"}
                            value={currentValue}
                            onValueChange={setCurrentValue}
                            maxRows={Infinity}
                        />
                        <Divider className="my-3"/>
                        <div className="flex gap-2">
                            <Button
                                isIconOnly
                                color="success"
                                variant="light"
                                type="submit"
                            >
                                <CheckIcon/>
                            </Button>
                            <Button
                                isIconOnly
                                color="danger"
                                variant="light"
                                onPress={() => {
                                    setEditToggled(false)
                                    setCurrentValue(value ?? "")
                                }}
                            >
                                <CloseIcon/>
                            </Button>
                        </div>
                    </motion.form>
                    :
                    <motion.div
                        className="cursor-pointer"
                        onClick={() => setEditToggled(true)}
                        initial={{
                            color: "#EAE0FF"
                        }}
                        whileHover={{
                            color: "#9E23FF"
                        }}
                    >
                        {children}
                    </motion.div>
            ) : (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 1}}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default EditableTextArea