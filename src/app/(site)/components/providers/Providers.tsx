"use client";

import {FC, PropsWithChildren} from "react";
import {SWRConfig} from "swr";
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {AppProgressBar} from "next-nprogress-bar";
import {Toaster} from "react-hot-toast";
import UserProvider from "@/app/(site)/components/providers/user-data/UserProvider";
import TutorialsProvider from "@/app/(site)/(internal)/dashboard/components/TutorialsProvider";
import DarkModeProvider from "@/app/(site)/components/providers/DarkModeProvider";

type Props = PropsWithChildren & {
    session: Session | null;
}

const Providers: FC<Props> = ({children, session}) => {
    return (
        <SWRConfig value={{
            refreshInterval: 1000 * 60
        }}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <DarkModeProvider>
                    <NextUIProvider>
                        <SessionProvider session={session}>
                            <UserProvider>
                                <TutorialsProvider>
                                    <AppProgressBar
                                        height="4px"
                                        color="#9E23FF"
                                        options={{showSpinner: true}}
                                        shallowRouting
                                    />
                                    <Toaster
                                        position="top-center"
                                        reverseOrder
                                        toastOptions={{
                                            className: `
                                            text-dark dark:text-light
                                        bg-light-secondary/90 border border-primary
                                        dark:border-primary/40
                                        dark:bg-dark/90
                                        backdrop-blur-sm p-6
                                        min-w-96 max-w-[32rem]
                                        flex
                                        gap-4
                                        justify-between`,
                                            style: {
                                                borderRadius: "1.5rem",
                                                padding: "1.5rem"
                                            }
                                        }}
                                    />
                                    {children}
                                </TutorialsProvider>
                            </UserProvider>
                        </SessionProvider>
                    </NextUIProvider>
                </DarkModeProvider>
            </ThemeProvider>
        </SWRConfig>
    )
}

export default Providers;