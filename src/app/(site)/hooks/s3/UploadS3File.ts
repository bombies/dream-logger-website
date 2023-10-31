"use client"

import {MutatorArgs} from "@/utils/client/client-utils";
import axios from "axios";
import useSWRMutation from "swr/mutation";

type UploadS3FileArgs = MutatorArgs<{
    file: File,
    key?: string,
    path?: string,
    isPublic?: boolean,
    oldKey?: string,
}>

const UploadS3File = () => {
    const mutator = async (url: string, {arg}: UploadS3FileArgs) => {
        const {file, key, isPublic, path, oldKey} = arg.body
        const formData = new FormData();
        formData.append("file", file)
        formData.append("key", key ?? "")
        formData.append("path", path ?? "")
        formData.append("isPublic", String(isPublic) ?? "")
        formData.append("oldKey", oldKey ?? "")

        return axios.post<{ key: string }>(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }

    return useSWRMutation('/api/s3', mutator)
}

export default UploadS3File