import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const BecomeConsultant = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-blue-50 py-10 px-5 sm:px-10 md:px-20 lg:px-40 max-sm:px-5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        >
          <img
            src="/public/images/photos/about7.png"
            alt="About Us"
            className="w-full h-auto object-cover md:h-[500px] lg:h-[600px] xl:h-[700px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="my-3"
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-blue-700 text-4xl font-bold mb-6"
          >
            About Us
          </motion.h2>
          <h3 className="text-blue-700 text-3xl font-semibold mb-4">
            Secure your family's future with expert estate planning
          </h3>
          <h4 className="text-gray-600 text-lg mb-6">
            Expert counsel for businesses to make informed decisions, manage
            risks, and achieve growth. Comprehensive contract support, from
            drafting to consult negotiation, safeguarding your agreements.
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Column */}
            <div className="flex flex-col">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="uncommonlist mb-4"
              >
                <div className="listarea1 flex items-center mb-4">
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-base font-semibold text-gray-700 leading-4">
                    Financial Freedom Consulting
                  </p>
                </div>
                <div className="listarea2 flex items-center mb-4">
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-base font-semibold text-gray-700 leading-4">
                    Money Management Consulting
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="uncommonlist mb-4"
              >
                <div className="listarea1 flex items-center mb-4">
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-base font-semibold text-gray-700 leading-4">
                    Next Generation Accounting
                  </p>
                </div>
                <div className="listarea2 flex items-center mb-4">
                  <span className="mr-2 text-blue-600">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <p className="text-base font-semibold text-gray-700 leading-4">
                    Short-Range Finance Planning
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <h2 className="text-gray-600 text-lg mb-6">
            Explain your approach to mediation and arbitration for efficient
            conflict resolution. Introduce key members of your legal team,
            including.
          </h2>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#2b6cb0" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold"
          >
            More About Us
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white py-12 px-5 sm:px-10 md:px-20 lg:px-40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="text-blue-700 text-4xl font-bold mb-6">
              Law Consulting Services
            </span>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-4xl leading-tight font-bold text-gray-900 mb-6"
            >
              Your Trusted Law Consulting Partner
            </motion.h1>
            <p className="text-base leading-7 font-normal text-gray-600 mb-8">
              We have a deep understanding of various industries, allowing us to
              provide specialized legal guidance tailored to your sector.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <a
                href="/contact1"
                className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Start Legal Consultation
              </a>
              <a
                href="/contact2"
                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg text-lg font-semibold hover:bg-gray-400 transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-block group bg-white p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center max-md:flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-10 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 text-center ">
                    Personal Injury
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-block group bg-white p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center max-md:flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-10 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">
                    Commercial Real Estate
                  </h2>
                </div>
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-block group bg-white p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center max-md:flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-10 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 text-center ">
                    Intellectual Property
                  </h2>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative inline-block group bg-white p-6 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center max-md:flex-col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-10 text-blue-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 text-center ">
                    Employment Law
                  </h2>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="service3-boxarea mb-8 w-full lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="service3-text2 flex flex-col justify-center p-4 lg:p-8">
            <a href="/servicemiddle">
              <h1 className="text-blue-700 text-4xl font-bold mb-6">
                Financial Planning
              </h1>
            </a>
            <p className="text-base leading-7 font-medium text-gray-600 mb-4">
              Our team comprises certified financial experts with years of
              experience in diverse areas of finance. We provide personalized
              financial planning services tailored to meet your unique needs and
              goals.
            </p>
            <p className="text-base leading-7 font-medium text-gray-600 mb-4">
              From investment strategies to retirement planning, we ensure your
              financial future is secure. Our experts are here to guide you
              through every step of the process.
            </p>
            <p className="text-base leading-7 font-medium text-gray-600 mb-4">
              Whether you're planning for your child's education, purchasing a
              new home, or preparing for retirement, we offer comprehensive
              financial planning services that can help you achieve your
              objectives.
            </p>
            <a
              href="/servicemiddle"
              className="text-base leading-tight font-bold text-blue-600 mt-4 inline-block hover:underline"
            >
              Learn More{" "}
              <span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </a>
          </div>
          <div className="service3-imag1 p-4 lg:p-8">
            <img
              src="public/images/photos/franchise.jpg"
              alt="Service Image"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BecomeConsultant;
