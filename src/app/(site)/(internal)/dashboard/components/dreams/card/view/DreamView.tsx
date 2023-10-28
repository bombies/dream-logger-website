"use client"

import {FC, Fragment, useCallback, useEffect, useMemo, useState} from "react";
import {Dream, DreamCharacter, DreamTag} from "@prisma/client";
import {PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import {calcEstimatedReadingTime, handleAxiosError,} from "@/utils/client/client-utils";
import {Chip} from "@nextui-org/chip";
import EditableInput from "@/app/(site)/components/inputs/editable/EditableInput";
import {Button} from "@nextui-org/button";
import {EditIcon} from "@nextui-org/shared-icons";
import toast from "react-hot-toast";
import EditableTextArea from "@/app/(site)/components/inputs/editable/EditableTextArea";
import DreamEditableChip from "@/app/(site)/(internal)/dashboard/components/dreams/card/view/DreamEditableChip";
import {DropdownItem, Spacer} from "@nextui-org/react";
import DreamEditableAddButton
    from "@/app/(site)/(internal)/dashboard/components/dreams/card/view/DreamEditableAddButton";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import {FetchFullDream, UpdateDream} from "../../hooks/dream-api-utils";

type Props = {
    dream: Dream,
    allCharacters: DreamCharacter[],
    allTags: DreamTag[]
    fetchDream?: boolean,
}

const DreamView: FC<Props> = ({dream, allTags, allCharacters, fetchDream}) => {
    const {data: fullDream, error: fullDreamError, mutate: mutateFullDream} = FetchFullDream(dream, fetchDream ?? true)
    const {trigger: updateDream} = UpdateDream(dream.id)
    const {dreams: {optimisticData: {editOptimisticData}}} = useDreamsData()

    const [editMode, setEditMode] = useState(false)
    const dreamTagIds = useMemo(() => fullDream?.tags?.map(tag => tag.id) ?? [], [fullDream?.tags])
    const dreamCharacterIds = useMemo(() => fullDream?.characters?.map(character => character.id) ?? [], [fullDream?.characters])

    const doUpdate = useCallback((body: PatchDreamDto) => (
        updateDream({body})
            .then(res => res.data)
            .catch(handleAxiosError)
    ), [updateDream])

    const update = useCallback(async (body: PatchDreamDto) => {
        const {newTags, tags, newCharacters, characters, ...restBody} = body
        const newDream = {...dream}

        for (let key in restBody)
            // TypeScript sucks sometimes...
            if (restBody[key as keyof Pick<PatchDreamDto, "title" | "description" | "comments">] !== undefined)
                newDream[key as "title" | "description" | "comments"] = restBody[key as keyof Pick<PatchDreamDto, "title" | "description" | "comments">] as string

        if (editOptimisticData)
            editOptimisticData(() => doUpdate(body), newDream)

        if (newCharacters && fullDream)
            await mutateFullDream({
                ...fullDream,
                characters: allCharacters.filter(char => newCharacters.some(newCharId => newCharId === char.id))
            })

        if (newTags && fullDream)
            await mutateFullDream({
                ...fullDream,
                tags: allTags.filter(tag => newTags.some(newTagId => newTagId === tag.id))
            })
    }, [allCharacters, allTags, doUpdate, dream, editOptimisticData, fullDream, mutateFullDream])

    const tagChips = useMemo(() => fullDream?.tags?.map(tag => (
        <DreamEditableChip
            key={tag.id}
            editMode={editMode}
            id={tag.id}
            value={tag.tag}
            idArray={dreamTagIds}
            editCallback={async (dto) => {
                await update({
                    newTags: dto.newArr,
                    tags: dto.arr
                })
            }}
        />
    )), [dreamTagIds, editMode, fullDream?.tags, update])

    const characterChips = useMemo(() => fullDream?.characters?.map(character => (
        <DreamEditableChip
            key={character.id}
            editMode={editMode}
            id={character.id}
            value={character.name}
            idArray={dreamCharacterIds}
            editCallback={async (dto) => {
                await update({
                    newCharacters: dto.newArr,
                    characters: dto.arr
                })
            }}
        />
    )), [dreamCharacterIds, editMode, fullDream?.characters, update])

    useEffect(() => {
        if (fullDreamError)
            console.error(fullDreamError)
    }, [fullDreamError])

    return (
        <Fragment>
            <div className="flex w-full gap-6 justify-between">
                {(tagChips || fullDreamError) && (
                    <div className="flex flex-col items-center justify-center">
                        {editMode && (
                            <div className="flex self-start gap-2">
                                <h3 className="font-semibold text-lg mb-4">Tags</h3>
                                <DreamEditableAddButton
                                    items={allTags.filter(tag => !fullDream?.tags?.some(addedTag => addedTag.id === tag.id))}
                                    idArray={dreamTagIds}
                                    editCallback={async ({newArr, arr}) => {
                                        await update({
                                            newTags: newArr,
                                            tags: arr,
                                        })
                                    }}
                                    renderItem={(item) => (
                                        <DropdownItem
                                            key={item.id}
                                        >
                                            {item.tag}
                                        </DropdownItem>
                                    )}
                                />
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2">
                            {tagChips ?? (fullDreamError &&
                                <Chip color="danger" variant="flat" size="sm">
                                    Error Loading Tags
                                </Chip>
                            )}
                        </div>
                    </div>
                )}
                <div className="flex flex-shrink justify-end">
                    <Button
                        isIconOnly
                        variant="light"
                        onPress={() => {
                            setEditMode(prev => !prev)
                            if (!editMode)
                                toast("Edit mode enabled!", {
                                    icon: <EditIcon/>
                                })
                            else
                                toast("Edit mode disabled!", {
                                    icon: <EditIcon/>
                                })
                        }}>
                        <EditIcon/>
                    </Button>
                </div>
            </div>
            <EditableInput
                isRequired
                isEditable={editMode}
                label="Edit Dream Title"
                size="lg"
                value={dream.title}
                onEdit={async (value) => {
                    if (value == undefined)
                        return;

                    await update({title: value})
                }}
            >
                <h1 className="text-4xl phone:text-2xl font-bold">{dream.title}</h1>
            </EditableInput>
            {dream.comments && (
                <EditableInput
                    isEditable={editMode}
                    label="Edit Dream Comment"
                    value={dream.comments}
                    size="sm"
                    onEdit={(value) => {
                        update({comments: value ?? null})
                    }}
                >
                    <h3 className="text-subtext text-sm font-semibold italic">{dream.comments}</h3>
                </EditableInput>
            )}
            <h3 className="text-subtext text-xs italic">~{calcEstimatedReadingTime(dream.description)} min.
                read</h3>

            <EditableTextArea
                isRequired
                isEditable={editMode}
                label="Edit Dream"
                value={dream.description}
                size="md"
                onEdit={async (value) => {
                    if (value == undefined)
                        return;

                    await update({description: value})
                }}
            >
                <article
                    className="text-[#EAE0FF] phone:text-sm whitespace-pre-wrap rounded-3xl border border-primary/40 bg-[#0C0015]/50 p-6 mt-6">
                    {dream.description}
                </article>
            </EditableTextArea>
            {(editMode || characterChips) && (
                <Fragment>
                    <Spacer y={6}/>
                    <h3 className="font-semibold text-lg">Characters</h3>
                </Fragment>
            )}
            <div className="flex gap-2 items-center">
                {(characterChips || fullDreamError) && (
                    <Fragment>
                        <div className="flex flex-wrap max-w-1/2 gap-2">
                            {characterChips ?? (fullDreamError &&
                                <Chip color="danger" variant="flat" size="sm">
                                    Error Loading Tags
                                </Chip>
                            )}
                        </div>
                    </Fragment>
                )}
                {editMode && (
                    <DreamEditableAddButton
                        items={allCharacters.filter(character => !fullDream?.characters?.some(addedCharacter => addedCharacter.id === character.id))}
                        idArray={dreamCharacterIds}
                        editCallback={async ({newArr, arr}) => {
                            await update({
                                newCharacters: newArr,
                                characters: arr,
                            })
                        }}
                        renderItem={(item) => (
                            <DropdownItem
                                key={item.id}
                            >
                                {item.name}
                            </DropdownItem>
                        )}
                    />
                )}
            </div>
        </Fragment>
    )
}

export default DreamView