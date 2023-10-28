"use client"

import {FC, useMemo} from "react";
import {Textarea, TextAreaProps} from "@nextui-org/input";
import {UseFormRegister} from "react-hook-form";

type Props = {
    register?: UseFormRegister<any>,
} & TextAreaProps

const TextArea: FC<Props> = ({register, id, classNames, ...props}) => {
    const defAttributes: TextAreaProps = useMemo(() => ({
        id,
        color: "primary",
        size: "lg",
        classNames: {
            inputWrapper: "h-fit py-2 bg-[#9E23FF1A]/10 border-1 border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20",
            input: "text-[#EAE0FF]",
            label: "text-lg text-[#EAE0FF]",
            ...classNames
        },
        ...props
    }), [classNames, id, props])
    
    return register && id ? (
        <Textarea
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        />
    ) : <Textarea {...defAttributes} />
}

export default TextArea