"use client";

import {FC, PropsWithChildren} from "react";
import {SWRConfig} from "swr";
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {AppProgressBar} from "next-nprogress-bar";
import {Toaster} from "react-hot-toast";

type Props = PropsWithChildren & {
    session: Session | null;
}

const Providers: FC<Props> = ({children, session}) => {
    return (
        <SWRConfig value={{
            refreshInterval: 60 * 1000,
            revalidateOnFocus: false
        }}>
            <NextUIProvider>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <SessionProvider session={session}>
                        <AppProgressBar
                            height="4px"
                            color="#9E23FF"
                            options={{ showSpinner: true }}
                            shallowRouting
                        />
                        <Toaster
                            position="top-center"
                            reverseOrder
                            toastOptions={{
                                className: `
                                        bg-secondary/90
                                        backdrop-blur-sm p-6
                                        min-w-96 max-w-[32rem]
                                        flex
                                        gap-4
                                        justify-between`,
                                style: {
                                    background: "#100f1090",
                                    color: "#ffffff",
                                    border: "2px solid #00000005",
                                    borderRadius: "1.5rem",
                                    padding: "1.5rem"
                                }
                            }}
                        />
                        {children}
                    </SessionProvider>
                </ThemeProvider>
            </NextUIProvider>
        </SWRConfig>
    )
}

export default Providers;