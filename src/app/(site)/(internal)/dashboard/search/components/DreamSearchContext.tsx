"use client"

import {FC, Fragment, useCallback, useMemo} from "react";
import {fetcherWithArgs} from "@/utils/client/client-utils";
import useSWRMutation from "swr/mutation";
import {DreamWithRelations} from "@/app/api/me/dreams/dreams.dto";
import Card from "@/app/(site)/components/Card";
import {CardBody, CardHeader} from "@nextui-org/card";
import {SearchIcon, SearchLinearIcon} from "@nextui-org/shared-icons";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import {Spacer, Spinner} from "@nextui-org/react";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import usePagination from "@/app/(site)/hooks/usePagination";
import Pagination from "@/app/(site)/components/Pagination";
import {Chip} from "@nextui-org/chip";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import DreamTagSelect from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamTagSelect";
import DreamCharacterSelect
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/forms/log/DreamCharacterSelect";

const DoSearch = () => {
    return useSWRMutation('/api/me/dreams', fetcherWithArgs<{
        tags?: string,
        characters?: string,
        title?: string,
    }, DreamWithRelations[] | null>)
}

type FormProps = {
    title?: string,
    characters?: string,
    tags?: string,
}

const MAX_ITEMS_PER_PAGE = 10

const DreamSearchContext: FC = () => {
    const {tags, characters} = useDreamsData()
    const {trigger: search, isMutating: isSearching, data: fetchedData} = DoSearch()
    const {register, handleSubmit} = useForm<FormProps>()
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedData
    } = usePagination(fetchedData ?? [], MAX_ITEMS_PER_PAGE)

    const onSubmit: SubmitHandler<FormProps> = useCallback(async ({tags, title, characters}) => {
        await search({
            body: {tags, title, characters}
        })
    }, [search])

    const dreamCards = useMemo(() => (
        paginatedData?.map(dream => (
            <DreamCard
                key={dream.id}
                dream={dream}
                hideTime
                showCreatedAt
            />
        ))
    ), [paginatedData])

    return (
        <Fragment>
            <div className="w-5/6">
                <Card
                    classNames={{
                        header: "gap-4 px-12 pt-12",
                        body: "px-12 pb-12",
                        footer: "px-12 pb-12"
                    }}
                >
                    <CardHeader>
                        <SearchIcon width={24} height={24}/>
                        <h2 className="text-3xl font-semibold phone:text-xl">Search</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex tablet:flex-col gap-4">
                                <Input
                                    id="title"
                                    isClearable
                                    isDisabled={isSearching}
                                    register={register}
                                    placeholder="Enter a title to search for..."
                                    label="Title"
                                />
                                <DreamTagSelect
                                    register={register}
                                    tags={tags}
                                    placeholder="Select tags..."
                                    label="Tags"
                                />
                                <DreamCharacterSelect
                                    register={register}
                                    characters={characters}
                                    label="Characters"
                                    placeholder="Select characters..."
                                />
                                <Button
                                    className="self-center phone:self-start"
                                    isIconOnly
                                    isDisabled={isSearching}
                                    isLoading={isSearching}
                                    type="submit"
                                    variant="shadow"
                                    size="lg"
                                >
                                    <SearchLinearIcon/>
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
            <Spacer y={6}/>
            <div className="w-5/6">
                <Card
                    classNames={{
                        header: "gap-4 px-12 pt-12",
                        body: "px-12 pb-12",
                        footer: "px-12 pb-12"
                    }}
                >
                    <CardHeader>
                        <h2 className="text-3xl font-semibold phone:text-xl">Search Results</h2>
                        {
                            fetchedData !== undefined && (
                                <Chip variant="flat" className="self-center">
                                    {fetchedData?.length ?? 0}
                                </Chip>
                            )
                        }
                    </CardHeader>
                    <CardBody>

                        {
                            isSearching ? (
                                <Spinner size="lg"/>
                            ) : (
                                fetchedData === undefined ? (
                                    <h3 className="p-12 text-xl phone:text-sm phone:p-6 bg-dark/50 border border-primary/40 rounded-3xl">You
                                        haven&apos;t made a search
                                        yet...</h3>
                                ) : (fetchedData === null || !fetchedData.length ? (
                                    <h3 className="p-12 text-xl phone:text-sm phone:p-6 bg-dark/50 border border-primary/40 rounded-3xl">There
                                        was nothing found for your query...</h3>
                                ) : (
                                    <div className="grid grid-cols-2 laptop:grid-cols-1 gap-4">
                                        {dreamCards}
                                    </div>
                                ))
                            )
                        }
                        {(fetchedData && fetchedData.length > MAX_ITEMS_PER_PAGE) && (
                            <Fragment>
                                <Spacer y={6}/>
                                <Pagination
                                    showControls
                                    initialPage={0}
                                    total={totalPages}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                />
                            </Fragment>
                        )}
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default DreamSearchContext