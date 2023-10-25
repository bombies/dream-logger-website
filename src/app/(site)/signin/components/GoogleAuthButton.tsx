import {FC} from "react";
import Button from "@/app/(site)/components/Button";
import GoogleIcon from "@/app/(site)/components/icons/GoogleIcon";
import {signIn} from "next-auth/react";

type Props = {
    type: 'signin' | 'signup'
}

const GoogleAuthButton: FC<Props> = ({type}) => {
    return (
        <Button
            fullWidth
            color="secondary"
            startContent={<GoogleIcon/>}
            onPress={() => {
                signIn('google')
            }}
        >
            {type === 'signin' ? "Sign In" : "Sign Up"}
        </Button>
    )
}

export default GoogleAuthButton