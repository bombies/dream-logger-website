"use client"

import {FC, Fragment, useEffect, useMemo, useState} from "react";
import {Dream} from "@prisma/client";
import {DreamWithRelations, PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import {calcEstimatedReadingTime, fetcher} from "@/utils/client/client-utils";
import useSWR from "swr";
import {Chip} from "@nextui-org/chip";
import EditableInput from "@/app/(site)/components/EditableInput";
import {Button} from "@nextui-org/button";

type Props = {
    dream: Dream,
    fetchDream?: boolean,
    onEdit?: (dto: PatchDreamDto) => void
}

const FetchFullDream = (dream: Dream, doFetch: boolean) => {
    return useSWR(doFetch && `/api/me/dreams/${dream.id}?tags=true&characters=true`, fetcher<DreamWithRelations | null>, {refreshInterval: 0})
}

const DreamView: FC<Props> = ({dream, fetchDream, onEdit}) => {
    const {data: fullDream, error: fullDreamError} = FetchFullDream(dream, fetchDream ?? true)
    const [editMode, setEditMode] = useState(false)

    const tagChips = useMemo(() => fullDream?.tags?.map(tag => (
        <Chip key={tag.id} color="primary" variant="flat" size="sm">
            {tag.tag}
        </Chip>
    )), [fullDream?.tags])

    useEffect(() => {
        if (fullDreamError)
            console.error(fullDreamError)
    }, [fullDreamError])

    return (
        <Fragment>
            <Button onPress={() => setEditMode(prev => !prev)}>
                Toggle Edit Mode
            </Button>
            {(tagChips || fullDreamError) && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {tagChips ?? (fullDreamError &&
                        <Chip color="danger" variant="flat" size="sm">
                            Error Loading Tags
                        </Chip>
                    )}
                </div>
            )}
            <EditableInput
                isEditable={editMode}
                label="Edit Dream Title"
                value={dream.title}
                onEdit={(value) => {
                    console.log(value)
                }}
            >
                <h1 className="text-4xl phone:text-2xl font-bold">{dream.title}</h1>
            </EditableInput>
            <h3 className="text-subtext text-sm font-semibold italic">{dream.comments}</h3>
            <h3 className="text-subtext text-xs italic">~{calcEstimatedReadingTime(dream.description)} min.
                read</h3>
            <article
                className="text-[#EAE0FF] phone:text-sm whitespace-pre-wrap rounded-3xl border border-primary/40 bg-[#0C0015]/50 p-6 mt-6">{dream.description}</article>
        </Fragment>
    )
}

export default DreamView