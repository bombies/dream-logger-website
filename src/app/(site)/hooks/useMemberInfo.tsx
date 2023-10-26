import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetcher} from "@/utils/client-utils";
import {Member} from "@prisma/client";


const useMemberInfo = () => {
    const {status: sessionStatus} = useSession()
    const {data} = useSWR(sessionStatus === 'authenticated' && '/api/me', fetcher<Member | null>)
    return data
}

export default useMemberInfo