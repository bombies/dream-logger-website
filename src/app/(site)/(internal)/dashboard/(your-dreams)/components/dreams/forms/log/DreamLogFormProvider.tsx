import {FC, PropsWithChildren, useState} from "react";
import {createGenericContext, UseStateArray} from "@/utils/client/client-data-utils";
import {PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import {PatchDraftDreamDto} from "@/app/api/me/dreams/drafts/dream-drafts.dto";

const [DreamLogFormContext, hook] = createGenericContext<UseStateArray<PatchDraftDreamDto>>("useDreamLogForm must be used in a DreamLogFormProvider!")

const DreamLogFormProvider: FC<PropsWithChildren> = ({children}) => {
    const [data, setData] = useState<PatchDreamDto>({})

    return (
        <DreamLogFormContext.Provider value={[data, setData]}>
            {children}
        </DreamLogFormContext.Provider>
    )
}

export default DreamLogFormProvider
export const useDreamLogForm = hook