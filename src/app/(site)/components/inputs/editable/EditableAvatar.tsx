"use client"

import {FC} from "react";
import FileUpload, {FileUploadProps} from "@/app/(site)/components/FileUpload";
import MediaType from "@/app/api/utils/MediaType";
import {Member} from "@prisma/client";
import useCDNUrl from "@/app/(site)/hooks/s3/useCDNUrl";
import {Avatar, AvatarProps} from "@nextui-org/react";
import clsx from "clsx";

type Props = {
        editEnabled?: boolean,
        member?: Member,
        avatarUrl?: string,
        srcOverride?: string,
    }
    & Omit<AvatarProps, "src" | "onClick">
    & Pick<FileUploadProps, "onFileRemove" | "onUploadSuccess" | "onUploadError" | "onUploadStart">

const EditableMemberAvatar: FC<Props> = ({
                                             editEnabled,
                                             member,
                                             avatarUrl,
                                             onFileRemove,
                                             onUploadSuccess,
                                             onUploadStart,
                                             onUploadError,
                                             srcOverride,
                                             ...avatarProps
                                         }) => {
    const fetchedAvatarUrl = useCDNUrl(avatarUrl === undefined && member?.image ? `avatars/${member.image}` : null)


    return (
        <FileUpload
            oldKey={member?.image ?? undefined}
            isPublicObject
            uploadPath="avatars/"
            disabled={!editEnabled}
            fileTypes={[MediaType.JPEG, MediaType.PNG, MediaType.WEBP]}
            onUploadStart={onUploadStart}
            onUploadError={onUploadError}
            onUploadSuccess={onUploadSuccess}
            onFileRemove={onFileRemove}
        >
            {(ref) => (
                <Avatar
                    src={srcOverride ?? (avatarUrl ?? fetchedAvatarUrl)}
                    onClick={() => ref.current?.click()}
                    classNames={{
                        base: clsx(editEnabled && "cursor-pointer"),
                    }}
                    {...avatarProps}
                />
            )}
        </FileUpload>
    )
}

export default EditableMemberAvatar