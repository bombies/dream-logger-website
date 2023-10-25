"use client";

import Button from "@/app/(site)/components/Button";
import {Montserrat} from "next/font/google";
import clsx from "clsx";
import DownArrowIcon from "@/app/(site)/components/icons/DownArrowIcon";
import Image from "@/app/(site)/components/Image";
import trackDreamImg from '@/../../public/images/trackDreamImg.svg';
import categorizeDreamImg from '@/../../public/images/categorizeDreamImg.svg';
import {FC, useRef, useState} from "react";
import {AnimationPlaybackControls, motion, useAnimate} from "framer-motion";

const montserrat = Montserrat({
    subsets: ["latin"]
})

export default function Home() {
    const aboutRef = useRef<HTMLDivElement>(null)

    return (
        <main>
            <section aria-label="Hero"
                     className={`
          bg-[#1F0032] p-20 phone:px-8 phone:pt-16 overflow-x-hidden`}
            >
                <div className="flex gap-64 laptop-big:gap-28 phone:gap-10 tablet:flex-col ">
                    <div>
                        <div className="flex tablet:justify-center">
                            <Image
                                src="/images/DreamLoggerFull.png"
                                alt="Logo"
                                imgWidth={1000} imgHeight={250}
                                fadeIn
                            />
                        </div>
                        <motion.h3
                            className={clsx(montserrat.className, "laptop-min:ml-6 tablet:text-center tablet:text-lg phone:text-sm font-light laptop-min:max-w-lg text-justify")}
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            viewport={{once: true}}
                        >
                            Transform every night&apos;s slumber into a captivating story. Unveil the hidden narratives
                            of your dreams, track recurring characters, and explore the tapestry of your emotions. Start
                            your journey into the subconscious, and let your dreams inspire your waking life.
                        </motion.h3>
                    </div>
                    <div className="self-center">
                        <StartDreamingButton/>
                    </div>
                </div>
                <div className="flex justify-center mt-12">
                    <Button
                        isIconOnly
                        className="animate-bounce rounded-full"
                        color="default"
                        variant="light"
                        onPress={() => aboutRef.current?.scrollIntoView({
                            behavior: "smooth"
                        })}
                    >
                        <DownArrowIcon/>
                    </Button>
                </div>
            </section>
            <section ref={aboutRef} id="about" className="py-16 px-32 phone:px-8 flex flex-col gap-32 items-center">
                <article className="flex gap-8 tablet:flex-col max-w-4xl w-full">
                    <div>
                        <h3 className="text-3xl font-semibold mb-3">Track Every Dream</h3>
                        <p className="max-w-xl text-justify">Dream Logger is the ultimate tool for dream enthusiasts,
                            offering a seamless way to record every dream you experience. Dream Logger makes it easy to
                            keep a comprehensive dream journal. Your dreams are unique and fascinating, and with Dream
                            Logger, you can ensure that none of them slip through the cracks, offering you a chance to
                            analyze, reflect, and draw inspiration from your nightly adventures.</p>
                    </div>
                    <Image
                        src={trackDreamImg}
                        alt={"Track Dream Image"}
                        className="tablet:w-full w-[32rem]"
                        fadeIn
                    />
                </article>
                <article className="flex flex-row-reverse gap-8 tablet:flex-col max-w-4xl w-full">
                    <div>
                        <h3 className="text-3xl font-semibold mb-3">Categorize Your Dreams</h3>
                        <p className="max-w-xl text-justify">With Dream Logger&apos;s dream categorization feature, your
                            dream journal becomes a powerful tool for self-reflection and self-discovery. You have the
                            freedom to create custom tags for your dreams, allowing you to categorize them in ways that
                            are personally meaningful. Whether you want to group dreams by themes, recurring symbols, or
                            emotions, Dream Logger empowers you to organize and access your dreams with ease.</p>
                    </div>
                    <Image
                        src={categorizeDreamImg}
                        alt={"Categorize Dream Image"}
                        className="tablet:w-full w-[32rem]"
                        fadeIn
                    />
                </article>
            </section>
        </main>
    )
}

const StartDreamingButton: FC = () => {
    const [scope, animate] = useAnimate()
    const [currentAnimation, setCurrentAnimation] = useState<AnimationPlaybackControls>()

    return (
        <button
            ref={scope}
            onMouseEnter={() => {
                const animation = animate([
                    [scope.current, {
                        scale: 1.2,
                        rotate: 2.5,
                        filter: "drop-shadow(0px 2px 10px rgba(82, 0, 255, 0.25))"
                    }],
                    [scope.current, {
                        scale: 1.2,
                        rotate: 2.5,
                        filter: "drop-shadow(0px 2px 15px rgba(95, 0, 255, 0.25))"
                    }],
                    [scope.current, {
                        scale: 1.2,
                        rotate: 2.5,
                        filter: "drop-shadow(0px 2px 15px rgba(150, 0, 255, 0.25))"
                    }],
                ], {
                    duration: 1,
                })

                setCurrentAnimation(animation)
            }}
            onMouseLeave={() => {
                const animation = animate([
                    [scope.current, {scale: 1, rotate: 0, filter: "drop-shadow(0px 2px 15px rgba(82, 0, 255, 0))"}],
                ])

                setCurrentAnimation(animation)
            }}
            className='bg-gradient-to-r from-[#8F00FF] to-[#270079] font-semibold px-16 py-6 rounded-xl'
            style={{
                filter: "drop-shadow(0px 2px 10px rgba(82, 0, 255, 0))"
            }}
        >
            Start Dreaming
        </button>
    )
}
