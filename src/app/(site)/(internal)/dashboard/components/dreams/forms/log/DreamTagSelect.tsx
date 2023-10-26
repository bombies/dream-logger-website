"use client"

import {FC, Fragment, useState} from "react";
import Button from "@/app/(site)/components/Button";
import Select from "@/app/(site)/components/Select";
import {Chip} from "@nextui-org/chip";
import {SelectItem} from "@nextui-org/react";
import {UseFormRegister} from "react-hook-form";
import {DreamTagsState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreamTags";
import AddTagModal from "@/app/(site)/(internal)/dashboard/components/dreams/forms/tags/AddTagModal";
import PlusIcon from "@/app/(site)/components/icons/PlusIcon";

type Props = {
    register?: UseFormRegister<any>,
    tags: DreamTagsState
}

const DreamTagSelect: FC<Props> = ({tags, register}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <AddTagModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <div className="flex gap-4 mb-2">
                <label className="text-lg phone:text-medium text-[#EAE0FF] self-center">Dream Tags</label>
                <Button
                    color="cta"
                    size="sm"
                    onPress={() => setModalOpen(true)}
                    startContent={<PlusIcon width={20} />}
                >
                    Add New Tag
                </Button>
            </div>
            <Select
                aria-label="Dream Tags"
                register={register}
                id="tags"
                items={tags.data}
                placeholder="Describe your dream with one or two words"
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