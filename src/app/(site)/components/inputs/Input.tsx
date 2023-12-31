"use client"

import {Dispatch, FC, SetStateAction, useEffect, useMemo, useState} from "react";
import {Input as NextInput, InputProps as NextInputProps} from "@nextui-org/react";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import EyeCrossedIcon from "@/app/(site)/components/icons/EyeCrossedIcon";
import EyeIcon from "@/app/(site)/components/icons/EyeIcon";
import clsx from "clsx";

type ValidationObject = {
    predicate: (value: string) => boolean,
    errorMsg: string,
}

export type ValidationErrors = {
    [T: string]: string | undefined
}

export type InputProps = {
    register?: UseFormRegister<any>,
    errors?: FieldErrors,
    setValidationErrors?: Dispatch<SetStateAction<ValidationErrors>>
    validation?: ValidationObject
} & NextInputProps

const Input: FC<InputProps> = ({classNames, id, register, errors, setValidationErrors, type, validation, ...props}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [value, setValue] = useState(props.value ?? "");
    const [errMsg, setErrMsg] = useState<string>()

    useEffect(() => {
        if (props.value === undefined)
            setValue("")
        else setValue(props.value)
    }, [props.value]);

    useEffect(() => {
        if (!validation)
            return;

        let newErrMsg: string | undefined = undefined;
        const {predicate, errorMsg} = validation;
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
            inputWrapper: clsx(
                "rounded-2xl bg-[#9E23FF1A]/10 border border-primary dark:border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20",
            ),
            input: "text-dark dark:text-light",
            label: clsx(
                "dark:text-light text-dark",
                // props.size === "sm" ? "text-sm" : (props.size === "md" ? "text-lg" : "text-xl")

            ),
            ...classNames
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
    }), [classNames, errMsg, id, passwordVisible, props, type, value])

    return register && id ? (
        <NextInput
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        />
    ) : <NextInput {...defAttributes} />
}

export default Input