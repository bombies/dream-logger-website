"use memo"
import {useMemo} from "react";
import {SelectProps, Select as NextSelect} from "@nextui-org/react";
import {UseFormRegister} from "react-hook-form";

type Props<T> = {
    register?: UseFormRegister<any>,
} & SelectProps<T>

export default function Select<T>({classNames, listboxProps, popoverProps, children, id, register, ...props}: Props<T>) {
    // @ts-ignore
    const defAttributes: SelectProps<T> = useMemo(() => ({
        id,
        color: "primary",
        size: "lg",
        classNames: {
            trigger: "h-fit py-6 bg-[#9E23FF1A]/10 border-1 border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20",
            input: "text-[#EAE0FF]",
            label: "text-lg text-[#EAE0FF]",
            ...classNames
        },
        listboxProps: {
            ...listboxProps,
            itemClasses: {
                base: [
                    "data-[hover=true]:!bg-primary/40",
                    "data-[selectable=true]:focus:bg-primary/30",
                    "p-3",
                ],
                ...listboxProps?.itemClasses
            }
        },
        popoverProps: {
            ...popoverProps,
            classNames: {
                base: [
                    "bg-[#9E23FF1A]/10 border-1 border-[#3E0070] backdrop-blur-md"
                ],
                ...popoverProps?.classNames
            }
        },
        ...props
    }), [classNames, id, listboxProps, popoverProps, props])
    
    return register && id ? (
        <NextSelect
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        >
            {children}
        </NextSelect>
    ) : (
        <NextSelect
            {...defAttributes}
        >
            {children}
        </NextSelect>
    )
}