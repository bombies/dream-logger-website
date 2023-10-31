import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {Member} from "@prisma/client";
import {DataContextState, OptimisticWorker} from "@/utils/client/client-data-utils";
import {useCallback, useEffect} from "react";
import useCloudFrontUrl from "@/app/(site)/hooks/s3/useCloudFrontUrl";

const useUserDataState = (): DataContextState<Member | undefined, Member> => {
    const {data: session} = useSession();
    const {
        data: userData,
        isLoading: userDataLoading,
        mutate: mutateUserData
    } = useSWR(session && "/api/me", fetcher<Member>)
    const avatarUrl = useCloudFrontUrl(userData?.image && `avatars/${userData.image}`)

    const editOptimisticUser = useCallback<OptimisticWorker<Member>>(async (work, optimisticUser) => {
        if (!userData)
            return

        const doWork = async (): Promise<Member> => {
            const user = await work()
            if (!user)
                return userData
            return user
        }

        await mutateUserData(doWork, {
            optimisticData: optimisticUser,
            rollbackOnError: true
        })
    }, [mutateUserData, userData])

    useEffect(() => {
        if (!userData)
            return


    })

    return {
        data: userData,
        avatar: avatarUrl,
        mutateData: mutateUserData,
        loading: userDataLoading,
        optimisticData: {
            editOptimisticData: editOptimisticUser,
        }
    }
}

export default useUserDataState