"use client"

import {FC, Fragment} from "react";
import {useMemberData} from "@/app/(site)/components/providers/user-data/UserProvider";
import {Avatar, Spacer, Spinner} from "@nextui-org/react";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import EditableInput from "@/app/(site)/components/inputs/editable/EditableInput";
import {USERNAME_REGEX} from "@/app/api/auth/register/register.dto";
import {EditIcon} from "@nextui-org/shared-icons";

const EditableUserProfile: FC = () => {
    const {
        memberData: {
            data: member,
            loading: memberDataLoading,
            optimisticData: {
                editOptimisticData: editMemberData
            }
        }
    } = useMemberData()

    return (
        <Card
            className="w-1/2 laptop:w-5/6"
            classNames={{
                body: "p-12"
            }}
        >
            <CardBody>
                {
                    memberDataLoading ?
                        <Spinner/>
                        :
                        (
                            <Fragment>
                                <div className="flex gap-8">
                                    <Avatar
                                        src={member?.image ?? undefined}
                                        isBordered
                                        className="w-24 h-24"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="capitalize font-semibold text-2xl">{member?.firstName} {member?.lastName}</h3>
                                        <h3 className="text-primary brightness-200">@{member?.username}</h3>
                                    </div>
                                </div>
                                <Spacer y={6}/>
                                <Card classNames={{
                                    body: "space-y-6 bg-[#0C0015] p-12"
                                }}>
                                    <CardBody>
                                        <div>
                                            <h4 className="text-subtext font-semibold mb-2">USERNAME</h4>
                                            <EditableInput
                                                isEditable
                                                isRequired
                                                value={member?.username}
                                                minLength={2}
                                                maxLength={32}
                                                size="sm"
                                                validate={{
                                                    predicate(value) {
                                                        if (!value)
                                                            return true
                                                        return USERNAME_REGEX.test(value)
                                                    },
                                                    errorMsg: "Invalid username!"
                                                }}
                                                onEdit={(newValue) => {

                                                }}
                                            >
                                                <p className="flex gap-2">{member?.username} <EditIcon className="self-center" /></p>
                                            </EditableInput>
                                        </div>
                                        <div className="flex phone:flex-col gap-24 phone:gap-4">
                                            <div>
                                                <h4 className="text-subtext font-semibold mb-2">FIRST NAME</h4>
                                                <EditableInput
                                                    isEditable
                                                    isRequired
                                                    value={member?.firstName}
                                                    minLength={1}
                                                    maxLength={60}
                                                    size="sm"
                                                    onEdit={(newValue) => {

                                                    }}
                                                >
                                                    <p className="capitalize flex gap-2">{member?.firstName} <EditIcon className="self-center" /></p>
                                                </EditableInput>
                                            </div>
                                            <div>
                                                <h4 className="text-subtext font-semibold mb-2">LAST NAME</h4>
                                                <EditableInput
                                                    isEditable
                                                    isRequired
                                                    value={member?.lastName}
                                                    minLength={1}
                                                    maxLength={60}
                                                    size="sm"
                                                    onEdit={(newValue) => {

                                                    }}
                                                >
                                                    <p className="capitalize flex gap-2">{member?.lastName} <EditIcon className="self-center" /></p>
                                                </EditableInput>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-subtext font-semibold mb-2">EMAIL ADDRESS</h4>
                                            <p>{member?.email}</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Fragment>
                        )
                }
            </CardBody>
        </Card>
    )
}

export default EditableUserProfile