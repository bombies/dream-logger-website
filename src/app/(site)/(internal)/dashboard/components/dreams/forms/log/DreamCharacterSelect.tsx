"use client"

import {FC, Fragment, useState} from "react";
import Button from "@/app/(site)/components/Button";
import Select from "@/app/(site)/components/inputs/Select";
import {Chip} from "@nextui-org/chip";
import {SelectItem} from "@nextui-org/react";
import {DreamCharactersState} from "@/app/(site)/(internal)/dashboard/components/dreams/hooks/useDreamCharacters";
import {UseFormRegister} from "react-hook-form";
import PlusIcon from "@/app/(site)/components/icons/PlusIcon";

type Props = {
    register?: UseFormRegister<any>,
    characters: DreamCharactersState,
    isDisabled?: boolean,
    onModalOpen?: () => void,
}

const DreamCharacterSelect: FC<Props> = ({onModalOpen, isDisabled, characters, register}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <div className="flex gap-4 mb-2">
                <label className="text-lg phone:text-medium text-[#EAE0FF] self-center">Dream Characters</label>
                <Button
                    color="cta"
                    size="sm"
                    onPress={onModalOpen}
                    isDisabled={isDisabled}
                    startContent={<PlusIcon width={20}/>}
                >
                    Add New Character
                </Button>
            </div>
            <Select
                isDisabled={isDisabled}
                aria-label="Dream Characters"
                register={register}
                id="characters"
                items={characters.data}
                placeholder="Who was in your dream?"
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
                                    {character.data?.name}
                                </Chip>
                            ))}
                        </div>
                    )
                }}
            >
                {(character) => (
                    <SelectItem
                        key={character.id}
                        value={character.id}
                        classNames={{
                            title: "capitalize"
                        }}
                    >
                        {character.name}
                    </SelectItem>
                )}
            </Select>
        </Fragment>
    )
}

export default DreamCharacterSelect