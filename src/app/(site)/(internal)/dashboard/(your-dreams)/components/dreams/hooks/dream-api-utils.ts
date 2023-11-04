import {Dream} from "@prisma/client";
import {fetcher, patchMutator} from "@/utils/client/client-utils";
import {DreamWithRelations, PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import useSWRMutation from "swr/mutation";
import useSWRImmutable from "swr/immutable";

export const FetchFullDream = (dreamId: string, doFetch: boolean) => {
    console.log(dreamId, doFetch)
    return useSWRImmutable(`/api/me/dreams/${dreamId}?tags=true&characters=true`, fetcher<DreamWithRelations | null>)
}

export const UpdateDream = (dreamId: string) => {
    return useSWRMutation(`/api/me/dreams/${dreamId}`, patchMutator<PatchDreamDto, Dream>(), {
        revalidate: false
    })
}