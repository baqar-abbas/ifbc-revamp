import React from "react";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";

const Services = () => {
  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <section className="bg-white my-10">
      <div className="theme-container mx-auto grid grid-cols-6 lg:grid-cols-12 gap-[30px]">
        <motion.div
          className="col-span-6 flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={inViewOptions}
          variants={scrollVariants}
          transition={{ duration: 1 }}
        >
          <div id="text-container" className="order-2 md:order-1">
            <h2 className="font-bold md:text-4xl max-md:text-2xl text-custom-heading-color mt-5">
              Reasons to Choose a Franchise Business Model for Your Next Venture
            </h2>
            <p className="mt-5">
              Opening a franchise business is a popular choice for many
              entrepreneurs due to several appealing advantages it offers. Here
              are some of the primary reasons why someone might choose to open a
              franchise
            </p>
          </div>
          <div className="w-full relative mt-[40px] order-1 md:order-2">
            {/* <img
              src="/images/home-seven/process-1.png"
              alt="Services 1"
              className="w-full"
            /> */}

            <video
              className="w-full max-md:h-full md:h-[1050px] object-cover rounded-3xl"
              controls={true}
              muted={true}
              loop={true}
            >
              <source src="/video/videoplayback.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <Steps />
      </div>
    </section>
  );
};

const Steps = () => {
  const processSteps = [
    {
      imgSrc: "/images/home-seven/process-2.png",
      stepNumber: "01",
      title: "Proven Business Model",
      description:
        "Become a consultant and take advantage of our proven business model to build and grow your own successful franchise with confidence.",
      btnText: "Become a Consultant",
      btnLink: "/become-a-consultant",
    },
    {
      imgSrc: "/images/home-seven/process-3.png",
      stepNumber: "02",
      title: "Brand Recognition",
      description:
        "Make a referral and help others connect with a trusted brand, earning rewards for sharing your recommendation.",
      btnText: "Make a Referral",
      btnLink: "/make-a-referral",
    },
    {
      imgSrc: "/images/home-seven/process-4.png",
      stepNumber: "03",
      title: "Support and Training",
      description:
        "Book an appointment to discover the comprehensive training and support we provide to help you achieve business success.",
      btnText: "Book an Appointment",
      btnLink: "https://calendly.com/info-ifbc",
    },
    {
      imgSrc: "/images/logo/crmlogo.jpg",
      stepNumber: "04",
      title: "Streamlined Franchise Management",
      description:
        "Log into our CRM now to seamlessly manage and oversee every aspect of your franchise from one centralized platform.",
      btnText: "Log Into CRM",
      btnLink: "https://crm.ifbc.co/",
    },
  ];

  const isMobile = window.innerWidth < 768 ? true : false;

  return (
    <div className="col-span-6 flex flex-col gap-[30px]">
      {processSteps.map((step, index) => (
        <div
          key={index}
          className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-12"
        >
          <motion.div
            className="col-span-6"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            <img
              src={step.imgSrc}
              alt={`Process ${step.stepNumber}`}
              className="w-full"
            />
          </motion.div>
          <div className="col-span-6">
            <div className="flex h-full flex-col justify-center">
              {!isMobile && (
                <div className="w-10 aspect-square rounded-full border border-custom-dark-blue flex items-center justify-center">
                  <h1 className="font-semibold text-custom-dark-blue">
                    {step.stepNumber}
                  </h1>
                </div>
              )}
              <h1 className="text-18 font-semibold text-custom-heading-color mt-4 mb-3">
                {step.title}
              </h1>
              <p className="text-paragraph">{step.description}</p>
              <NavLink
                to={step.btnLink}
                target={
                  step.btnLink === "https://crm.ifbc.co/" ||
                  step.btnLink === "https://calendly.com/info-ifbc"
                    ? "_blank"
                    : undefined
                }
                className="border-2 text-sm md:w-48 md:mt-3  max-md:w-full justify-center flex border-custom-heading-color bg-custom-heading-color  text-white max-md:p-3 rounded-3xl hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-1 font-light"
              >
                {step.btnText}
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
