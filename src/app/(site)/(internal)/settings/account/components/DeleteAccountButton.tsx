"use client"

import { Button } from "@nextui-org/react";
import {FC} from "react";

const DeleteAccountButton: FC = () => {
    return (
        <Button
            color="danger"
            variant="bordered"
            size="lg"
        >
            Delete Account
        </Button>
    )
}

export default DeleteAccountButton