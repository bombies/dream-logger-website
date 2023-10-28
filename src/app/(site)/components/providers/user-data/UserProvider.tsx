"use client"

import {createDataContext, DataContextProps, DataContextState} from "@/utils/client/client-data-utils";
import {Member} from "@prisma/client";
import {FC, PropsWithChildren} from "react";
import useMemberDataState from "@/app/(site)/components/providers/user-data/useUserDataState";

interface MemberDataContextProps extends DataContextProps {
    memberData: DataContextState<Member | undefined, Member>
}

const [UserDataContext, useHook] = createDataContext<MemberDataContextProps>("useUserData must be used in a UserProvider!")

const UserProvider: FC<PropsWithChildren> = ({children}) => {
    const memberDataState = useMemberDataState()

    return (
        <UserDataContext.Provider value={{memberData: memberDataState}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserProvider

export const useMemberData = useHook