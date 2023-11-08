import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.scss'
import 'intro.js/introjs.css';
import Providers from "@/app/(site)/components/providers/Providers";
import NavBar from "@/app/(site)/components/NavBar";
import Footer from "@/app/(site)/components/Footer";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Dream Logger',
    description: 'Your Personal Dream Journal and Character Odyssey',
    metadataBase: process.env.CANONICAL_URL ? new URL(process.env.CANONICAL_URL) : undefined,
    openGraph: {
        title: "DreamLogger",
        description: "Your Personal Dream Journal and Character Odyssey",
        images: 'url/opengraph-image.png'
    },
    twitter: {
        title: "DreamLogger",
        description: "Your Personal Dream Journal and Character Odyssey",
        images: 'url/opengraph-image.png'
    }
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en" className={inter.className}>
        <body className="bg-light text-dark dark:bg-dark dark:text-light">
        <Providers session={session}>
            <NavBar/>
            {children}
            <Footer/>
        </Providers>
        </body>
        </html>
    )
}
