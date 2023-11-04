import {FC, Fragment} from "react";
import DreamSearchContext from "@/app/(site)/(internal)/dashboard/search/components/DreamSearchContext";

const SearchDreamsPage: FC = () => {
    return (
        <Fragment>
            <h1 id="dash_search_title"
                className="font-bold text-7xl phone:text-4xl mb-24 phone:mb-16 w-fit">Search Dreams</h1>
            <DreamSearchContext/>
        </Fragment>
    )
}

export default SearchDreamsPage