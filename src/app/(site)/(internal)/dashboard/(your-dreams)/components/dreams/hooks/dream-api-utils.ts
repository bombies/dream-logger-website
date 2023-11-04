import {Dream} from "@prisma/client";
import {fetcher, patchMutator} from "@/utils/client/client-utils";
import {DreamWithRelations, PatchDreamDto} from "@/app/api/me/dreams/dreams.dto";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";

export const FetchFullDream = (dream: Dream, doFetch: boolean) => {
    return useSWR(doFetch && `/api/me/dreams/${dream.id}?tags=true&characters=true`, fetcher<DreamWithRelations | null>)
}

export const UpdateDream = (dreamId: string) => {
    return useSWRMutation(`/api/me/dreams/${dreamId}`, patchMutator<PatchDreamDto, Dream>())
}