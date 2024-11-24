import * as React from "react";
import Link from 'next/link';
import { XMarkIcon } from "@heroicons/react/16/solid";

const Policy = () => {
  return (
    <div className="bg-white text-primary">
      <div className="container mx-3 my-3 p-8 relative">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Application Privacy Policy</h1>
            <p className="text-sm">Effective Date: August 17, 2024</p>
          </div>
          <Link href="/" className="text-white hover:text-gray-300">
            <XMarkIcon className="h-6 w-6 bg-primary" />
          </Link>
        </div>

            <h1 className="text-4xl font-bold mb-8">Application Privacy Policy</h1>
            <p className="mb-4"><strong>Effective Date:</strong> August 17, 2024</p>

            <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>This Privacy Policy outlines how Wefit365 collects, uses, discloses, and protects your personal information. By using Wefit365, you consent to the practices described in this policy.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <p>Wefit365 may collect the following types of personal information:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>Account Information:</strong> Your name, email address, and password.</li>
                    <li><strong>Usage Data:</strong> Information about how you use the app, such as your activities, preferences, and device information.</li>
                    <li><strong>Fitness Data:</strong> Information related to your fitness activities, including steps, distance, calories burned, sleep patterns, and body measurements.</li>
                    <li><strong>Health Data:</strong> Information related to your health, such as medical conditions or allergies.</li>
                    <li><strong>Location Data:</strong> Your approximate location information to provide relevant features and services.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p>Wefit365 may use your personal information for the following purposes:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li>To provide and improve the app's features and services.</li>
                    <li>To personalize your experience and provide tailored recommendations.</li>
                    <li>To communicate with you about updates, promotions, or other relevant information.</li>
                    <li>To analyze and understand how you use the app to improve its functionality.</li>
                    <li>To comply with legal requirements and protect our rights.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
                <p>Wefit365 may share your personal information with:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>Third-party service providers:</strong> We may engage third-party service providers to help us operate the app, such as analytics providers, cloud storage providers, and payment processors. These providers will only have access to your personal information as needed to perform their functions.</li>
                    <li><strong>Business partners:</strong> We may collaborate with business partners to offer joint promotions or services. In such cases, we may share your personal information with our partners, but only to the extent necessary to fulfill the purpose of the collaboration.</li>
                    <li><strong>Legal authorities:</strong> We may disclose your personal information to law enforcement agencies or other authorities if required by law or to protect our rights or the safety of others.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p>Wefit365 takes reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p>You may have certain rights regarding your personal information, such as the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at nhatlapross@gmail.com.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting a notice on the app or by other means.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy or our data practices, please contact us at nhatlapross@gmail.com.</p>
            </section>
        </div>
    </div>
  );
}


export default Policy;