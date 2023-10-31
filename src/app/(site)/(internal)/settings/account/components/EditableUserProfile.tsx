"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {useMemberData} from "@/app/(site)/components/providers/user-data/UserProvider";
import {Spacer, Spinner} from "@nextui-org/react";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import EditableInput from "@/app/(site)/components/inputs/editable/EditableInput";
import {USERNAME_REGEX} from "@/app/api/auth/register/register.dto";
import {EditIcon} from "@nextui-org/shared-icons";
import EditableMemberAvatar from "@/app/(site)/components/inputs/editable/EditableAvatar";
import toast from "react-hot-toast";
import UpdateSelfMember from "@/app/(site)/hooks/user/UpdateSelfMember";
import {PatchSelfDto} from "@/app/api/me/self-user.dto";
import {handleAxiosError} from "@/utils/client/client-utils";

const EditableUserProfile: FC = () => {
    const {trigger: update, isMutating: isUpdating} = UpdateSelfMember()
    const [optimisticAvatarSrc, setOptimisticAvatarSrc] = useState<string>()
    const {
        memberData: {
            data: member,
            loading: memberDataLoading,
            optimisticData: {
                editOptimisticData: editMemberData
            }
        }
    } = useMemberData()

    const doUpdate = useCallback(async (dto: PatchSelfDto) => (
        update({body: dto})
            .then(res => res.data)
            .catch(handleAxiosError)
    ), [update])

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
                                    <EditableMemberAvatar
                                        srcOverride={optimisticAvatarSrc}
                                        editEnabled={member !== undefined}
                                        member={member}
                                        className="w-24 h-24"
                                        isBordered

                                        onUploadStart={async (file) => {
                                            const fileBlob = new Blob([Buffer.from(await file.arrayBuffer())])
                                            const fileSrc = URL.createObjectURL(fileBlob)
                                            setOptimisticAvatarSrc(fileSrc)

                                            toast.success("Updated your avatar!")
                                        }}

                                        onUploadSuccess={async (key) => {
                                            if (editMemberData)
                                                await editMemberData(
                                                    () => doUpdate({image: key}),
                                                    {
                                                        ...member!,
                                                        image: key
                                                    }
                                                )
                                        }}

                                        onUploadError={(error) => {
                                            toast.error(error)
                                        }}
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
                                                <p className="flex gap-2">{member?.username} <EditIcon
                                                    className="self-center"/></p>
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
                                                    <p className="capitalize flex gap-2">{member?.firstName} <EditIcon
                                                        className="self-center"/></p>
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
                                                    <p className="capitalize flex gap-2">{member?.lastName} <EditIcon
                                                        className="self-center"/></p>
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