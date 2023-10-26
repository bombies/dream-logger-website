import {FC, useMemo} from "react";
import {useDreamsData} from "@/app/(site)/(internal)/dashboard/components/dreams/DreamsProvider";
import DreamCard from "@/app/(site)/(internal)/dashboard/components/dreams/DreamCard";
import LogDreamCard from "@/app/(site)/(internal)/dashboard/components/dreams/LogDreamCard";
import useTodayTimeRange from "@/app/(site)/hooks/useTodayTimeRange";

const CurrentDreamsContainer: FC = () => {
    const [startOfToday, endOfToday] = useTodayTimeRange()
    const {dreams} = useDreamsData()
    const dreamCards = useMemo(() => dreams.data
        .filter(dream => {
            const creationDate = new Date(dream.createdAt.toString());
            return creationDate.getTime() >= startOfToday.getTime() && creationDate.getTime() <= endOfToday.getTime()
        })
        .map(dream => (
            <DreamCard key={dream.id} dream={dream}/>
        )), [dreams.data, endOfToday, startOfToday])

    return (
        <div className="flex flex-col">
            <h2 className="text-4xl phone:text-2xl font-semibold mb-8 phone:mb-4 tablet:text-center">Today - {startOfToday.toLocaleDateString("en-US", {
                dateStyle: "medium"
            })}
            </h2>
            <div className="bg-primary/20 rounded-3xl py-6 px-4 phone:p-3 w-[36rem] tablet:w-[24rem] phone:w-[20rem] tablet:self-center flex flex-col gap-y-6 phone:gap-y-3">
                <LogDreamCard/>
                {dreamCards}
            </div>
        </div>

    )
}

export default CurrentDreamsContainer