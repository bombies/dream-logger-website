import {FC, Fragment, useMemo} from "react";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/DreamsProvider";
import DreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCard";
import LogDreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/LogDreamCard";
import useTodayTimeRange from "@/app/(site)/hooks/time-hooks";
import DreamCardSkeleton
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/card/DreamCardSkeleton";
import DreamContainer
    from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/containers/DreamContainer";
import {useTutorialsData} from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";

const CurrentDreamsContainer: FC = () => {
    const [tutorialsState] = useTutorialsData()
    const [startOfToday, endOfToday] = useTodayTimeRange()
    const {dreams} = useDreamsData()
    const dreamCards = useMemo(() => dreams.data
        .filter(dream => {
            const creationDate = new Date(dream.createdAt.toString());
            return creationDate >= startOfToday && creationDate <= endOfToday
        })
        .sort((a, b) => new Date(b.createdAt.toString()).getTime() - new Date(a.createdAt.toString()).getTime())
        .map(dream => (
            <DreamCard
                isDisabled={!tutorialsState?.yourDreams}
                key={dream.id}
                dream={dream}
            />
        )), [dreams.data, endOfToday, startOfToday, tutorialsState?.yourDreams])

    return (
        <DreamContainer id="today_dreams" title={`Today
            - ${
            startOfToday.toLocaleDateString("en-US", {
                dateStyle: "medium"
            })
        }`}>
            <LogDreamCard isDisabled={!tutorialsState?.yourDreams}/>
            {dreams.loading ? (
                <Fragment>
                    <DreamCardSkeleton/>
                    <DreamCardSkeleton/>
                    <DreamCardSkeleton/>
                </Fragment>
            ) : (dreamCards.length ? dreamCards :
                <h3 className="text-center font-light text-3xl tablet:text-xl text-subtext/30 py-6">You have no
                    dreams today...</h3>)
            }
        </DreamContainer>
    )
}

export default CurrentDreamsContainer