"use client"

import {FC} from "react";
import {Button} from "@nextui-org/button";

const ChangePasswordButton: FC = () => {
    return (
        <Button
            size="lg"
            color="danger"
            variant="shadow"
        >
            Change Password
        </Button>
    )
}

export default ChangePasswordButton