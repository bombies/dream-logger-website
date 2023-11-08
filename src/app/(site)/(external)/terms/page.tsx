import {FC} from "react";
import {Link} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";

const TermsOfService: FC = () => {
    return (
        <main className="flex flex-col items-center py-32 phone:py-16">
            <h1 className="font-bold text-6xl phone:text-3xl mb-6">Terms of Service</h1>
            <article
                className="w-1/2 tablet:w-2/3 phone:w-5/6 bg-light-secondary border border-primary shadow-md dark:border-none dark:shadow-none dark:bg-secondary/40 rounded-3xl p-12 phone:px-6 text-justify">
                <h6 className="text-sm text-subtext mb-3">Last Updated: October 25, 2023</h6>
                <p>
                    {"These Terms of Service (\"Terms\") govern your access to and use of the DreamLogger website or mobile application (the \"Service\"). By using the Service, you agree to these Terms."}
                </p>
                <div className="space-y-12 mt-12">
                    <div>
                        <h3 className="font-bold text-2xl">Acceptance of Terms</h3>
                        <p>
                            {"By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Privacy Policy</h3>
                        <p>
                            {"Your use of the Service is also governed by our Privacy Policy, which is available "}
                            <Link href="/privacy">
                                here
                            </Link>
                            {"."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">User Accounts</h3>
                        <p>
                            {"To use certain features of the Service, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device. You agree to accept responsibility for all activities that occur under your account."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">User Content</h3>
                        <p>
                            {"You are solely responsible for the content you submit through the Service, including any text, images, or other material (\"User Content\"). You agree not to post User Content that is unlawful, offensive, or in violation of these Terms."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Intellectual Property</h3>
                        <p>
                            {"The Service and its original content, features, and functionality are owned by Ajani Green and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Termination</h3>
                        <p>
                            {"We reserve the right to terminate or suspend your account and access to the Service, with or without cause and without notice."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Disclaimers and Limitations of Liability</h3>
                        <p>
                            {"The Service is provided \"as is\" and \"as available\" without warranties of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Governing Law</h3>
                        <p>
                            {"These Terms are governed by and construed in accordance with the laws of Kingston, Jamaica."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Changes to Terms</h3>
                        <p>
                            {"We reserve the right to modify or replace these Terms at any time. The most current version will be posted on our website or within the Service."}
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-2xl">Contact Information</h3>
                        <p>
                            {"If you have any questions about these Terms, please contact us at ajani.green@outlook.com."}
                        </p>
                    </div>
                </div>
                <Divider className="my-12"/>
                <p>By using the Service, you acknowledge that you have read, understood, and agree to be bound by these
                    Terms.</p>
            </article>
        </main>
    )
}

export default TermsOfService