"use client"

import {FC, useCallback, useState} from "react";
import Input, {ValidationErrors} from "@/app/(site)/components/inputs/Input";
import {Button} from "@nextui-org/button";
import {PASSWORD_REGEX, RegisterUserDto, USERNAME_REGEX} from "@/app/api/auth/register/register.dto";
import {SubmitHandler, useForm} from "react-hook-form";
import axios, {AxiosError} from "axios";
import useSWRMutation from "swr/mutation";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

type FormProps = RegisterUserDto & {
    confirmedPassword: string
}

type RegisterUserArgs = {
    arg: {
        dto: RegisterUserDto
    }
}

const RegisterUser = () => {
    const mutator = (url: string, {arg}: RegisterUserArgs) => axios.post(url, arg.dto)
    return useSWRMutation("/api/auth/register", mutator)
}

const RegisterForm: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormProps>()
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const {trigger: registerUser, isMutating: userIsRegistering} = RegisterUser()

    const submitHandler: SubmitHandler<FormProps> = useCallback((data) => {
        if (Object.keys(validationErrors).length != 0)
            return;
        const {confirmedPassword, ...dto} = data
        registerUser({dto})
            .then(async () => {
                toast.success("Successfully registered your account! Now sending you the dashboard...")
                await signIn("credentials", {
                    email: dto.email,
                    password: dto.password,
                    callbackUrl: "/dashboard"
                })
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    const errorText = err.response?.statusText
                    toast.error(errorText ?? "Something went wrong!")
                    if (!errorText)
                        console.error(err)
                } else {
                    console.error(err);
                    toast.error("Something went wrong!")
                }
            })
    }, [registerUser, validationErrors])

    return (
        <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-y-6"
        >
            <div className="flex phone:flex-col gap-6">
                <Input
                    id="firstName"
                    register={register}
                    errors={errors}
                    labelPlacement="outside"
                    isRequired
                    label={"First Name"}
                    placeholder="John"
                    minLength={1}
                    isDisabled={userIsRegistering}
                    isClearable
                    maxLength={60}
                />
                <Input
                    id="lastName"
                    register={register}
                    errors={errors}
                    labelPlacement="outside"
                    isRequired
                    label={"Last Name"}
                    isDisabled={userIsRegistering}
                    placeholder="Doe"
                    minLength={1}
                    isClearable
                    maxLength={60}
                />
            </div>
            <Input
                id="username"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Username"}
                placeholder="FriendlyDragon123"
                minLength={2}
                maxLength={32}
                isDisabled={userIsRegistering}
                isClearable
                setValidationErrors={setValidationErrors}
                validate={{
                    predicate(value) {
                        if (!value)
                            return true
                        return USERNAME_REGEX.test(value)
                    },
                    errorMsg: "Invalid username!"
                }}
            />
            <Input
                id="email"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Email"}
                type="email"
                isClearable
                isDisabled={userIsRegistering}
                placeholder="johndoe@email.com"
            />
            <Input
                id="password"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Password"}
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
                isDisabled={userIsRegistering}
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
                id="confirmedPassword"
                register={register}
                errors={errors}
                labelPlacement="outside"
                isRequired
                label={"Confirm Password"}
                placeholder="Confirm your password"
                type="password"
                value={confirmedPassword}
                onValueChange={setConfirmedPassword}
                setValidationErrors={setValidationErrors}
                isDisabled={userIsRegistering}
                validate={{
                    predicate(value) {
                        if (!value)
                            return true;
                        return password === confirmedPassword
                    },
                    errorMsg: "Passwords must match."
                }}
            />
            <Button
                type="submit"
                variant="shadow"
                isDisabled={userIsRegistering}
                isLoading={userIsRegistering}
            >Register</Button>
        </form>
    )
}

export default RegisterForm