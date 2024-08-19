import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full flex-wrap items-center bg-bl justify-between md:p-4 max-md:py-5 text-white text-center bg-[radial-gradient(circle,_hsla(33,92%,47%,1)_33%,_hsla(31,100%,36%,1)_62%)]  ">
      <div className="flex justify-between max-w-[90%] mx-auto max-md:flex-col-reverse md:flex-row max-md:gap-5   ">
        <div className="text-sm w-full flex justify-start ">
          Powered by International Franchise Business Consultant Corp.
        </div>

        <div className="text-sm w-full flex gap-5 md:justify-end max-md:justify-center max-md:flex-wrap ">
          <NavLink to="/" className="text-white text-sm">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white text-sm">
            About
          </NavLink>
          <NavLink to="/contact" className="text-white text-sm">
            Contact
          </NavLink>

          <NavLink to="/terms-conditions" className="text-white text-sm">
            Terms & Conditions
          </NavLink>

          <NavLink to="/privacy-policy" className="text-white text-sm">
            Privacy Policy
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
