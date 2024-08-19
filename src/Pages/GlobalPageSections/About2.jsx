import React from "react";
import { NavLink } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const TextColumn = () => {
  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <div className="col-span-12 md:col-span-6">
      <motion.div
        className="flex items-center h-full"
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        variants={scrollVariants}
        transition={{ duration: 1 }}
      >
        <div className="mt-5 md:mt-0">
          <h1 className="px-5 bg-white/10 border border-white/20 text-white font-medium rounded-[30px] w-fit">
            About Company
          </h1>
          <h2 className="max-w-[747px] font-semibold text-24 sm:text-48 text-white mt-5">
            How to Become a Franchise Owner: Step by step
          </h2>
          <p className="text-white md:mt-9 mt-5 mb-5">
            If owning a franchise is your goal, it’s time to take action!
            Regardless of the industry sector you wish to explore, the path to
            ownership typically spans from three months to a year. Here are the
            general steps to becoming a franchise owner:
          </p>
          <div className="flex flex-row">
            <NavLink to="/franchise-owner">
              <div className="home-two-btn-white-rev group border-white/10 before:bg-it-blue after:bg-it-blue hover:border-it-blue transition-all duration-500 w-fit">
                <span className="text-base group-hover:text-white text-white transition-all duration-300 font-semibold font-inter relative z-10 py-0.5">
                  Learn More
                </span>
                <svg
                  className="relative z-10"
                  width={7}
                  height={12}
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="group-hover:stroke-white stroke-white transition-all duration-300"
                    d="M1.10254 10.5L4.89543 6.70711C5.22877 6.37377 5.39543 6.20711 5.39543 6C5.39543 5.79289 5.22877 5.62623 4.89543 5.29289L1.10254 1.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </NavLink>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const About2 = () => {
  const isMobile = window.innerWidth < 768 ? true : false;

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };
  return (
    <section className="bg-it-black py-[70px] sm:py-[100px]">
      <div className=" theme-container mx-auto grid grid-cols-6 lg:grid-cols-12 sm:gap-[63px]">
        <motion.div
          className="col-span-12 md:col-span-6"
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <img
              src="/images/home-seven/about.png"
              className=" object-cover rounded-3xl"
            />

            <motion.div
              className="w-[100px] aspect-square rounded-[10px] bg-it-blue flex justify-center items-center absolute -top-[50px] -right-[0px] md:-right-[50px]"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <img
                src="/images/home-seven/franchise-svgrepo-com (1).svg"
                className="w-16"
              />
            </motion.div>
          </div>
        </motion.div>
        <TextColumn />
      </div>
    </section>
  );
};

export default About2;
