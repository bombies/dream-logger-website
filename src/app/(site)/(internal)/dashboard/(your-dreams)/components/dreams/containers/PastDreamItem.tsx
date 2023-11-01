"use client"

import {FC, Fragment, useMemo} from "react";
import {DayDreams} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/PastDreamsContainer";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import {DreamCharacter, DreamTag} from "@prisma/client";

type Props = {
    dream: DayDreams,
    allCharacters: DreamCharacter[],
    allTags: DreamTag[],
}

const PastDreamItem: FC<Props> = ({dream, allTags, allCharacters}) => {
    const cards = useMemo(() => dream.dreams.map(pastDream => (
        <DreamCard
            key={pastDream.id}
            dream={pastDream}
            allCharacters={allCharacters}
            allTags={allTags}
        />
    )), [dream.dreams])

    return (
        <Fragment>
            <h3 className="text-center font-semibold phone:font-normal text-xl phone:text-medium">{new Date(dream.timestamp).toLocaleString("en-US", {
                dateStyle: "full"
            })}</h3>
            {cards}
        </Fragment>
    )
}

export default PastDreamItem