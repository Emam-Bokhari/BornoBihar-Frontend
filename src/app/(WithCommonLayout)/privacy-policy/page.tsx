import Container from "@/components/shared/Container";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <Container className="my-12">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Welcome to <strong>BornoBihar</strong>. We value the privacy of our
        visitors and customers, and we are committed to protecting your personal
        information. This Privacy Policy outlines how we collect, use, and
        safeguard your personal data when you visit our website
        [yourwebsite.com], purchase products, or interact with our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        1. Information We Collect
      </h2>

      <h3 className="text-xl font-semibold mt-4">Personal Information</h3>
      <p className="mb-4">
        We may collect personal information from you when you use our website,
        such as:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Name</li>
        <li>Email Address</li>
        <li>Shipping Address</li>
        <li>Payment Information</li>
        <li>Phone Number</li>
        <li>Order History</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Non-Personal Information</h3>
      <p className="mb-4">
        We also collect non-personal information automatically when you visit
        our website, including:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>IP Address</li>
        <li>Browser Type and Version</li>
        <li>Device Information</li>
        <li>Pages Visited on the Website</li>
        <li>Time Spent on Pages</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the information we collect to provide and improve our services,
        including:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Processing orders: To fulfill and ship your purchases.</li>
        <li>
          Customer service: To respond to your inquiries and provide support.
        </li>
        <li>
          Marketing: To send you promotional emails, newsletters, and offers
          (you can opt-out at any time).
        </li>
        <li>
          Website improvements: To enhance user experience and troubleshoot any
          issues.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Security</h2>
      <p className="mb-4">
        We implement a variety of security measures to ensure the protection of
        your personal information. These measures include encryption
        technologies and access controls to protect against unauthorized access,
        alteration, or disclosure of your personal data.
      </p>
      <p className="mb-4">
        However, please be aware that no method of internet transmission or
        electronic storage is 100% secure. While we strive to protect your
        personal information, we cannot guarantee its absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        4. Sharing Your Information
      </h2>
      <p className="mb-4">
        We may share your information with trusted third-party service providers
        who assist us in operating our website, processing payments, or
        delivering products. These third parties are obligated to protect your
        personal data and are prohibited from using it for any other purpose.
      </p>
      <p className="mb-4">
        We will never sell or rent your personal data to third parties for
        marketing purposes without your consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance your browsing experience. Cookies
        are small files stored on your device that help us remember your
        preferences and understand how you interact with our website. You can
        control cookies through your browser settings. If you disable cookies,
        some features of the website may not function properly.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
      <p className="mb-4">You have the right to:</p>
      <ul className="list-disc pl-5 mb-4">
        <li>
          Access your personal information: Request a copy of the personal data
          we hold about you.
        </li>
        <li>
          Update or correct your information: Request changes or updates to your
          personal data.
        </li>
        <li>
          Delete your data: Request the deletion of your personal data (subject
          to applicable legal obligations).
        </li>
        <li>
          Opt-out of marketing communications: You can unsubscribe from our
          marketing emails at any time.
        </li>
      </ul>
      <p className="mb-4">
        If you would like to exercise any of these rights, please contact us at
        [Your Contact Email].
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these external
        sites. We encourage you to review the privacy policies of any
        third-party websites you visit.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        8. {`Children's`} Privacy
      </h2>
      <p className="mb-4">
        Our website is not intended for children under the age of 13, and we do
        not knowingly collect personal information from children. If you believe
        we have collected personal information from a child under 13, please
        contact us immediately, and we will take steps to delete that
        information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        9. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal requirements. We will notify you of any
        significant changes by posting an updated policy on this page. The
        revised policy will be effective as of the date it is posted.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about our Privacy Policy, or if
        you would like to exercise your rights under this policy, please contact
        us at:
      </p>
      <p className="mb-4">
        <strong>Email</strong>: bornobihar@gmail.com <br />
        <strong>Address</strong>: Dhaka, Bangladesh <br />
        <strong>Phone</strong>: +880 131 577 3424
      </p>
    </Container>
  );
}
