"use client"

import {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react";
import {Input as NextInput, InputProps} from "@nextui-org/react";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import EyeCrossedIcon from "@/app/(site)/components/icons/EyeCrossedIcon";
import EyeIcon from "@/app/(site)/components/icons/EyeIcon";

type ValidationObject = {
    predicate: (value: string) => boolean,
    errorMsg: string,
}

export type ValidationErrors = {
    [T: string]: string | undefined
}

type Props = {
    register?: UseFormRegister<any>,
    errors?: FieldErrors,
    setValidationErrors?: Dispatch<SetStateAction<ValidationErrors>>
    validate?: ValidationObject
} & InputProps

const Input: FC<Props> = ({id, register, errors, setValidationErrors, type, validate, ...props}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [value, setValue] = useState(props.value ?? "");
    const [errMsg, setErrMsg] = useState<string>()

    useEffect(() => {
        if (props.value === undefined)
            setValue("")
        else setValue(props.value)
    }, [props.value]);

    useEffect(() => {
        if (!validate)
            return;

        let newErrMsg: string | undefined = undefined;
        const {predicate, errorMsg} = validate;
        if (!predicate(value)) {
            newErrMsg = errorMsg
            if (id && setValidationErrors)
                setValidationErrors(prev => ({
                    ...prev,
                    [id]: errorMsg
                }))
        } else if (id && setValidationErrors)
            setValidationErrors(prev => {
                const {[id]: omit, ...rest} = prev;
                return rest
            })
        setErrMsg(newErrMsg)
    }, [id, setValidationErrors, value])

    const defAttributes: InputProps = useMemo(() => ({
        id,
        color: "primary",
        size: "lg",
        classNames: {
            inputWrapper: "h-fit py-6 bg-[#9E23FF1A]/10 border-1 border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20",
            input: "text-[#EAE0FF]",
        },
        isInvalid: errMsg != undefined,
        endContent: type === "password" &&
            <div className="cursor-pointer" onClick={() => setPasswordVisible(prev => !prev)}>
                {passwordVisible ? <EyeCrossedIcon/> :
                    <EyeIcon/>}
            </div>,
        ...props,
        type: type === 'password' && passwordVisible ? "text" : type,
        errorMessage: errMsg,
        value,
        onValueChange: props.onValueChange ?? setValue
    }), [errMsg, id, passwordVisible, props, type, value])

    return register && id ? (
        <NextInput
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        />
    ) : <NextInput {...defAttributes} />
}

export default Input