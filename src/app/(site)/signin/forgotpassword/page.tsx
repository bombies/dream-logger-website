"use client"

import {FC, Fragment, useCallback, useState} from "react";
import useSWRMutation from "swr/mutation";
import {fetcherWithArgs, handleAxiosError} from "@/utils/client/client-utils";
import Link from "next/link";
import Image from "@/app/(site)/components/Image";
import {CardBody} from "@nextui-org/card";
import Card from "@/app/(site)/components/Card";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import {Spacer} from "@nextui-org/react";

const SendPasswordResetRequest = () => {
    return useSWRMutation('/api/auth/forgotpassword', fetcherWithArgs<{
        email: string
    }, { url: string } | null>)
}

type FormProps = {
    email: string
}

const ForgotPasswordPage: FC = () => {
    const {trigger: sendRequest, isMutating: isSending} = SendPasswordResetRequest()
    const [submitted, setSubmitted] = useState(false)
    const {register, handleSubmit} = useForm<FormProps>()
    const [email, setEmail] = useState<string>()

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        sendRequest({
            body: {
                email: data.email
            }
        })
            .then(() => {
                setEmail(data.email)
                setSubmitted(true)
            })
            .catch(handleAxiosError)
    }, [sendRequest])

    return (
        <div className="flex justify-center py-24 h-full">
            <Card className="w-1/3 tablet:w-3/4 phone:w-[90%]">
                <CardBody>
                    <Link className="mx-auto my-6" href="/">
                        <Image
                            src="/images/DreamLoggerFull.png"
                            alt="Logo"
                            imgWidth={250} imgHeight={100}
                        />
                    </Link>
                    {
                        !submitted ? (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p className="mb-6 bg-primary/80 p-6 rounded-3xl">
                                    Forgot your password? Don&apos;t worry, it happens to the best of us.
                                    Enter your email address in the field below to start that password reset
                                    process.</p>
                                <div className="space-y-6">
                                    <Input
                                        isRequired
                                        register={register}
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        size="md"
                                        isDisabled={isSending}
                                    />
                                    <Button
                                        isDisabled={isSending}
                                        isLoading={isSending}
                                        type="submit"
                                        variant="shadow"
                                    >
                                        Request Password Reset
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <Fragment>
                                <p>{`If ${email} is an email of a registered user an email has been sent with a link to
                                    reset the password.`}</p>
                            </Fragment>
                        )
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage