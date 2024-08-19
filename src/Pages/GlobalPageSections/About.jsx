import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const TextColumn = () => {
  const loc = useLocation();

  const listItems = [
    {
      title: "Franchise with Freedom: No Middlemen, No Costs at IFBC!",
      description:
        "At IFBC, we champion a transparent, direct, and cost-free pathway to your franchising aspirations. Our unique approach removes the often-burdensome financial barriers and intermediaries from your journey.",
    },
    {
      title: "Make a Smart Move with IFBC – Your Trusted Franchise Navigator!",
      description:
        "At IFBC, we empower your franchise endeavors with seasoned expertise and tailored strategies. Whether you’re exploring new franchise horizons or elevating an established model.",
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
    <motion.div
      className="col-span-6 order-2 md:order-1"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOptions}
      variants={scrollVariants}
      transition={{ duration: 1 }}
    >
      <h1 className="px-5 bg-main-gray border border-it-blue/20 text-it-blue font-medium rounded-[30px] w-fit">
        Who we are?
      </h1>
      <h2 className="font-bold md:text-4xl max-md:text-2xl text-custom-heading-color mt-5">
        About IFBC
      </h2>
      <p className="mt-3">
        IFBC isn’t just a consultant network—it’s where ambition meets
        opportunity. We directly match individuals with elite franchises and are
        actively shaping the future with a dynamic team of franchise
        specialists. Choose IFBC for integrity, excellence, and a personalized
        approach to your entrepreneurial journey.
      </p>

      <ul className="mb-[30px] max-w-full">
        {listItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row gap-[10px] items-start mt-6"
          >
            <div className="w-[30px] aspect-square rounded-full bg-it-blue flex items-center justify-center">
              <svg
                width={16}
                height={11}
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.6907 0.612031C15.1811 0.993484 15.2695 1.70029 14.888 2.19073L8.87753 9.91852C7.94196 11.1214 6.18214 11.2775 5.04945 10.2581L1.24742 6.83626C0.785601 6.42062 0.748162 5.70929 1.1638 5.24747C1.57945 4.78564 2.29077 4.7482 2.75259 5.16385L6.55462 8.58567C6.71643 8.7313 6.96783 8.709 7.10149 8.53716L13.112 0.809368C13.4934 0.318928 14.2003 0.230577 14.6907 0.612031Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-custom-heading-color font-semibold text-2xl">
                {item.title}
              </h1>
              <p className="text-paragraph max-w-[606px]">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {loc.pathname !== "/about" && (
        <NavLink to="/about">
          <div className="home-two-btn-bg py-3.5 group bg-it-black border-it-black w-fit mt-2.5">
            <span className="text-base text-white group-hover:text-it-black transition-all duration-300 font-semibold font-inter relative z-10">
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
                className="group-hover:stroke-it-black transition-all duration-300"
                d="M1.10254 10.5L4.89543 6.70711C5.22877 6.37377 5.39543 6.20711 5.39543 6C5.39543 5.79289 5.22877 5.62623 4.89543 5.29289L1.10254 1.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </NavLink>
      )}
    </motion.div>
  );
};

const ImageColumn = () => {
  // Scroll animation variants
  const scrollVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  // Hook to detect if the element is in view
  const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <motion.div
      className="col-span-6 mt-5 md:mt-0 order-1 md:order-2 mb-5 md:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={inViewOptions}
      variants={scrollVariants}
      transition={{ duration: 1 }}
    >
      <div className="flex w-full relative justify-end">
        <img
          src="/images/home-seven/business.png"
          className="md:max-w-[85%] h-[350px] md:h-[650px] object-cover rounded-3xl"
        />
        <motion.div
          className="bg-it-blue p-4 sm:p-[30px] rounded-2xl absolute z-20 bottom-16 left-2 sm:left-0 w-48 sm:w-[295px]"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="/images/home-five/hero/about-card-shape.webp"
            className="absolute right-2 top-bottom-moving "
          />
          <div className="flex items-center gap-2.5">
            <svg
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.28753 7.01343L8.90454 1.36956M8.90454 1.36956L3.26066 1.75255M8.90454 1.36956L1.01321 10.4099"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-white leading-8">We have</span>
          </div>
          <h1
            className="text-[27px] leading-[35px] text-white font-semibold tracking-tight max-w-[170px]"
            data-scroll-qs="scroll"
            data-count-qs={25}
            data-type-qs="+ Years of Experience"
            data-speed-qs={1000}
          >
            25+ Years of Experience
          </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="py-[30px] bg-white my-10">
      <div className="theme-container mx-auto grid grid-cols-6 lg:grid-cols-12 sm:gap-[63px]">
        <TextColumn />
        <ImageColumn />
      </div>
    </section>
  );
};

export default About;
