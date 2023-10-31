"use client"

import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Input, {InputProps} from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import {SubmitHandler, useForm} from "react-hook-form";
import CheckIcon from "@/app/(site)/components/icons/CheckIcon";
import CloseIcon from "@/app/(site)/components/icons/CloseIcon";

type FormProps = {
    value: string
}

type Props = {
    isEditable?: boolean,
    value?: string,
    onEdit?: (value?: string) => void,
} & Pick<InputProps, "classNames" | "placeholder" | "label" | "size" | "isRequired" | "maxLength" | "minLength" | "validate"> & PropsWithChildren

const EditableInput: FC<Props> = ({isEditable, value, children, onEdit, ...inputProps}) => {
    const {register, handleSubmit} = useForm<FormProps>()
    const [currentValue, setCurrentValue] = useState(value ?? "")
    const [editToggled, setEditToggled] = useState(false)

    useEffect(() => {
        if (isEditable)
            setCurrentValue(value ?? "")
        else setEditToggled(false)
    }, [isEditable, value])

    const onSubmit: SubmitHandler<FormProps> = useCallback((data, e) => {
        if (inputProps.validate && !inputProps.validate.predicate(data.value))
            return;

        if (data.value === value)
            return setEditToggled(false)

        if (onEdit)
            onEdit(data.value.length === 0 ? undefined : data.value)
        setEditToggled(false)
        setCurrentValue(value ?? "")
    }, [inputProps.validate, onEdit, value])

    return (
        <AnimatePresence>
            {isEditable ? (editToggled ?
                    <motion.form
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 1}}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            {...inputProps}
                            register={register}
                            id={"value"}
                            value={currentValue}
                            onValueChange={setCurrentValue}
                            endContent={
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
                            }
                        />

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

export default EditableInput