import useSWRMutation from "swr/mutation";
import {patchMutator} from "@/utils/client/client-utils";
import {PatchSelfDto} from "@/app/api/me/self-user.dto";
import {Member} from "@prisma/client";

const UpdateSelfMember = () => {
    return useSWRMutation(`/api/me`, patchMutator<PatchSelfDto, Member | null>())
}

export default UpdateSelfMember