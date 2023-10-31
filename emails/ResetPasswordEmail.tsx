import {FC} from "react";
import GenericEmail, {GenericEmailProps} from "./components/GenericEmail";
import {Heading, Section, Text} from "@react-email/components";

type Props = GenericEmailProps & {
    firstName: string,
    resetLink: string,
}

const ResetPasswordEmail: FC<Props> = ({
                                           intendedFor = "jdoe@example.com",
                                           firstName = "John",
                                           resetLink = "https://link.example"
                                       }) => {
    return (
        <GenericEmail intendedFor={intendedFor}>
            <Heading>
                Hello <span className="text-primary">{firstName}</span>,
            </Heading>
            <Section>
                <Text>
                    Please click <a href={resetLink}>here</a> to reset your password.
                </Text>
            </Section>
        </GenericEmail>
    )
}

export default ResetPasswordEmail