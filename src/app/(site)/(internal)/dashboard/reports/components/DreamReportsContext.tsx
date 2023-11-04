"use client"

import {FC, Fragment} from "react";
import {fetcherWithArgs} from "@/utils/client/client-utils";
import {CountResponse, DreamReportsParams} from "@/app/api/me/dreams/reports/dream-reports.dto";
import useSWRMutation from "swr/mutation";
import {Button} from "@nextui-org/button";

const useCountInsight = () => (
    useSWRMutation(`/api/me/dreams/reports/count`, fetcherWithArgs<DreamReportsParams, CountResponse>)
)

const DreamReportsContext: FC = () => {
    const {trigger, isMutating} = useCountInsight()

    return (
        <Fragment>
            <Button
                onPress={() => {
                    trigger({
                        body: {
                            from: new Date().setHours(0, 0, 0, 0).toString(),
                            to: Date.now().toString(),
                            characters: "clokca7bu000f01l0095jkeo3"
                        }
                    })
                }}
            >
                Fetch data
            </Button>
        </Fragment>
    )
}

export default DreamReportsContext