"use client"

import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Link, Spacer} from "@nextui-org/react";

type FormProps = {
    email: string,
    password: string
}

const LogInForm: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormProps>()
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const router = useRouter()

    const submitHandler: SubmitHandler<FormProps> = useCallback((data) => {
        setIsAuthenticating(true)

        signIn("credentials", {
            ...data,
            redirect: false
        })
            .then((cb) => {
                if (cb?.error)
                    toast.error("Invalid credentials! Please check your details and try again.")
                else if (cb?.ok) {
                    toast.success("Logged in!")
                    router.push("/dashboard")
                }
            })
            .finally(() => setIsAuthenticating(false))
    }, [router])

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-y-6"
        >
            <Input
                id="email"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Email or Username"}
                placeholder="FriendlyDragon123, john.doe@exmaple.com"
                minLength={2}
                maxLength={32}
                isDisabled={isAuthenticating}
                isClearable
            />
            <Input
                id="password"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Password"}
                placeholder="Enter your password..."
                type="password"
                minLength={2}
                maxLength={32}
                isDisabled={isAuthenticating}
            />
            <Link
                className="text-xs"
                href="/signin/forgotpassword"
                color="primary"
            >Forgot your password?</Link>
            <Button
                type="submit"
                variant="shadow"
                isDisabled={isAuthenticating}
                isLoading={isAuthenticating}
            >Sign In</Button>
        </form>
    )
}

export default LogInForm