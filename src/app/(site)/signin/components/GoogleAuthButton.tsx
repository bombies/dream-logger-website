"use client"

import {FC} from "react";
import Button from "@/app/(site)/components/Button";
import GoogleIcon from "@/app/(site)/components/icons/GoogleIcon";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

type Props = {
    isDisabled?: boolean,
    type: 'signin' | 'signup'
}

const GoogleAuthButton: FC<Props> = ({isDisabled, type}) => {
    const router = useRouter()

    return (
        <Button
            isDisabled={isDisabled}
            fullWidth
            color="secondary"
            startContent={<GoogleIcon/>}
            onPress={() => {
                signIn('google', {
                    callbackUrl: "/dashboard"
                })
            }}
        >
            {type === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
    )
}

export default GoogleAuthButton