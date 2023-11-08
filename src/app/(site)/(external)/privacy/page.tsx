import {FC} from "react";
import {Spacer} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";

const PrivacyPolicy: FC = () => {
    return (
        <main className="flex flex-col items-center py-32 phone:py-16">
            <h1 className="font-bold text-6xl phone:text-3xl mb-6">Privacy Policy</h1>
            <article className="w-1/2 tablet:w-2/3 phone:w-5/6 bg-light-secondary border border-primary shadow-md dark:border-none dark:shadow-none dark:bg-secondary/40 rounded-3xl p-12 phone:px-6">
                <h6 className="text-sm text-subtext mb-3">Last Updated: November 2, 2023</h6>
                <p>
                    {
                        "DreamLogger (\"we\", \"our\", or \"us\") is committed to protecting the privacy of our users (\"you\" or \"your\"). This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you access or use our website or mobile application (the \"Service\"). By using the Service, you agree to the practices described in this Privacy Policy."
                    }
                </p>
                <div className="space-y-12 mt-12">
                    <div>
                        <h3 className="font-bold text-2xl">Data Collection</h3>
                        <p>
                            {
                                "Information You Provide: We collect information that you voluntarily provide when you create an account, update your profile, or interact with the Service. This may include your name, email address, and any other information you choose to submit."
                            }
                        </p>
                        <Spacer y={6}/>
                        <p>
                            {
                                "Automatically Collected Information: When you use the Service, we may collect information about your device and how you access and use the Service. This information may include your IP address, browser type, device type, and operating system."
                            }
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Data Storage and Security</h3>
                        <p>{"Secure Database: We use a secure PostgreSQL database to store user data."}</p>
                        <Spacer y={6}/>
                        <p>{"Data Encryption: All sensitive data stored is encrypted to ensure its security and confidentiality."}</p>
                        <Spacer y={6}/>
                        <p>{"Cookies: Secure cookies are employed to keep track of user sessions, enhancing the user experience and ensuring the security of your interactions with the Service."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Data Usage</h3>
                        <p>{"User Accounts: You have the option to create an account. We use the information you provide to authenticate your identity and provide you with access to your account and its features."}</p>
                        <Spacer y={6}/>
                        <p>{"Account Deletion: You have the right to delete your account at any time. You can do this instantly by accessing the account settings within the Service."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Cookies</h3>
                        <Spacer y={6}/>
                        <h4 className="font-semibold text-xl">User Authentication and Sessions</h4>
                        <p>We use cookies to enhance your experience and ensure the security of your user sessions.
                            These cookies are employed solely for the purpose of user authentication and session
                            management, and they are essential for the proper functioning of the Service. They do not
                            collect any personal information and are not used for any advertising or tracking purposes.
                            Our use of cookies for these specific functions is in line with industry standards to
                            maintain the security and integrity of your sessions. By using our Service, you agree to the
                            use of these cookies for authentication and session management. You may disable cookies in
                            your browser settings, but please be aware that this may affect your ability to use certain
                            features of the Service. For more information about cookies, please refer to your
                            browser&apos;s
                            help documentation.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Data Sharing</h3>
                        <p>{"We do not share your personal information with third parties for advertising purposes. However, please note that this policy is subject to change, and any future changes will be communicated to you through the Service."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Security</h3>
                        <p>{"We take data security seriously. While we use commercially acceptable means to protect your personal information, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Your Choices</h3>
                        <p>{"You have the right to access, update, and delete your personal information. If you wish to do so, please follow the instructions provided within the Service or contact us at ajani.green@outlook.com."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Changes to Privacy Policy</h3>
                        <p>{"We reserve the right to modify this Privacy Policy at any time. The most current version will be posted on our website or within the Service."}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Contact Information</h3>
                        <p>{"If you have any questions about this Privacy Policy or our data practices, please contact us at ajani.green@outlook.com."}</p>
                    </div>
                </div>
                <Divider className="my-6"/>
                <p>{"By using the Service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy."}</p>
            </article>
        </main>
    )
}

export default PrivacyPolicy