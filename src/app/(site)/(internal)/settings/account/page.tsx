"use client"

import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import SubTitle from "@/app/(site)/components/SubTitle";
import EditableUserProfile from "@/app/(site)/(internal)/settings/account/components/EditableUserProfile";
import {Divider} from "@nextui-org/divider";
import ChangePasswordButton from "@/app/(site)/(internal)/settings/account/components/ChangePasswordButton";
import DeleteAccountButton from "@/app/(site)/(internal)/settings/account/components/DeleteAccountButton";
import {useSession} from "next-auth/react";

const AccountSettingsPage: FC = () => {
    const {data: session} = useSession()

    return (
        <Fragment>
            <Title>Account Settings</Title>
            <SubTitle>Your Profile</SubTitle>
            <Spacer y={4}/>
            <EditableUserProfile/>
            <Divider className="my-6 w-3/4"/>
            {
                session?.user.accountProvider === null && (
                    <Fragment>
                        <SubTitle>Password</SubTitle>
                        <div>
                            <ChangePasswordButton/>
                        </div>
                        <Divider className="my-6 w-3/4"/>
                    </Fragment>
                )
            }
            <SubTitle>Account Removal</SubTitle>
            <p className="font-bold p-6 bg-danger/30 rounded-3xl w-fit phone:w-3/4 mb-6">Deleting your account is a
                permanent action and cannot be undone!</p>
            <div>
                <DeleteAccountButton/>
            </div>
        </Fragment>
    )
}

export default AccountSettingsPage