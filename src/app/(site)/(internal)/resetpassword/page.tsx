"use client"

import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useSWRMutation from "swr/mutation";
import {handleAxiosError, patchMutator, postMutator} from "@/utils/client/client-utils";
import Input, {ValidationErrors} from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import Link from "next/link";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {SubmitHandler, useForm} from "react-hook-form";
import {PASSWORD_REGEX} from "@/app/api/auth/register/register.dto";
import toast from "react-hot-toast";
import {signOut, useSession} from "next-auth/react";
import {
    PasswordResetJWT,
    UpdatePasswordDto
} from "@/app/api/auth/forgotpassword/forgot-password.dto";
import {ResetPasswordDecodeAndCompareDto} from "@/app/api/me/resetpassword/reset-password.dto";
import {jwtDecode} from "jwt-decode";
import Logo from "@/app/(site)/components/logo/Logo";

const useValidAuthenticatedResetSession = () => {
    return useSWRMutation('/api/me/resetpassword', postMutator<ResetPasswordDecodeAndCompareDto, PasswordResetJWT | null>())
}

const useValidResetSession = () => {
    return useSWRMutation('/api/auth/forgotpassword', postMutator<ResetPasswordDecodeAndCompareDto, PasswordResetJWT | null>())
}

const UpdateAuthenticatedPassword = () => {
    return useSWRMutation('/api/me/resetpassword', patchMutator<UpdatePasswordDto, null>())
}

const UpdatePassword = () => {
    return useSWRMutation('/api/auth/forgotpassword', patchMutator<UpdatePasswordDto & { email: string }, null>())
}

type FormProps = {
    password: string,
    confirmedPassword: string,
}

const ResetPasswordPage: FC = () => {
    const {status: sessionStatus} = useSession()
    const searchParams = useSearchParams()
    const token = useMemo(() => searchParams.get("token"), [searchParams])
    const router = useRouter();
    const {register, handleSubmit} = useForm<FormProps>()
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

    const {
        trigger: validateAuthenticatedSession,
        data: validatedAuthenticatedState
    } = useValidAuthenticatedResetSession()
    const {
        trigger: updateAuthenticatedPassword,
        isMutating: isUpdatingAuthenticatedPassword
    } = UpdateAuthenticatedPassword()
    const {trigger: validateSession, data: validatedState} = useValidResetSession()
    const {trigger: updatePassword, isMutating: isUpdatingPassword} = UpdatePassword()

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        if (Object.keys(validationErrors).length != 0 || !token || !token.length)
            return;
        const {password} = data

        if (sessionStatus === "authenticated")
            await updateAuthenticatedPassword({
                body: {password, token}
            }).then(async () => {
                toast.success("Successfully updated your password! Please sign in again.")
                await signOut({
                    callbackUrl: "/settings/account"
                })
            })
                .catch(handleAxiosError)
        else
            await updatePassword({
                body: {
                    password, token,
                    // @ts-ignore
                    email: validatedState?.data.email ?? jwtDecode(token).email as string
                }
            })
                .then(() => {
                    toast.success("Successfully updated your password!")
                    router.push("/signin")
                })
                .catch(handleAxiosError)
    }, [router, sessionStatus, token, updateAuthenticatedPassword, updatePassword, validatedState?.data?.email, validationErrors])

    useEffect(() => {
        if (!token || !token.length)
            return router.back()

        if (sessionStatus === "authenticated")
            validateAuthenticatedSession({body: {token}})
                .catch(() => router.push("/"))
        else
            validateSession({body: {token}})
                .catch(() => router.push("/"))
    }, [router, searchParams, sessionStatus, token, validateAuthenticatedSession, validateSession])

    return (
        <div className="flex justify-center py-24 h-full">
            {
                validatedAuthenticatedState?.status || validatedState?.status === 200 && (
                    <Card className="w-1/3 tablet:w-3/4 phone:w-[90%]">
                        <CardBody>
                            <Link className="mx-auto my-6" href="/">
                                <Logo width={250} height={100} />
                            </Link>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-6">
                                    <Input
                                        isDisabled={isUpdatingAuthenticatedPassword || isUpdatingPassword}
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
                                        validation={{
                                            predicate(value) {
                                                if (!value)
                                                    return true
                                                return PASSWORD_REGEX.test(value)
                                            },
                                            errorMsg: "Password must have at least 8 characters with 1 uppercase character, 1 lowercase character and 1 number."
                                        }}
                                    />
                                    <Input
                                        isDisabled={isUpdatingAuthenticatedPassword || isUpdatingPassword}
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
                                        validation={{
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
                                        isDisabled={isUpdatingAuthenticatedPassword || isUpdatingPassword}
                                        isLoading={isUpdatingAuthenticatedPassword || isUpdatingPassword}
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