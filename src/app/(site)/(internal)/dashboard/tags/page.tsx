"use client"

import {FC} from "react";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import GenericTagContainer from "@/app/(site)/(internal)/dashboard/tags/components/GenericTagContainer";

const TagsPage: FC = () => {
    const {tags, characters} = useDreamsData()

    return (
        <div>
            <h1 className="font-bold text-7xl phone:text-4xl mb-24 phone:mb-16 tablet:text-center">Tags &
                Characters</h1>
            <div className="flex flex-wrap gap-24 laptop:flex-col laptop:items-center laptop-min:gap-12">
                <GenericTagContainer
                    state={tags}
                    stateType="tags"
                />
                <GenericTagContainer
                    state={characters}
                    stateType="characters"
                />
            </div>
        </div>
    )
}

export default TagsPage