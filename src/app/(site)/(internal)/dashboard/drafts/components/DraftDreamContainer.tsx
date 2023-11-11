"use client"

import {FC, Fragment, useMemo, useState} from "react";
import Card from "@/app/(site)/components/Card";
import {CardBody, CardFooter} from "@nextui-org/card";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import usePagination from "@/app/(site)/hooks/usePagination";
import Pagination from "@/app/(site)/components/Pagination";
import Input from "@/app/(site)/components/inputs/Input";
import {SearchIcon} from "@nextui-org/shared-icons";
import {Spacer} from "@nextui-org/react";
import DreamCardSkeleton
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCardSkeleton";

const MAX_PER_PAGE = 10;

const DraftDreamContainer: FC = () => {
    const {dreams} = useDreamsData()
    const draftDreams = useMemo(() => dreams.data.filter(dream => dream.isDraft), [dreams.data])
    const [dreamSearch, setDreamSearch] = useState<string>()
    const {paginatedData, currentPage, totalPages, setCurrentPage} = usePagination(draftDreams, MAX_PER_PAGE, {
        filter(draft) {
            if (!dreamSearch || dreamSearch.length === 0)
                return true;
            return draft.title.toLowerCase().includes(dreamSearch.toLowerCase())
        },
        sort(a, b) {
            return new Date(b.createdAt.toString()).getTime() - new Date(a.createdAt.toString()).getTime()
        }
    })

    const draftCards = useMemo(() => paginatedData
        .map(dream => (
            <DreamCard
                key={dream.id}
                dream={dream}
                hideTime
                showCreatedAt
            />
        )), [paginatedData])

    return (
        <div className="w-5/6 phone:w-[85%]">
            <Card className="p-12 tablet:py-6 tablet:px-0 phone:px-0">
                <CardBody>
                    <Input
                        className="w-96 phone:w-full"
                        label="Search"
                        placeholder="Search for a draft..."
                        startContent={<SearchIcon/>}
                        value={dreamSearch}
                        onValueChange={setDreamSearch}
                    />
                    <Spacer y={6}/>
                    <div className="grid grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 gap-4">
                        {dreams.loading ? (
                            <Fragment>
                                <DreamCardSkeleton/>
                                <DreamCardSkeleton/>
                                <DreamCardSkeleton/>
                            </Fragment>
                        ) : (draftCards.length > 0 ? draftCards :
                            <p className="text-subtext text-3xl phone:text-medium text-center col-span-2 tablet:col-span-3">You
                                have no drafts...</p>)}
                    </div>
                </CardBody>
                {draftDreams.length > MAX_PER_PAGE && (
                    <CardFooter>
                        <Pagination
                            total={totalPages}
                            initialPage={0}
                            page={currentPage}
                            onChange={setCurrentPage}
                        />
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default DraftDreamContainer