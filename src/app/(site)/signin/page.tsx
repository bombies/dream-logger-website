"use client"

import {FC, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Tab, Tabs} from "@nextui-org/react";
import GoogleAuthButton from "@/app/(site)/signin/components/GoogleAuthButton";
import RegisterForm from "@/app/(site)/signin/components/RegisterForm";
import LogInForm from "@/app/(site)/signin/components/LogInForm";

const SignInPage: FC = () => {
    const {data: sessionData, status: sessionStatus} = useSession()
    const router = useRouter()

    useEffect(() => {
        console.log(sessionStatus, sessionData)
        if (sessionStatus !== 'loading' && sessionData !== null)
            router.push("/dashboard")
    }, [router, sessionData, sessionStatus])

    return (
        <main className="flex justify-center py-24 h-full">
            {sessionStatus === "unauthenticated" &&
                <Card className="w-1/2 tablet:w-3/4 phone:w-[90%]">
                    <CardBody>
                        <Tabs
                            size="lg"
                            aria-label="Sign In Options"
                            color="primary"
                            variant="light"
                            classNames={{
                                base: "justify-center",
                                tabList: "bg-secondary gap-8",
                                tabContent: "text-[#EAE0FF]"
                            }}
                        >
                            <Tab key="signin" title="Sign In" className="flex flex-col items-center">
                                <div className="w-1/2 tablet:w-3/4 phone:w-[90%]">
                                    <Divider className="mb-6"/>
                                    <LogInForm/>
                                    <Divider className="my-6"/>
                                    <GoogleAuthButton type='signin'/>
                                </div>
                            </Tab>
                            <Tab key="register" title="Register" className="flex flex-col items-center">
                                <div className="w-1/2 tablet:w-3/4 phone:w-[90%]">
                                    <Divider className="mb-6"/>
                                    <RegisterForm/>
                                    <Divider className="my-6"/>
                                    <GoogleAuthButton type='signup'/>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            }
        </main>
    )
}

export default SignInPage