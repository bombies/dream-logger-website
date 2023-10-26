import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '../globals.scss'
import Providers from "@/app/(site)/components/Providers";
import NavBar from "@/app/(site)/components/NavBar";
import Footer from "@/app/(site)/components/Footer";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Dream Logger',
    description: 'Your Personal Dream Journal and Character Odyssey',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en" className={inter.className}>
        <body>
        <Providers session={session}>
            <NavBar/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}