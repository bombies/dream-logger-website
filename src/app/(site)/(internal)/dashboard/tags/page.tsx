"use client"

import {FC, Fragment} from "react";
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
                    allTags={tags.data}
                    allCharacters={characters.data}
                />
                <GenericTagContainer
                    state={characters}
                    stateType="characters"
                    allTags={tags.data}
                    allCharacters={characters.data}
                />
            </div>
        </div>
    )
}

export default TagsPage