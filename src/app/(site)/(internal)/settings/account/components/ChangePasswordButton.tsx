"use client"

import {FC} from "react";
import {Button} from "@nextui-org/button";
import useSWRMutation from "swr/mutation";
import {fetcher} from "@/utils/client/client-utils";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

const GeneratePasswordResetLink = () => {
    return useSWRMutation('/api/me/resetpassword', fetcher<null>)
}

const ChangePasswordButton: FC = () => {
    const {trigger, isMutating} = GeneratePasswordResetLink()

    return (
        <Button
            isDisabled={isMutating}
            size="lg"
            color="danger"
            variant="shadow"
            onPress={async () => {
                await toast.promise(
                    trigger()
                        .catch((err: AxiosError) => err.response?.statusText ?? "Couldn't generate reset link!"),
                    {
                        loading: "Generating password reset link",
                        success: "Generated a password reset link for you! It has been sent your email, please check it. The link will expire in 15 minutes.",
                        error(msg: string) {
                            return msg
                        }
                    })
            }}
        >
            Change Password
        </Button>
    )
}

export default ChangePasswordButton