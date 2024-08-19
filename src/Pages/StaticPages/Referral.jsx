import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import ReferralForm from "./ReferralForm";
import PageTransition from "src/Animations/PageTransition";
import { Helmet } from "react-helmet";
const boxContent = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-12 text-blue-700 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),
    title: "Earn $1500",
    description:
      "For every successful referral that leads to a franchise purchase, you'll earn a $1,500 reward as a thank you for helping us grow our community.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-12 text-blue-700 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
        />
      </svg>
    ),
    title: "Exclusive Perks",
    description:
      "As a valued member of our Referral Ambassador Program, you'll enjoy exclusive perks and benefits, rewarding you for every successful franchise purchase you help facilitate.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-12 text-blue-700 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
        />
      </svg>
    ),
    title: "Easy Process",
    description:
      "Simply fill out the form, and we’ll handle the rest once the franchise purchase is completed.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-14 h-12 text-blue-700 mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    title: "Support and Guidance",
    description:
      "Receive full support and guidance throughout the referral process to ensure your success.",
  },
];

const listItems = [
  { text: "Earn $1,500 Only When a Franchise is Purchased" },
  { text: "Exclusive Rewards and Benefits" },
  { text: "Support Our Community Growth" },
  { text: "Easy and Quick Referral Process" },
];

const Referral = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>
          Make a Referral | International Franchise Business Consultant
        </title>
        <meta
          name="description"
          content="Refer a candidate to International Franchise Business Consultants. Help someone find the perfect franchise opportunity and receive rewards for your referral."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="bg-blue-100 "
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: "url(/images/banners/referralbanner.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          id="top"
          className="bg-white md:py-12 max-md:px-0 md:px-10 "
        >
          <div className="grid max-md:grid-cols-1 md:grid-cols-2 md:gap-28">
            <div className="flex flex-col justify-center items-center max-md:p-5 max-md:order-2 md:order-1">
              <div className="text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                  {boxContent.map((box, index) => (
                    <motion.div
                      key={index}
                      className="relative inline-block group bg-white p-8 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
                    >
                      <div className="flex items-center justify-center flex-col">
                        {box.icon}
                        <h2 className="text-2xl font-semibold text-blue-700 text-center">
                          {box.title}
                        </h2>
                        <p className="text-base leading-7 font-normal text-center mt-4">
                          {box.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 max-md:bg-white max-md:p-5 max-md:order-1 md:order-2">
              <ReferralForm />
            </div>
          </div>
        </motion.div>

        <Steps />
        <LastSection />
      </motion.div>
    </PageTransition>
  );
};

const LastSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-10 md:max-w-[95%] max-md:max-w-[90%] mx-auto bg-white p-10 rounded-3xl ">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
      >
        <img
          src="/images/photos/about7.png"
          alt="About Us"
          className="w-full h-auto object-cover max-h-[400px] rounded-md"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="my-3 flex flex-col justify-center"
      >
        <h3 className="text-custom-heading-color max-md:text-3xl md:text-4xl font-semibold mb-4 capitalize">
          We’re Here for You
        </h3>
        <h4 className="text-gray-600 text-md mb-6">
          Join Us Now and make a difference with IFBC. It’s simple to help our
          network grow, but remember, you’ll only earn $1,500 once your referral
          leads to an actual franchise purchase. IFBC is committed to supporting
          you as an Ambassador and will work closely with your clients to ensure
          they receive top-notch consulting services. You and your clients are
          in great hands with IFBC!
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6">
          <div className="flex flex-col">
            <motion.div className="uncommonlist md:mb-4">
              {listItems.slice(0, 2).map((item, index) => (
                <div className="listarea flex items-center mb-4" key={index}>
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-sm font-semibold text-gray-700 leading-4">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col">
            <motion.div className="uncommonlist mb-4">
              {listItems.slice(2).map((item, index) => (
                <div className="listarea flex items-center mb-4" key={index}>
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-sm font-semibold text-gray-700 leading-4">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <Link
          to="/ambassador/signup"
          className="candidate-btn md:w-72 max-md:w-full"
        >
          Join Now as an IFBC Ambassador
        </Link>
      </motion.div>
    </div>
  );
};

const Steps = () => {
  const steps = [
    {
      number: 1,
      headline: "Sign Up for Free",
      description:
        "Yes, it’s completely free to join our Ambassador program. Simply fill out the registration form to get started.",
    },
    {
      number: 2,
      headline: "Refer a Business Owner",
      description:
        "Talk to a business owner about the benefits of partnering with IFBC. Gather their business details and current franchise needs.",
    },
    {
      number: 3,
      headline: "Submit the Referral Information",
      description:
        "Share the business details with IFBC. You will only receive the $1,500 reward if the referred business owner purchases a franchise.",
    },
  ];

  return (
    <div className="service3-boxarea my-10 w-full md:max-w-[95%] max-md:max-w-[90%] mx-auto bg-white md:p-10 rounded-3xl">
      <div className="flex flex-col items-center">
        <div className="service3-text2 flex flex-col justify-center items-center p-4 lg:p-8">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
            <div className="text-center">
              <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                STEPS
              </p>
              <h3 className="max-md:text-3xl sm:text-5xl leading-normal font-semibold tracking-tight text-gray-900">
                How it <span className="text-custom-heading-color">Works?</span>
              </h3>
            </div>
            <div className="mt-20">
              <ul className="md:grid md:grid-cols-3 max-md:flex flex-col gap-16">
                {steps.map((step) => (
                  <li
                    key={step.number}
                    className="bg-gray-100 p-5 pb-10 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0 relative top-0 -mt-16">
                        <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-500 text-white border-4 border-white text-xl font-semibold">
                          {step.number}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg leading-6 font-semibold text-gray-900">
                          {step.headline}
                        </h4>
                        <p className="mt-2 text-base leading-6 text-gray-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
