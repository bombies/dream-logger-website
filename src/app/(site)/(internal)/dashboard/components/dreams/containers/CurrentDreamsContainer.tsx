import {FC, Fragment, useMemo} from "react";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import DreamCard from "@/app/(site)/(internal)/dashboard/components/dreams/card/DreamCard";
import LogDreamCard from "@/app/(site)/(internal)/dashboard/components/dreams/LogDreamCard";
import useTodayTimeRange from "@/app/(site)/hooks/time-hooks";
import DreamCardSkeleton from "@/app/(site)/(internal)/dashboard/components/dreams/card/DreamCardSkeleton";
import DreamContainer from "@/app/(site)/(internal)/dashboard/components/dreams/containers/DreamContainer";

const CurrentDreamsContainer: FC = () => {
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
                key={dream.id}
                dream={dream}
                optimisticRemove={dreams.optimisticData.removeOptimisticData}
            />
        )), [dreams.data, dreams.optimisticData.removeOptimisticData, endOfToday, startOfToday])

    return (
        <DreamContainer title={`Today
            - ${
            startOfToday.toLocaleDateString("en-US", {
                dateStyle: "medium"
            })
        }`}>
            <LogDreamCard/>
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