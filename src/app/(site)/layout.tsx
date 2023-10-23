import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.scss'
import Providers from "@/app/(site)/components/Providers";
import NavBar from "@/app/(site)/components/NavBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dream Logger',
  description: 'Your Personal Dream Journal and Character Odyssey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
    <body>
    <Providers>
      <NavBar />
      {children}
    </Providers>
    </body>
    </html>
  )
}
