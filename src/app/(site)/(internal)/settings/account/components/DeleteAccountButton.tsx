"use client"

import {Button, Checkbox, Spacer} from "@nextui-org/react";
import {FC, Fragment, useState} from "react";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {AnimatePresence, motion} from "framer-motion";
import Input from "@/app/(site)/components/inputs/Input";
import {signOut, useSession} from "next-auth/react";
import {deleteMutator} from "@/utils/client/client-utils";
import {DeleteSelfDto} from "@/app/api/me/self-user.dto";
import useSWRMutation from "swr/mutation";
import {Member} from "@prisma/client";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

const DeleteAccount = () => (
    useSWRMutation('/api/me', deleteMutator<DeleteSelfDto, Member>())
)

const DeleteAccountButton: FC = () => {
    const {data: session} = useSession()
    const [confirmationModelOpen, setConfirmationModelOpen] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [password, setPassword] = useState<string>()
    const {trigger: deleteAccount, isMutating: isDeleting} = DeleteAccount()

    return (
        <Fragment>
            <ConfirmationModal
                controlsDisabled={!isConfirmed || (session?.user.accountProvider === null && (!password || !password.length))}
                isOpen={confirmationModelOpen}
                title="Delete Your Account"
                size="2xl"
                onAccept={async () => {
                    await toast.promise(
                        deleteAccount({
                            body: {password}
                        })
                            .then(() => signOut())
                            .catch((err: AxiosError) => Promise.reject(err.response?.statusText ?? "There was an error deleting your account!"))
                        ,
                        {
                            loading: "Deleting your account...",
                            success: "Deleted your account!",
                            error(msg: string) {
                                return msg
                            }
                        }
                    )
                }}
                onReject={() => setConfirmationModelOpen(false)}
                acceptContent={"Delete Account"}
            >
                <p className="font-bold p-6 bg-danger/30 rounded-3xl w-fit phone:w-3/4 mb-6">Deleting your account is a
                    permanent action and cannot be undone! Are you sure you want to delete your password?</p>
                <Checkbox
                    isSelected={isConfirmed}
                    onValueChange={setIsConfirmed}
                >
                    I&apos;m sure
                </Checkbox>
                <AnimatePresence>
                    {isConfirmed && session?.user.accountProvider === null && (
                        <motion.div layout>
                            <Spacer y={6}/>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -50
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -50
                                }}
                            >
                                <Input
                                    id="password"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onValueChange={setPassword}
                                    isRequired
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </ConfirmationModal>
            <Button
                color="danger"
                variant="bordered"
                size="lg"
                onPress={() => setConfirmationModelOpen(true)}
            >
                Delete Account
            </Button>
        </Fragment>
    )
}

export default DeleteAccountButton