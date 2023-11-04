"use client"

import {FC, Fragment, useMemo} from "react";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import {DreamWithRelations} from "@/app/api/me/dreams/dreams.dto";
import {DreamCharacter, DreamTag} from "@prisma/client";
import DreamContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/DreamContainer";
import usePagination from "@/app/(site)/hooks/usePagination";
import {Spacer} from "@nextui-org/react";
import Pagination from "@/app/(site)/components/Pagination";

type Props = {
    dreams?: DreamWithRelations[] | null
    allCharacters: DreamCharacter[],
    allTags: DreamTag[],
}

const MAX_ITEMS_PER_PAGE = 5

const GenericTagDreamContainer: FC<Props> = ({dreams, allTags, allCharacters}) => {
    const {paginatedData, totalPages, setCurrentPage} = usePagination(dreams ?? [], MAX_ITEMS_PER_PAGE)

    const dreamCards = useMemo(() => {
        if (!paginatedData)
            return []

        return paginatedData.map(dream => (
            <DreamCard
                key={dream.id}
                dream={dream}
                allCharacters={allCharacters}
                allTags={allTags}
            />
        ))
    }, [allCharacters, allTags, paginatedData])


    return (
        <DreamContainer title="Dreams" containerClassName="!w-full">
            {dreamCards}
            {
                (dreams && dreams.length > MAX_ITEMS_PER_PAGE) && (
                    <Fragment>
                        <Spacer y={6}/>
                        <Pagination
                            classNames={{
                                base: "phone:flex phone:justify-center phone:!max-w-full"
                            }}
                            showControls
                            total={totalPages}
                            initialPage={1}
                            onChange={setCurrentPage}
                        />
                    </Fragment>
                )
            }
        </DreamContainer>
    )
}

export default GenericTagDreamContainer