import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import PageTransition from "src/Animations/PageTransition";
import { motion, useInView } from "framer-motion";

const BecomeAConsultant = () => {
// Scroll animation variants
const scrollVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};

// Hook to detect if the element is in view
const inViewOptions = { triggerOnce: true, threshold: 0.1 };

  return (
    <PageTransition>
      <Helmet>
        <title>
          Become a Consultant | International Franchise Business Consultant
        </title>
        <meta
          name="description"
          content="Join the team at International Franchise Business Consultants. Become a consultant and help entrepreneurs find and succeed with the right franchise opportunities."
        />
      </Helmet>

      {/* Heading Division */}
      <div className="heading md:w-[40%] md:ml-12 max-md:ml-3 max-md:w-[90%] px-2">
        <h1 className="font-bold max-md:text-2xl md:text-4xl md:ml-14 max-md:ml-5 md:mb-5 max-md:mb-5 mt-5">
          Become a Franchise consultant with IFBC.
        </h1>
      </div>

      <motion.div 
       className="wrapper md:h-[23rem] md:shadow-xl md:rounded-xl md:bg-white md:p-4 mx-auto md:w-[95%]"
       initial="hidden"
       whileInView="visible"
       viewport={inViewOptions}
       variants={scrollVariants}
       transition={{ duration: 2 }}
      >
      <section className="flex justify-center max-md:flex-col md:gap-10 md:ml-2 max-md:ml-6">
        <div className="md:w-[45.5%] max-md:w-[100%] max-md:p-4">
          <p className="mb-4 md:text-lg">
            Are you looking for a better career path?
          </p>
          <p className="mb-4 md:text-lg">
            Would you like to help other people start businesses and help your
            community grow?
          </p>
          <p className="mb-4 md:text-lg">
            Are you interested in joining a franchise industry leader with
            experience, expertise, and ethics?
          </p>
          <p className="md:text-lg">
            If you answered yes to any of the above questions, an IFBC franchise
            consulting could be your ticket to long-term success.
          </p>
                {/* Link to the Qualify Consultant page */}
      <div className="md:mt-5 max-md:mx-auto">
      <Link to="/become-consultant" className="md:ml-48 candidate-btn custom-btn-class md:w-[40%] max-md:ml-2 md:mt-3 max-md:w-[95%] max-md:mt-3">
        {/* <button className="md:ml-48 candidate-btn md:w-[40%] max-md:ml-2 md:mt-3 max-md:w-[95%] max-md:mt-3"> */}
          See If You Qualify
        {/* </button> */}
      </Link>
      </div>
        </div>
        <div className="md:w-[45%] max-md:w-[100%] max-md:px-3">
          <motion.img
            src="./images/banners/consulting.webp"
            alt="connecting"
            className="md:w-[100%] max-md:w-[100%] max-md:h-60 rounded-3xl md:h-[72%] object-cover"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
          />
        </div>

      </section>


      </motion.div>

      {/* About IFBC Section   */}
      <motion.section className="about-ifbc md:w-[95%] mx-auto flex justify-center md:-ml-2 max-md:ml-5 max-md:mt-10 md:mt-10 md:mb-20 max-md:mb-10 md:shadow-xl md:rounded-xl md:bg-white md:p-4"
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        variants={scrollVariants}
        transition={{ duration: 2 }}>
        <div className="w-[92%] md:mb-3">
          <h2 className="text-3xl font-bold mb-5 max-md:ml-6">About IFBC</h2>
          <p className="md:text-lg max-md:ml-6">
            IFBC isn’t just a consultant network—it’s where ambition meets
            opportunity. We directly match individuals with elite franchises and
            are actively shaping the future with a dynamic team of franchise
            specialists. Choose IFBC for integrity, excellence, and a
            personalized approach to your entrepreneurial journey.
          </p>
          <h3 className="text-3xl font-bold mt-5 mb-5 max-md:ml-6">
            Franchise with Freedom: No middlemen, no costs at IFBC!
          </h3>
          <p className="md:text-lg max-md:ml-6">
            At IFBC, we champion a transparent, direct, and cost-free pathway to
            your franchising aspirations. Our unique approach removes the
            often-burdensome financial barriers and intermediaries from your
            journey.
          </p>
        </div>
      </motion.section>

      {/* Why become an IFBC franchise consultant? section */}
      <motion.section
        className="flex justify-center md:mx-auto md:w-[95%] max-md:flex-col max-md:ml-5 md:gap-10 md:mb-20 md:shadow-xl md:rounded-xl md:bg-white md:p-4"
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        variants={scrollVariants}
        transition={{ duration: 2 }}
      >
        <div className="md:w-[44.5%] md:ml-3 max-md:w-[100%] max-md:px-4">
          <motion.img
            src="./images/banners/consultants2.avif"
            alt="become-consultant"
            className="md:w-[100%] max-md:w-[100%] max-md:h-60 md:h-[96%] rounded-3xl object-cover md:mt-2"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <div className="become-consultant md:w-[44.5%] max-md:w-[100%] max-md:p-2 md:mb-3">
          <h2 className="text-3xl font-bold mb-5 max-md:ml-4">
            Why become an IFBC franchise consultant?
          </h2>
          <p className="mb-5 md:text-lg max-md:ml-4">
            When you own an IFBC franchise consulting business, you will be on
            the front lines of a thriving industry. Franchising is one of the
            largest industries in North America. As an IFBC franchise
            consultant, you will work with business buyers and sellers to close
            franchise business transactions, resulting in a win-win situation
            for everyone involved.
          </p>

          <h3 className="text-3xl font-bold mt-5 mb-5 max-md:ml-4">
            What do IFBC franchise consultants do?
          </h3>
          <p className="md:text-lg max-md:ml-4">
            An IFBC Franchise Consultant's role is to conduct one-on-one
            consultations with clients interested in purchasing a franchise.
            IFBC's proprietary technology equips an IFBC franchise consultant
            with the tools to identify opportunities that align with a
            prospect's ideal business. The IFBC Franchise Consultant is not a
            salesperson but rather a matchmaker between the client and the right
            franchisor. Career counselors, outplacement consultants, attorneys,
            accountants, bankers, and other clients looking for quality
            franchises can expect IFBC Franchise Consultants to curate an
            ongoing referral network. They also assist clients in locating
            legal, accounting, and financial resources for specific franchises.
          </p>
        </div>
      </motion.section>

      {/* How much does it cost? section */}
      <motion.section
        className="about-cost flex mx-auto md:w-[95%] justify-center md:ml-5 max-md:ml-5 max-md:px-2 max-md:mt-10 md:mb-20 max-md:mb-10 md:shadow-xl md:rounded-xl md:bg-white md:p-4"
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        variants={scrollVariants}
        transition={{ duration: 2 }}
      >
        <div className="w-[90%] md:mb-3">
          <h2 className="text-3xl font-bold mb-5 max-md:ml-4">
            How Much Does It Cost to Become a Franchise Consultant?
          </h2>
          <p className="md:text-lg max-md:ml-4">
            You will be surprised to know that we are the only company in the
            industry that doesn’t charge any fees from our franchise
            consultants. While other companies charge between $25,000 and
            $50,000 just for training, we provide them with free access to the
            IFBC CRM and our website portal.
          </p>
          <h3 className="text-3xl font-bold mt-5 mb-5 max-md:ml-4">
            How does an IFBC franchise consultant make money?
          </h3>
          <p className="md:text-lg max-md:ml-4">
            When you become an IFBC Franchise Consultant , you will receive
            leads from your own local advertising programs, as well as from
            advertising and Internet marketing systems. Every time a client
            invests in a franchise business you recommend, you, as an IFBC
            Franchise Consultant, will receive a sizable referral fee!
          </p>
        </div>
      </motion.section>

      {/* Step by step guide Section */}
      <motion.section
        className="about-cost flex max-md:flex-col mx-auto md:w-[95%] justify-center md:ml-5 max-md:ml-5 max-md:px-2 md:mb-20 max-md:mb-10 md:shadow-xl md:rounded-xl md:bg-white md:p-4"
        initial="hidden"
        whileInView="visible"
        viewport={inViewOptions}
        variants={scrollVariants}
        transition={{ duration: 2 }}
      >
        <div className="step-by-step md:w-[44.5%] max-md:w-[100%] max-md:p-4">
          <h2 className="text-3xl font-bold mb-5 max-md:ml-4">
            Get Step-by-Step Guidance as an IFBC Franchise Consultant
          </h2>
          <p className="mb-5 md:text-lg max-md:ml-4">
            Here’s a summary of the special advantages you’ll have when you join
            the IFBC family:
            <ul>
              <li>
                • We offer comprehensive training both online and in-class with
                industry experts.
              </li>
              <li>
                • The company offers extensive technology tools and
                industry-specific CRM software.
              </li>
              <li>
                • An intranet communication platform for sharing best practices.
              </li>
              <li>• Databases containing useful industry information.</li>
              <li>
                • Marketing and advertising materials to help generate leads.
              </li>
            </ul>
            <p className="mt-3">
              A franchise consulting franchise offers enormous growth potential.
              We can give you all the details and help you explore opportunities
              with IFBC. Call 90-TEAM-IFBC or book an appointment.
            </p>
          </p>
          <Link to="/become-consultant" className="candidate-btn custom-btn-class">Get in Touch</Link>
        </div>
        <div className="md:w-[44.5%] max-md:w-[100%] max-md:px-4 md:mb-3 md:flex md:flex-col md:justify-center md:items-center">
          <video
            src="./video/becomeconsultant.mp4"
            type="video/mp4"
            autoPlay
            controls
            muted={true}
            loop
            className="desktop-video-become rounded-3xl"
          ></video>

          <video
            src="./video/becomeaconsultantMob.mp4"
            type="video/mp4"
            autoPlay
            controls
            muted={true}
            loop
            className="mobile-video rounded-3xl"
          ></video>
        </div>
      </motion.section>
    </PageTransition>
  );
};

export default BecomeAConsultant;
