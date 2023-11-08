"use client"

import {FC, Fragment, useCallback, useState} from "react";
import {useMemberData} from "@/app/(site)/components/providers/user-data/UserProvider";
import {Spacer, Spinner, Tooltip} from "@nextui-org/react";
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
import {Member} from "@prisma/client";
import {AxiosError} from "axios";

const EditableUserProfile: FC = () => {
    const {trigger: update} = UpdateSelfMember()
    const [optimisticAvatarSrc, setOptimisticAvatarSrc] = useState<string>()
    const {
        memberData: {
            data: member,
            loading: memberDataLoading,
            mutateData: mutateMemberData,
            optimisticData: {
                editOptimisticData: editMemberData
            }
        }
    } = useMemberData()

    const doUpdate = useCallback(async (dto: PatchSelfDto, handleError?: boolean): Promise<Member | null | undefined> => {
        const work = update({body: dto})
            .then(res => res.data)
        return handleError ? work.catch(handleAxiosError) : work
    }, [update])

    return (
        <Card
            className="w-1/2 laptop:w-5/6"
            classNames={{
                body: "p-12 phone:px-4"
            }}
        >
            <CardBody>
                {
                    memberDataLoading ?
                        <Spinner/>
                        :
                        (
                            <Fragment>
                                <div className="flex phone:justify-center gap-8">
                                    <EditableMemberAvatar
                                        srcOverride={optimisticAvatarSrc}
                                        editEnabled={member !== undefined}
                                        member={member}
                                        className="w-24 h-24 phone:w-16 phone:h-16"
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
                                                    () => doUpdate({image: key}, true),
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
                                    <div className="flex flex-col justify-center break-words w-1/2">
                                        <h3 className="capitalize font-semibold text-2xl phone:text-xl">{member?.firstName} {member?.lastName}</h3>
                                        <h3 className="text-primary brightness-200">@{member?.username}</h3>
                                    </div>
                                </div>
                                <Spacer y={6}/>
                                <Card classNames={{
                                    base: "space-y-6 bg-light-secondary border border-primary dark:border-none dark:bg-dark p-12 rounded-3xl"
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
                                                onEdit={async (newValue) => {
                                                    if (!newValue)
                                                        return

                                                    const newUsername = newValue.toLowerCase()
                                                    if (newUsername === member!.username)
                                                        return;

                                                    await toast.promise(doUpdate({username: newUsername})
                                                        .then(async (res) => {
                                                            if (!res || !mutateMemberData)
                                                                return
                                                            await mutateMemberData(res)
                                                        })
                                                        .catch((err: AxiosError) => Promise.reject(err.response?.statusText ?? "Something went wrong!")), {
                                                        loading: "Updating username...",
                                                        success: "Successfully updated your username!",
                                                        error(err: string) {
                                                            return err
                                                        }
                                                    })
                                                }}
                                            >
                                                <p className="flex justify-between gap-2 text-dark dark:text-light hover:text-primary ease-in-out duration-300">{member?.username}
                                                    <span className="self-center">
                                                        <EditIcon/>
                                                    </span>
                                                </p>
                                            </EditableInput>
                                        </div>
                                        <div>
                                            <h4 className="text-subtext font-semibold mb-2 flex gap-2">FIRST
                                                NAME</h4>
                                            <EditableInput
                                                isEditable
                                                isRequired
                                                value={member?.firstName}
                                                minLength={1}
                                                maxLength={60}
                                                size="sm"
                                                onEdit={async (newValue) => {
                                                    if (!newValue)
                                                        return

                                                    if (editMemberData)
                                                        await editMemberData(
                                                            () => doUpdate({firstName: newValue}, true),
                                                            {
                                                                ...member!,
                                                                firstName: newValue
                                                            }
                                                        )
                                                }}
                                            >
                                                <p className="capitalize flex justify-between gap-2 text-dark dark:text-light hover:text-primary ease-in-out duration-300">{member?.firstName}
                                                    <span className="self-center">
                                                            <EditIcon/>
                                                        </span>
                                                </p>
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
                                                onEdit={async (newValue) => {
                                                    if (!newValue)
                                                        return

                                                    if (editMemberData)
                                                        await editMemberData(
                                                            () => doUpdate({lastName: newValue}, true),
                                                            {
                                                                ...member!,
                                                                lastName: newValue
                                                            }
                                                        )
                                                }}
                                            >
                                                <p className="capitalize flex justify-between gap-2 break-all text-dark dark:text-light hover:text-primary ease-in-out duration-300">{member?.lastName}
                                                    <span className="self-center">
                                                            <EditIcon/>
                                                        </span>
                                                </p>
                                            </EditableInput>
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