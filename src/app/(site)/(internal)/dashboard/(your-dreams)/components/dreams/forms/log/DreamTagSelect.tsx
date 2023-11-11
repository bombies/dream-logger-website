"use client"

import {FC, Fragment} from "react";
import Button from "@/app/(site)/components/Button";
import Select from "@/app/(site)/components/inputs/Select";
import {Chip} from "@nextui-org/chip";
import {SelectItem} from "@nextui-org/react";
import {UseFormRegister} from "react-hook-form";
import {DreamTagsState} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreamTags";
import PlusIcon from "@/app/(site)/components/icons/PlusIcon";

type Props = {
    register?: UseFormRegister<any>,
    tags: DreamTagsState,
    isDisabled?: boolean,
    onModalOpen?: () => void,
    placeholder?: string,
    label?: string,
    value?: string[],
    onTagSelect?: (tagIds: string[]) => void,
}

const DreamTagSelect: FC<Props> = ({
                                       value,
                                       onTagSelect,
                                       onModalOpen,
                                       isDisabled,
                                       tags,
                                       register,
                                       label,
                                       placeholder
                                   }) => {
    return (
        <Fragment>
            {onModalOpen && (
                <div className="flex gap-4 mb-2">
                    <label className="text-lg phone:text-medium self-center">Dream Tags</label>
                    <Button
                        color="cta"
                        size="sm"
                        onPress={onModalOpen}
                        startContent={<PlusIcon width={20}/>}
                        isDisabled={isDisabled}
                    >
                        Add New Tag
                    </Button>
                </div>
            )}
            <Select
                selectedKeys={value}
                onSelectionChange={(selection) => {
                    const keys = Array.from(selection) as string[]
                    if (onTagSelect)
                        onTagSelect(keys)
                }}
                isDisabled={isDisabled}
                aria-label="Dream Tags"
                register={register}
                id="tags"
                items={tags.data.sort((a, b) => a.tag.localeCompare(b.tag))}
                placeholder={placeholder ?? "Describe your dream with one or two words"}
                label={label}
                selectionMode={"multiple"}
                renderValue={(items) => {
                    return (
                        <div className="flex gap-2">
                            {items.map(character => (
                                <Chip
                                    key={character.key}
                                    color="primary"
                                    variant="flat"
                                    className="max-w-[6rem]"
                                    classNames={{
                                        content: "overflow-ellipsis whitespace-nowrap overflow-hidden"
                                    }}
                                >
                                    {character.data?.tag}
                                </Chip>
                            ))}
                        </div>
                    )
                }}
            >
                {(tag) => (
                    <SelectItem
                        key={tag.id}
                        value={tag.id}
                        classNames={{
                            title: "capitalize"
                        }}
                    >
                        {tag.tag}
                    </SelectItem>
                )}
            </Select>
        </Fragment>
    )
}

export default DreamTagSelect