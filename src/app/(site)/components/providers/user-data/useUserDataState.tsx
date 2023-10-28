import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetcher} from "@/utils/client/client-utils";
import {Member} from "@prisma/client";
import {DataContextState, OptimisticWorker} from "@/utils/client/client-data-utils";
import {useCallback} from "react";

const useUserDataState = (): DataContextState<Member | undefined, Member> => {
    const {data: session} = useSession();
    const {data: userData, isLoading: userDataLoading, mutate: mutateUserData} = useSWR(session && "/api/me", fetcher<Member>)
    
    const editOptimisticUser = useCallback<OptimisticWorker<Member>>(async (work, optimisticUser) => {
        if (!userData)
            return
        
        const doWork = async (): Promise<Member> => {
            const user = await doWork()
            if (!user)
                return userData
            return user
        }
        
        await mutateUserData(doWork, {
            optimisticData: optimisticUser,
            rollbackOnError: true
        })
    }, [mutateUserData, userData])
    
    return {
        data: userData,
        mutateData: mutateUserData,
        loading: userDataLoading,
        optimisticData: {
            editOptimisticData: editOptimisticUser,
        }
    }
}

export default useUserDataState