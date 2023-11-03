import {DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import PlusIcon from "@/app/(site)/components/icons/PlusIcon";
import Dropdown from "@/app/(site)/components/Dropdown";
import {CollectionElement} from "@react-types/shared";

type Props<T extends object> = {
    items: T[]
    idArray: string[],
    editCallback: (dto: {
        arr: string[],
        newArr: string[]
    }) => void,
    renderItem: (item: T) => CollectionElement<any>
}

export default function DreamEditableAddButton<T extends object>({
                                                                     items,
                                                                     idArray,
                                                                     editCallback,
                                                                     renderItem
                                                                 }: Props<T>) {
    return (
        <Dropdown
            size="sm"
            className={"border font-semibold border-primary/30 px-4 py-6 bg-gradient-to-b from-[#8F00FF30] to-[#27007940] backdrop-blur-md"}
        >
            <DropdownTrigger>
                <Button
                    color="primary"
                    className="rounded-full"
                    size="sm"
                    isIconOnly
                    variant="flat"
                >
                    <PlusIcon/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dream Characters"
                items={items}
                itemClasses={{
                    base: "max-w-xs data-[hover=true]:bg-primary/30"
                }}
                onAction={(key) => {
                    editCallback({
                        newArr: [...idArray, key as string],
                        arr: idArray
                    })
                }}
            >
                {(item) => renderItem(item as T)}
            </DropdownMenu>
        </Dropdown>
    )
}