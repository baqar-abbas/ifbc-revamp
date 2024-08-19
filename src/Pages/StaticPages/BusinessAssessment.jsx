import React from "react";
import { Helmet } from "react-helmet";
import PageTransition from "src/Animations/PageTransition";
import { motion, useInView } from "framer-motion";

const BusinessAssessment = () => {
  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: -100 },
    hiddenSmall: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <PageTransition>
      <Helmet>
        <title>
          Business Assessment | International Franchise Business Consultant
        </title>
        <meta
          name="description"
          content="Complete a thorough business assessment with International Franchise Business Consultants. Evaluate your readiness and suitability for franchise ownership with expert guidance."
        />
      </Helmet>

      <div
        id="top-text"
        className="p-5 relative flex flex-col gap-2 justify-center items-center before:absolute before:content-[''] before:top-0 before:w-full before:h-full before:bg-custom-heading-color/60 md:min-h-[400px] before:z-10"
        style={{
          background: "url(/images/accounts/business.jpg)",
          backgroundAttachment: "fixed",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <motion.h1
          className="max-md:text-3xl md:text-5xl text-white font-bold text-center z-20"
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{ duration: 1 }}
        >
          Find A Franchise That Is Best For You With Our Assessment
        </motion.h1>
        <motion.h3
          className="max-md:text-md md:text-xl text-white  font-bold text-center z-20"
          initial="hiddenSmall"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{ duration: 1 }}
        >
          Match your skills and talents with the right businesses with our 5-10
          minute online assessment
        </motion.h3>
        <a
          className="z-50 bg-white rounded-sm p-2 text-custom-dark-blue my-2 font-bold px-10"
          href="https://www.zorakle.net/assessment/welcome/ifbc"
          target="_blank"
          rel="noopener noreferrer"
        >
          TAKE BUSINESS ASSESSMENT
        </a>
      </div>

      <section className="theme-container mx-auto w-full my-10 flex flex-col gap-10">
        <ServicesGrid />

        <motion.div
          className="max-md:flex flex-col md:grid grid-cols-2 my-5"
          initial="hiddenSmall"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{ duration: 1 }}
        >
          <div className="w-full">
            <motion.img
              src={"/images/accounts/partner.jpg"}
              className="rounded-xl"
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
            />
          </div>
          <div className=" flex flex-col md:mx-10 gap-2 justify-center max-md:mt-5">
            <h2 className="font-bold text-custom-dark-blue max-md:text-sm md:text-xl">
              BUSINESS ASSESSMENT
            </h2>
            <p className="text-3xl font-bold capitalize">
              Our assessment helps to quickly narrow down the field that is
              right for you
            </p>
            <p>
              International Franchise Business Consultant is a franchise
              consulting company with a proven process that will save you time,
              help you avoid frustration, and drastically streamline your search
              among franchise opportunities. We will answer your questions and
              provide you with the information you need to make a smart
              decision.
            </p>
            <p>
              Our business assessment takes only a few minutes to complete. It
              will give you an entrepreneurial profile that allows us to
              understand your risk tolerance, communication style, values and
              the type of culture in which you will thrive.
            </p>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
};

const ServicesGrid = () => {
  const values = [
    {
      title: "Incorporate 7 Sciences",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
          />
        </svg>
      ),
    },
    {
      title: "Fast And Reliable: Takes only 5-10 minutes",

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Helps To Identify A Good Cultural Fit",

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
          />
        </svg>
      ),
    },
    {
      title: "Get Your Report Instantly",

      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="rgb(33 118 255)"
          className="size-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          />
        </svg>
      ),
    },
  ];

  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <div className="grid :grid-cols-12 sm:max-lg:grid-cols-6 lg:grid-cols-4 gap-10  mt-[20px] ">
      {values.map((value, index) => (
        <motion.div
          className="group border-4 border-custom-dark-blue p-[20px] min-h-[250px] rounded-2xl bg-white transition-all duration-300 hover:bg-it-gray overflow-hidden h5-story_slider_active_card w-full flex items-center flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            type: "spring",
            bounce: 0.3,
          }}
        >
          <div className="flex justify-center">{value.svg}</div>
          <h1 className="text-xl text-center font-semibold text-custom-dark-blue mt-5 mb-2.5">
            {value.title}
          </h1>
        </motion.div>
      ))}
    </div>
  );
};

export default BusinessAssessment;
