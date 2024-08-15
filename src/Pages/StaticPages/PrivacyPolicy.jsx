import React from "react";
import { Helmet } from "react-helmet";
import PageTransition from "src/Animations/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>
          Privacy Policy | International Franchise Business Consultant
        </title>
        <meta
          name="description"
          content="Review the privacy policy of International Franchise Business Consultants. Understand how we collect, use, and protect your personal information."
        />
      </Helmet>

      <div className="max-md:p-2 md:p-16">
        {/* Heading */}
        <h2 className="disclaimer-heading">Privacy Policy</h2>

        {/* Main content */}
        <div className=" max-md:text-[10px] md:text-lg">
          <p>
            This privacy policy has been compiled to better serve those who are
            concerned with how their ‘Personally identifiable information’ (PII)
            is being used online. PII, as used in US privacy law and information
            security, is information that can be used on its own or with other
            information to identify, contact, or locate a single person, or to
            identify an individual in context. Please read our privacy policy
            carefully to get a clear understanding of how we collect, use,
            protect or otherwise handle your Personally Identifiable Information
            in accordance with our website.
          </p>

          {/* Section: What personal information do we collect? */}
          <h3 className="disclaimer-heading">
            What personal information do we collect from the people that visit
            our blog, website or app?
          </h3>
          <p className=" max-md:text-[10px] md:text-lg">
            When ordering or registering on our site, as appropriate, you may be
            asked to enter your name, email address, phone number, credit card
            information or other details to help you with your experience.
          </p>

          {/* Section: When do we collect information? */}
          <h3 className="disclaimer-heading">
            When do we collect information?
          </h3>
          <p className=" max-md:text-[10px] md:text-lg">
            We collect information from you when you register on our site, place
            an order, subscribe to a newsletter, respond to a survey, fill out a
            form or enter information on our site.
          </p>

          {/* Section: How do we use your information? */}
          <h3 className="disclaimer-heading">
            How do we use your information?
          </h3>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>
              To personalize user’s experience and to allow us to deliver the
              type of content and product offerings in which you are most
              interested.
            </li>
            <li>To improve our website in order to better serve you.</li>
            <li>
              To allow us to provide better customer service by responding to
              your requests.
            </li>
            <li>
              To administer a contest, promotion, survey, or other site feature.
            </li>
            <li>To quickly process your transactions.</li>
            <li>
              To send periodic emails regarding your order or other products and
              services.
            </li>
          </ul>

          {/* Section: How do we protect visitor information? */}
          <h3 className="disclaimer-heading">
            How do we protect visitor information?
          </h3>
          <p className=" max-md:text-[10px] md:text-lg">
            Our website is scanned on a regular basis for security holes and
            known vulnerabilities in order to make your visit to our site as
            safe as possible. We use regular Malware Scanning.
          </p>
          <p className=" max-md:text-[10px] md:text-lg">
            Your personal information is contained behind secured networks and
            is only accessible by a limited number of people who have special
            access rights to such systems, and are required to keep the
            information confidential. In addition, all sensitive/credit
            information you supply is encrypted via Secure Socket Layer (SSL)
            technology.
          </p>
          <p className=" max-md:text-[10px] md:text-lg">
            We implement a variety of security measures when a user places an
            order enters, submits, or accesses their information to maintain the
            safety of your personal information. All transactions are processed
            through a gateway provider and are not stored or processed on our
            servers.
          </p>

          {/* Section: Do we use 'cookies'? */}
          <h3 className="disclaimer-heading">Do we use ‘cookies’?</h3>
          <p>
            Yes. Cookies are small files that a site or its service provider
            transfers to your computer’s hard drive through your Web browser (if
            you allow) that enables the site’s or service provider’s systems to
            recognize your browser and capture and remember certain information.
          </p>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>Help remember and process the items in the shopping cart.</li>
            <li>Understand and save user’s preferences for future visits.</li>
            <li>Keep track of advertisements.</li>
            <li>
              Compile aggregate data about site traffic and site interactions in
              order to offer better site experiences and tools in the future.
            </li>
          </ul>
          <p className=" max-md:text-[10px] md:text-lg">
            We may also use trusted third-party services that track this
            information on our behalf.
          </p>
          <p className=" max-md:text-[10px] md:text-lg">
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies. You do this
            through your browser settings. Each browser is a little different,
            so look at your browser’s Help menu to learn the correct way to
            modify your cookies.
          </p>
          <p className=" max-md:text-[10px] md:text-lg">
            If you disable cookies, some features will be disabled. It won’t
            affect the users experience that make your site experience more
            efficient and some of our services will not function properly.
          </p>

          {/* Section: Third Party Disclosure */}
          <h3 className="disclaimer-heading">Third Party Disclosure</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information unless we provide you with
            advance notice. This does not include website hosting partners and
            other parties who assist us in operating our website, conducting our
            business, or servicing you, so long as those parties agree to keep
            this information confidential. We may also release your information
            when we believe release is appropriate to comply with the law,
            enforce our site policies, or protect ours or others’ rights,
            property, or safety. However, non-personally identifiable visitor
            information may be provided to other parties for marketing,
            advertising, or other uses.
          </p>

          {/* Section: Third party links */}
          <h3 className="disclaimer-heading">Third party links</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            Occasionally, at our discretion, we may include or offer third party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We therefore have no
            responsibility or liability for the content and activities of these
            linked sites. Nonetheless, we seek to protect the integrity of our
            site and welcome any feedback about these sites.
          </p>

          {/* Section: Privacy Policy Link */}
          <h3 className="disclaimer-heading">Privacy Policy link</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            Our Privacy Policy link includes the word ‘Privacy’ and can easily
            be found on the page specified above.
          </p>

          {/* Section: Users will be notified of any privacy policy changes */}
          <h3 className="disclaimer-heading">
            Users will be notified of any privacy policy changes:
          </h3>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>On our Privacy Policy Page</li>
            <li>Users are able to change their personal information:</li>
            <li>By emailing us</li>
            <li>By calling us</li>
            <li>By logging in to their email accounts</li>
          </ul>

          {/* Section: How does our site handle do not track signals? */}
          <h3 className="disclaimer-heading">
            How does our site handle do not track signals?
          </h3>
          <p className=" max-md:text-[10px] md:text-lg">
            We honor do not track signals and do not track, plant cookies, or
            use advertising when a Do Not Track (DNT) browser mechanism is in
            place.
          </p>

          {/* Section: Does our site allow third party behavioral tracking? */}
          <h3 className="disclaimer-heading">
            Does our site allow third party behavioral tracking?
          </h3>
          <p className=" max-md:text-[10px] md:text-lg">
            It’s also important to note that we do not allow third party
            behavioral tracking.
          </p>

          {/* Section: Fair Information Practices */}
          <h3 className="disclaimer-heading">Fair Information Practices</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            The Fair Information Practices Principles form the backbone of
            privacy law in the United States and the concepts they include have
            played a significant role in the development of data protection laws
            around the globe. Understanding the Fair Information Practice
            Principles and how they should be implemented is critical to
            complying with the various privacy laws that protect personal
            information.
          </p>
          <p className=" max-md:text-[10px] md:text-lg">
            In order to be in line with Fair Information Practices we will take
            the following responsive action, should a data breach occur:
          </p>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>We will notify the users via email within 7 business days</li>
            <li>
              We will notify the users via in-site notification within 7
              business days
            </li>
            <li>
              We also agree to the individual redress principle, which requires
              that individuals have a right to pursue legally enforceable rights
              against data collectors and processors who fail to adhere to the
              law. This principle requires not only that individuals have
              enforceable rights against data users, but also that individuals
              have recourse to courts or a government agency to investigate
              and/or prosecute non-compliance by data processors.
            </li>
          </ul>

          {/* Section: CAN SPAM Act */}
          <h3 className="disclaimer-heading">CAN SPAM Act</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            The CAN-SPAM Act is a law that sets the rules for commercial email,
            establishes requirements for commercial messages, gives recipients
            the right to have emails stopped from being sent to them, and spells
            out tough penalties for violations.
          </p>
          <p>We collect your email address in order to:</p>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>
              Send information, respond to inquiries, and/or other requests or
              questions
            </li>
            <li>
              Process orders and to send information and updates pertaining to
              orders.
            </li>
            <li>
              We may also send you additional information related to your
              product and/or service.
            </li>
          </ul>
          <p>To be in accordance with CANSPAM we agree to the following:</p>
          <ul className="list-disc ml-6 max-md:text-[10px] md:text-lg">
            <li>
              If at any time you would like to unsubscribe from receiving future
              emails, you can email us at{" "}
              <a href="mailto:info@ifbc.co">info@ifbc.co</a> and we will
              promptly remove you from ALL correspondence.
            </li>
          </ul>

          {/* Section: Changes */}
          <h3 className="disclaimer-heading">Changes</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            The company reserves the right to change, amend or update this
            privacy policy at any time. By using this website, you are agreeing
            not only to the privacy policy as viewed now but also to any future
            changes or updates to this privacy policy. Therefore, Company
            recommends you view this privacy policy periodically to ensure you
            are familiar with it and any changes.
          </p>

          {/* Section: Contacting Us */}
          <h3 className="disclaimer-heading">Contacting Us</h3>
          <p className=" max-md:text-[10px] md:text-lg">
            If there are any questions regarding this privacy policy, you may
            contact us using the information below:
          </p>
          <address className="not-italic">
            International Franchise Business Consultant Corp. (
            <a href="https://www.ifbc.co" className="underline">
              www.ifbc.co
            </a>
            )<br />
            9350 Wilshire Blvd, Suite 203
            <br />
            Beverly Hills, CA 90212 United States
            <br />
            <a href="mailto:info@ifbc.co">info@ifbc.co</a>
            <br />
            1-800-927-0203
          </address>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
