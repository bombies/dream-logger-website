"use client"

import {FC, Fragment, ReactElement, RefObject, useRef} from "react";
import {Input} from "@nextui-org/input";
import MediaType from "@/app/api/utils/MediaType";
import toast from "react-hot-toast";
import UploadS3File from "@/app/(site)/hooks/s3/UploadS3File";
import {FileSize} from "@/utils/FileSize";

export type FileUploadProps = {
    uploadKey?: string,
    /**
     * The maximum size of a file.
     */
    maxFileSize?: FileSize,
    /**
     * Used to update an image to prevent the cluttering
     * of the S3 bucket and CloudFront CDN.
     */
    oldKey?: string,
    /**
     * Must end with a forward slash.
     */
    uploadPath?: string,
    isPublicObject?: boolean,
    onUploadStart?: (file: File) => void,
    onUploadSuccess?: (key: string) => void,
    onUploadError?: (error: string) => void,
    onFileSizeError?: (size: number) => void,
    onFileRemove?: () => void,
    disabled?: boolean,
    fileTypes: MediaType[]
    children?: (inputRef: RefObject<HTMLInputElement>) => ReactElement | ReactElement[],
    showToast?: boolean,
    toastOptions?: {
        uploadingMsg?: string,
        successMsg?: string,
        errorHandler?: (error: string) => any
    }
}

export const FileUpload: FC<FileUploadProps> = ({
                                                    maxFileSize,
                                                    onFileSizeError,
                                                    uploadKey,
                                                    oldKey,
                                                    uploadPath,
                                                    onUploadStart,
                                                    onUploadSuccess,
                                                    onUploadError,
                                                    onFileRemove,
                                                    fileTypes,
                                                    disabled,
                                                    children,
                                                    showToast,
                                                    toastOptions,
                                                    isPublicObject
                                                }) => {
    const {trigger: triggerUpload} = UploadS3File()
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <Fragment>
            <Input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={fileTypes.join(",")}
                isDisabled={disabled}
                onChange={async (e) => {
                    e.preventDefault()

                    const upload = async () => {
                        const allFiles = e.target.files;
                        if (!allFiles || !allFiles.length) {
                            if (onFileRemove)
                                onFileRemove();
                            return Promise.resolve();
                        }

                        const file = allFiles[0];
                        if (maxFileSize && file.size > maxFileSize.toBytes()) {
                            if (onFileSizeError)
                                onFileSizeError(file.size)
                            else
                                toast.error("That file is too big!")
                            return;
                        }

                        if (onUploadStart)
                            onUploadStart(file);

                        return triggerUpload({
                            body: {
                                file,
                                key: uploadKey,
                                oldKey,
                                path: uploadPath,
                                isPublic: isPublicObject
                            }
                        }).then((res) => {
                                if (onUploadSuccess)
                                    onUploadSuccess(res.data.key.replace("avatars/", ""));
                            }
                        ).catch(e => {
                            if (onUploadError)
                                onUploadError(e.message);
                        });
                    };

                    if (showToast) {
                        const defaultErrorHandler = (msg: string) => `There was an error uploading a new avatar: ${msg}`;
                        await toast.promise(
                            upload(),
                            {
                                loading: toastOptions?.uploadingMsg ?? "Uploading new avatar...",
                                success: toastOptions?.successMsg ?? "Successfully updated new avatar!",
                                error: toastOptions?.errorHandler ?? defaultErrorHandler
                            }
                        )
                    } else await upload()

                    e.target.files = null
                }}
            />
            {children && children(inputRef)}
        </Fragment>
    )
}

export default FileUpload