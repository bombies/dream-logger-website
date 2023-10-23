"use client";

import {FC, PropsWithChildren} from "react";
import {SWRConfig} from "swr";
import {ThemeProvider} from "next-themes";
import {NextUIProvider} from "@nextui-org/react";

type Props = PropsWithChildren & {
    session: any; // TODO: Replace with next-auth session
}

const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <SWRConfig value={{
            refreshInterval: 60 * 1000,
            revalidateOnFocus: false
        }}>
            <NextUIProvider>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </SWRConfig>
    )
}

export default Providers;