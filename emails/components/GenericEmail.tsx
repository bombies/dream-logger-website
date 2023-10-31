import React, { FC } from "react";
import { Html, Head, Tailwind, Container, Body, Section, Img, Hr, Text } from "@react-email/components";
import { Button } from "@react-email/button";

type Props = React.PropsWithChildren & GenericEmailProps

export type GenericEmailProps = {
    intendedFor?: string
}

const GenericEmail: FC<Props> = ({ intendedFor, children }) => {
    return (
        <Html>
            <Head />
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#9E23FF",
                                secondary: "#1A002F",
                                danger: "#FF4A4A",
                                warning: "#ffa700",
                                subtext: "#828282"
                            }
                        }
                    }
                }}
            >
                <Body className="bg-[#0C0015] my-auto mx-auto font-sans text-[#EAE0FF]">
                    <Container
                        className="border border-solid border-secondary rounded w-[465px] my-20">
                        <Section
                            className="flex justify-center py-6"
                            style={{
                                backgroundImage: "linear-gradient(to right, #8F00FF, #270079)"
                            }}
                        >
                            <Button href="https://dreamlogger.ajani.me">
                                <Img
                                    src="https://i.imgur.com/BAdWxzw.png"
                                    width="200"
                                    height="70"
                                    alt="DreamLogger Logo"
                                    style={{
                                        objectFit: "contain"
                                    }}
                                />
                            </Button>
                        </Section>
                        <Section className="p-6">
                            {children}
                            <Hr className="my-6 bg-secondary text-secondary" />
                            <Section className="text-center text-subtext">
                                {intendedFor && <Text>This email is intended for <span
                                    className="text-primary">{intendedFor}</span></Text>}
                                <Text>&copy; 2023 Ajani Green. All rights reserved</Text>
                                <Text>DreamLogger.</Text>
                            </Section>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default GenericEmail;