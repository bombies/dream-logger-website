"use client"

import {useRouter} from "next/navigation";
import Card from "@/app/(site)/components/Card";
import {CardBody} from "@nextui-org/card";
import Image from "@/app/(site)/components/Image";
import Link from "next/link";
import {Spacer} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import HomeIcon from "@/app/(site)/components/icons/HomeIcon";
import DoubleBackIcon from "@/app/(site)/components/icons/DoubleBackIcon";

export default function NotFound() {
    const router = useRouter()

    return (
        <main
            className="flex flex-col items-center justify-center h-screen w-full"
        >
            <Image
                priority
                src="/images/bg-2.png"
                alt=''
                className="!absolute w-full h-full top-0 left-0 opacity-30 pointer-events-none"
                fill
                style={{
                    objectFit: "cover"
                }}
            />
            <Card
                isBlurred
                className="z-10"
                classNames={{
                    body: "p-12 bg-secondary/70"
                }}
            >
                <CardBody>
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <Image
                                src="/images/DreamLoggerFull.png"
                                alt="Logo"
                                imgWidth={150} imgHeight={75}
                            />
                        </Link>
                    </div>
                    <h1 className="text-9xl phone:text-6xl font-bold text-center text-primary">404</h1>
                    <h3 className="text-center text-3xl phone:text-xl">The page you were looking for doesn&apos;t seem to exist...</h3>
                    <Spacer y={6}/>
                    <div className="justify-center phone:items-center flex gap-4 phone:flex-col">
                        <Button
                            variant="shadow"
                            as={Link}
                            href="/"
                            startContent={<HomeIcon width={16} />}
                        >
                            Go Home
                        </Button>
                        <Button
                            variant="flat"
                            onPress={() => router.back()}
                            startContent={<DoubleBackIcon width={16} />}
                        >
                            Go Back
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </main>
    )
}