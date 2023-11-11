import {FC, Fragment} from "react";
import LogDreamCard from "@/app/(site)/(internal)/dashboard/(your-dreams)/components/dreams/LogDreamCard";
import DraftDreamContainer from "@/app/(site)/(internal)/dashboard/drafts/components/DraftDreamContainer";
import {Spacer} from "@nextui-org/react";

const DreamDraftsPage: FC = () => {
    return (
        <Fragment>
            <h1 id="dash_drafts_title" className="font-bold w-fit text-7xl phone:text-5xl mb-24 phone:mb-10">Your
                Drafts</h1>
            <LogDreamCard content="New Draft"
                          className="w-1/4 laptop:w-1/2 tablet:w-3/4 phone:w-[85%] hover:scale-100"/>
            <Spacer y={12} />
            <DraftDreamContainer/>
        </Fragment>

    )
}

export default DreamDraftsPage