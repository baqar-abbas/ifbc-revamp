import { motion } from "framer-motion";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import { MyContext } from "src/Context/ListingDataContext";
import ScrollToTop from "src/Globals/ScrollToTop";

const PageTransition = ({ children }) => {
  const { loading, loadingError } = useContext(MyContext) ||
    useContext(MyCandContext) || { loading: false }; // Default to false if loading is undefined
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingError) {
      document.querySelector("html").style.overflow = "auto";
      document.querySelector("html").style.height = "auto";

      navigate("/error");
    }
  }, [loadingError, navigate]);
  const variants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: loading ? [0, 1, 1, 1] : [0, 1, 1, 0],
      //scaleY: [0, 1, 1, 0],
    },
  };

  return (
    <>
      <ScrollToTop />
      {children}
      <motion.div
        className="origin-bottom h-full w-full fixed top-0 left-0 z-[99999999] bg-custom-heading-color"
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          id="image-container-transition"
          className="h-screen w-full grid place-items-center sticky top-0"
        >
          <motion.img
            animate={{
              opacity: loading ? [0, 1, 1, 1] : [0, 1, 1, 0],
              //opacity: [0, 1, 1, 0],
              transition: { duration: 1, delay: 0.1 },
            }}
            src="/images/logo/IFBC 3.png"
            alt="KPEG"
            className="w-72 md:w-96"
          />
        </div>
      </motion.div>
    </>
  );
};

export default PageTransition;
