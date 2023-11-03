"use memo"
import {useMemo} from "react";
import {Autocomplete ,AutocompleteProps} from "@nextui-org/react";
import {UseFormRegister} from "react-hook-form";

type Props<T> = {
    register?: UseFormRegister<any>,
} & AutocompleteProps<T>

export default function AutoComplete<T>({
                                      classNames,
                                      listboxProps,
                                      popoverProps,
                                      children,
                                      id,
                                      register,
                                      ...props
                                  }: Props<T>) {
    // @ts-ignore
    const defAttributes: AutocompleteProps<T> = useMemo(() => ({
        id,
        color: "primary",
        size: "lg",
        className: "h-fit rounded-xl bg-[#9E23FF1A]/10 border-1 border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20",
        classNames: {
            // trigger: clsx("h-fit rounded-xl bg-[#9E23FF1A]/10 border-1 border-[#3E0070] hover:!bg-[#9E23FF1A]/20 focus-within:!bg-[#9E23FF1A]/20", classNames?.trigger),
            // label: clsx("text-lg text-[#EAE0FF]", classNames?.label),
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
                content: "bg-secondary/90 border-1 border-[#3E0070] backdrop-blur-md",
                ...popoverProps?.classNames
            }
        },
        ...props
    }), [id, listboxProps, popoverProps, props])

    return register && id ? (
        <Autocomplete
            {...register(id, {required: props.required || props.isRequired})}
            {...defAttributes}
        >
            {children}
        </Autocomplete>
    ) : (
        <Autocomplete
            {...defAttributes}
        >
            {children}
        </Autocomplete>
    )
}