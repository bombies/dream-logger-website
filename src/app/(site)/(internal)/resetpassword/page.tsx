"use client"

import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useSWRMutation from "swr/mutation";
import {handleAxiosError, patchMutator, postMutator} from "@/utils/client/client-utils";
import {DecodeAndCompareDto, UpdatePasswordDto} from "@/app/api/me/resetpassword/reset-password.dto";
import Input, {ValidationErrors} from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import Image from "@/app/(site)/components/Image";
import Link from "next/link";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {SubmitHandler, useForm} from "react-hook-form";
import {PASSWORD_REGEX} from "@/app/api/auth/register/register.dto";
import toast from "react-hot-toast";
import {signOut} from "next-auth/react";

const useValidResetSession = () => {
    return useSWRMutation('/api/me/resetpassword', postMutator<DecodeAndCompareDto, null>())
}

const UpdatePassword = () => {
    return useSWRMutation('/api/me/resetpassword', patchMutator<UpdatePasswordDto, null>())
}

type FormProps = {
    password: string,
    confirmedPassword: string,
}

const ResetPasswordPage: FC = () => {
    const searchParams = useSearchParams()
    const token = useMemo(() => searchParams.get("token"), [searchParams])
    const router = useRouter();
    const {trigger: validateSession, data: validatedState} = useValidResetSession()
    const {register, handleSubmit} = useForm<FormProps>()
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const {trigger: updatePassword, isMutating: isUpdating} = UpdatePassword()

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        if (Object.keys(validationErrors).length != 0 || !token || !token.length)
            return;
        const {password} = data
        await updatePassword({
            body: {password, token}
        }).then(async () => {
            toast.success("Successfully updated your password! Please sign in again.")
            await signOut({
                callbackUrl: "/settings/account"
            })
        })
            .catch(handleAxiosError)
    }, [token, updatePassword, validationErrors])

    useEffect(() => {
        if (!token || !token.length)
            return router.back()

        validateSession({body: {token}})
            .catch(() => router.push("/"))
    }, [router, searchParams, token, validateSession])

    return (
        <div className="flex justify-center py-24 h-full">
            {
                validatedState?.status === 200 && (
                    <Card className="w-1/3 tablet:w-3/4 phone:w-[90%]">
                        <CardBody>
                            <Link className="mx-auto my-6" href="/">
                                <Image
                                    src="/images/DreamLoggerFull.png"
                                    alt="Logo"
                                    imgWidth={250} imgHeight={100}
                                />
                            </Link>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <Input
                                        isDisabled={isUpdating}
                                        register={register}
                                        isRequired
                                        id="password"
                                        label="New Password"
                                        type="password"
                                        size="md"
                                        value={password}
                                        onValueChange={setPassword}
                                        minLength={2}
                                        maxLength={32}
                                        setValidationErrors={setValidationErrors}
                                        validate={{
                                            predicate(value) {
                                                if (!value)
                                                    return true
                                                return PASSWORD_REGEX.test(value)
                                            },
                                            errorMsg: "Password must have at least 8 characters with 1 uppercase character, 1 lowercase character and 1 number."
                                        }}
                                    />
                                    <Input
                                        isDisabled={isUpdating}
                                        register={register}
                                        isRequired
                                        id="confirmedPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        size="md"
                                        value={confirmedPassword}
                                        onValueChange={setConfirmedPassword}
                                        minLength={2}
                                        maxLength={32}
                                        setValidationErrors={setValidationErrors}
                                        validate={{
                                            predicate(value) {
                                                if (!value)
                                                    return true;
                                                return password === confirmedPassword
                                            },
                                            errorMsg: "Passwords must match."
                                        }}
                                    />
                                    <Divider/>
                                    <Button
                                        fullWidth
                                        isDisabled={isUpdating}
                                        isLoading={isUpdating}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                )
            }
        </div>
    )
}

export default ResetPasswordPage