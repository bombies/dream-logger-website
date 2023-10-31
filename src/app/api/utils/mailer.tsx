import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {ReactElement} from "react";
import ResetPasswordEmail from "../../../../emails/ResetPasswordEmail";

export default class Mailer {
    private static readonly transporter = nodemailer.createTransport({
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        }
    });

    private static defaultOptions: Mail.Options = {
        from: "\"DreamLogger\" <no-reply@robertify.me>"
    };

    public static async sendMail({to, subject, body}: {
        to: string | string[],
        subject: string,
        body: ReactElement
    }) {
        const ReactDOMServer = (await import("react-dom/server")).default;
        return Mailer.transporter.sendMail({
            ...Mailer.defaultOptions,
            subject,
            to,
            html: ReactDOMServer.renderToStaticMarkup(body)
        });
    }

    public static async sendPasswordReset(to: string, firstName: string, link: string) {
        return Mailer.sendMail({
            to,
            subject: "Password Reset",
            body: (
                <ResetPasswordEmail
                    intendedFor={to}
                    firstName={firstName}
                    resetLink={link}
                />
            )
        })
    }
}