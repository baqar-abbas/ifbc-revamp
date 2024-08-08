import React from "react";
import { NavLink } from "react-router-dom";

const PreFooter = () => {
  return (
    <section id="consultation" className="relative bg-white mb-5">
      <div className="absolute bottom-24 w-full bg-it-black h-[152px]" />
      <div className="consultation-section-wrapper w-full relative">
        <div className="theme-container mx-auto relative z-10">
          <div className="w-full py-[80px] bg-it-blue rounded-[20px] md:flex relative overflow-hidden">
            <img
              src="/images/home-seven/cta-shape-1.svg"
              className="absolute top-10 left-10"
            />
            <img
              src="/images/home-seven/cta-shape-1.svg"
              className="absolute bottom-10 left-28 h7-cta-open-anim"
            />
            <img
              src="/images/home-seven/cta-shape-3.svg"
              className="absolute top-10 right-10"
            />
            <img
              src="/images/home-seven/cta-shape-3.svg"
              className="absolute bottom-10 right-28 h7-cta-open-anim-rev"
            />
            <img
              src="/images/home-seven/cta-shape-5.svg"
              className="absolute bottom-0 left-0 cta-dot-anim"
            />
            <div className="w-full flex flex-col items-center justify-center px-10 md:px-0 gap-4 md:gap-0">
              <h1 className="text-center md:text-left py-0.5 px-5 bg-white/10 uppercase border-white/20 border rounded-[30px] font-medium text-white w-fit mx-auto">
                How much franchise can you afford?
              </h1>
              <h2 className="md:text-48 text-24 uppercase font-semibold text-white mb-[12px] mt-2.5 w-full text-center">
                Let our free financial calculator tell you.
              </h2>

              <NavLink to="/funding-calculator">
                <div className="home-two-btn-white-rev group before:bg-white after:bg-white hover:border-it-blue transition-all duration-500 w-fit">
                  <span className="text-base group-hover:text-it-blue text-white transition-all duration-300 font-semibold font-inter relative z-10 py-0.5">
                    Get Consultation
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
                      className="group-hover:stroke-it-blue stroke-white transition-all duration-300"
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
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
