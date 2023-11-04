"use client"

import {FC, Fragment, useCallback, useMemo, useState} from "react";
import {DreamTagsState} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreamTags";
import {
    DreamCharactersState
} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/hooks/useDreamCharacters";
import GenericTagCard from "@/app/(site)/(internal)/dashboard/tags/components/GenericTagCard";
import {Spacer, Spinner, Tooltip} from "@nextui-org/react";
import {DreamCharacter, DreamTag} from "@prisma/client";
import Input from "@/app/(site)/components/inputs/Input";
import {SearchIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import SortAlphaUpIcon from "@/app/(site)/components/icons/SortAlphaUpIcon";
import SortAlphaDownIcon from "@/app/(site)/components/icons/SortAlphaDownIcon";
import SortIcon from "@/app/(site)/components/icons/SortIcon";
import {Chip} from "@nextui-org/chip";
import Pagination from "@/app/(site)/components/Pagination";
import usePagination from "@/app/(site)/hooks/usePagination";

type Props = {
    state: DreamTagsState | DreamCharactersState,
    stateType: "tags" | "characters"
}

export enum SortOrder {
    ASCENDING = "asc",
    DESCENDING = "desc"
}

const MAX_ITEMS_PER_PAGE = 8;

const GenericTagContainer: FC<Props> = ({state, stateType}) => {
    const [tagSearch, setTagSearch] = useState<string>()
    const [sortOrder, setSortOrder] = useState<SortOrder>()
    const {paginatedData, totalPages, setCurrentPage} = usePagination<DreamTag | DreamCharacter>(state.data, MAX_ITEMS_PER_PAGE)

    const switchSortOrder = useCallback(() => {
        setSortOrder(prev => {
            switch (prev) {
                case SortOrder.ASCENDING: {
                    return SortOrder.DESCENDING
                }
                case  SortOrder.DESCENDING: {
                    return undefined
                }
                default: {
                    return SortOrder.ASCENDING
                }
            }
        })
    }, [setSortOrder])

    const visibleData = useMemo(() => {
        let data = [...paginatedData];

        if (sortOrder)
            data = data.sort((a: DreamTag | DreamCharacter, b: DreamTag | DreamCharacter) => {
                let sortResult = stateType === "tags" ? (a as DreamTag).tag.localeCompare((b as DreamTag).tag) : (a as DreamCharacter).name.localeCompare((b as DreamCharacter).name)
                if (sortOrder === SortOrder.DESCENDING)
                    sortResult *= -1
                return sortResult
            })

        if (tagSearch)
            data = data.filter((stateData: DreamTag | DreamCharacter) => {
                if (stateType === "tags")
                    return (stateData as DreamTag).tag.toLowerCase().includes(tagSearch.toLowerCase())
                else return (stateData as DreamCharacter).name.toLowerCase().includes(tagSearch.toLowerCase())
            })

        return data
    }, [paginatedData, sortOrder, stateType, tagSearch])

    const tagElements = useMemo(() => (
        visibleData.map((stateData: DreamTag | DreamCharacter) => (
            <GenericTagCard
                key={stateData.id}
                data={stateData}
                stateType={stateType}
            />
        ))
    ), [stateType, visibleData])


    return (
        <div className="w-5/6 bg-primary/20 p-12 rounded-3xl ">
            <div className="flex phone:flex-col items-center gap-4 mb-6">
                <div className="flex gap-2">
                    <h2 className="text-3xl phone:text-xl font-bold">Your {stateType === 'tags' ? "Tags" : "Characters"}</h2>
                    <Chip className="self-start" size="sm" variant="flat">
                        {state.data.length}
                    </Chip>
                </div>
                <Tooltip
                    content="Sort"
                    className="bg-secondary/90 border border-primary/40 backdrop-blur-md p-3"
                    closeDelay={10}
                >
                    <Button
                        isIconOnly
                        onPress={switchSortOrder}
                        variant="flat"
                        size="sm"
                    >
                        {sortOrder === undefined ? (<SortIcon/>) : (
                            sortOrder === SortOrder.ASCENDING ? (<SortAlphaUpIcon/>)
                                :
                                (<SortAlphaDownIcon/>)
                        )}
                    </Button>
                </Tooltip>
            </div>
            {
                state.data.length > 0 && (
                    <div className="w-96 phone:w-full">
                        <Input
                            label="Search..."
                            startContent={<SearchIcon/>}
                            value={tagSearch}
                            onValueChange={setTagSearch}
                            isClearable
                        />
                        <Spacer y={6}/>
                    </div>
                )
            }
            <div className="grid grid-cols-4 tablet:grid-cols-2 phone:grid-cols-1 gap-6">
                {
                    state.loading ? (
                        <Spinner/>
                    ) : (
                        tagElements.length > 0 ?
                            tagElements
                            :
                            <p className="text-xl p-12 bg-secondary rounded-3xl col-span-2 phone:col-span-1">
                                There is nothing here...
                            </p>
                    )
                }
            </div>
            {
                totalPages > 1 && (
                    <Fragment>
                        <Spacer y={6}/>
                        <Pagination
                            showControls
                            total={totalPages}
                            classNames={{
                                base: "phone:flex phone:justify-center phone:!max-w-full"
                            }}
                            initialPage={1}
                            onChange={setCurrentPage}
                        />
                    </Fragment>
                )
            }
        </div>
    )
}

export default GenericTagContainer