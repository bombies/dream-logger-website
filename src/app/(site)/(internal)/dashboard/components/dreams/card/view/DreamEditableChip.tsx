"use client"

import {FC} from "react";
import {Chip} from "@nextui-org/chip";

type Props = {
    editMode: boolean,
    id: string,
    value: string,
    idArray: string[],
    editCallback: (dto: {
        arr: string[],
        newArr: string[]
    }) => void
}

const DreamEditableChip: FC<Props> = ({editMode, id, value, idArray, editCallback}) => {
    return (
        <Chip
            color="primary"
            variant="flat"
            onClose={editMode ? () => {
                editCallback({
                    arr: idArray ?? [],
                    newArr: idArray.filter(itemId => itemId !== id)
                })
            } : undefined}
            classNames={{
                base: "gap-2"
            }}
            size="sm"
        >
            {value}
        </Chip>
    )
}

export default DreamEditableChip