/* eslint-disable react/prop-types */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import ToggleButton from "./ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "src/Redux/listingReducer";
import { useEffect } from "react";
const Logo = () => {
  return (
    <Link
      to="/"
      className="flex shrink-0 justify-center items-center text-medium-gold max-md:col-span-12 md:col-span-2"
    >
      <img
        src="/images/logo/IFBC 6.png"
        alt="IFBC"
        loading="lazy"
        width={130}
        className="inline"
      />
    </Link>
  );
};

const Header = ({
  mobileActive,
  setMobileActive,
  setActive,
  active,
  selectedCandName,
  setShow,
}) => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const socials = [
    {
      text: "info@ifbc.co",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      text: "91-HELP-IFBC",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
          />
        </svg>
      ),
    },
  ];
  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden && window.innerWidth > 768 ? "-52%" : 0 }}
      id="main-header"
      className="sticky top-0 z-[999]"
    >
      <nav
        className="w-full flex flex-col items-center justify-center text-white bg-[rgba(150,147,147,0.7)] border-b-2 border-color-custom-dark-blue xl:border-0 gap-3  "
        id="header-nav"
      >
        <div
          id="navbar-centered"
          className="w-full max-md:flex max-md:justify-between max-md:items-center md:grid grid-cols-12 px-8 py-3 bg-[radial-gradient(circle,_hsla(33,92%,47%,1)_33%,_hsla(31,100%,36%,1)_62%)]"
        >
          {/* DETAILS */}
          <ul
            id="info-details-header"
            className="max-md:hidden md:flex items-center justify-start gap-5 max-md:col-span-12 md:col-span-5"
          >
            {socials.map((button, index) => (
              <li key={index} className="flex gap-1 text-sm items-center">
                {button.svg}
                <a
                  key={button.text}
                  href={
                    button.text.includes("mail")
                      ? "mailto:" + button.text
                      : "tel:" + button.text
                  }
                >
                  {button.text}
                </a>
              </li>
            ))}
          </ul>

          {/* LOGO */}
          <Logo />

          {/* RIGHT SIDE BUTTONS CONTAINER */}
          <RightSideButtonsContainer
            mobileActive={mobileActive}
            setMobileActive={setMobileActive}
            hidden={hidden}
            setShow={setShow}
          />
        </div>

        <Navbar
          setActive={setActive}
          active={active}
          selectedCandName={selectedCandName}
        />
      </nav>
    </motion.header>
  );
};

const RightSideButtonsContainer = ({ mobileActive, setMobileActive }) => {
  const userDetails = useSelector((state) => state.counter.userDetails);
  const token = useSelector((state) => state.counter.token);
  const role =
    userDetails && typeof userDetails === "object"
      ? userDetails.userType
      : null;
  return (
    <div className="md:flex md:justify-end md:items-start md:pt-1 md:gap-5 max-md:col-span-12 md:col-span-5">
      {/* button appointment */}
      {(!role || role === "N") && !token && (
        <a
          href="https://calendly.com/info-ifbc"
          className="duration-500 max-md:hidden capitalize font-medium rounded-full hover:bg-custom-heading-color md:flex items-center hover:text-white transition-all  bg-white text-custom-heading-color px-6  text-sm h-10"
        >
          Book an appointment
        </a>
      )}
      <Link to="/make-a-referral">
        <button className="duration-500 max-md:hidden capitalize font-medium rounded-full hover:bg-custom-heading-color md:flex items-center hover:text-white transition-all  bg-white text-custom-heading-color px-6  text-sm h-10">
          Make a Referral
        </button>
      </Link>

      {/* USER BUTTON */}
      <AccountDD token={token} userDetails={userDetails} role={role} />

      {/* TOGGLE BUTTON */}
      <ToggleButton
        setMobileActive={setMobileActive}
        mobileActive={mobileActive}
      />
    </div>
  );
};

const AccountDD = ({ userDetails, token, hidden, role }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState("Member");
  const loc = useLocation();

  useEffect(() => {
    setActive(false);
  }, [loc.pathname]);

  useEffect(() => {
    if (role) {
      if (role === "N") {
        setRoleName("Member");
      } else if (role === "M") {
        setRoleName("Ambassador");
      } else if (role === "O") {
        setRoleName("Company");
      } else if (role === "C") {
        setRoleName("Consultant/Agent");
      } else if (role === "A") {
        setRoleName("Admin");
      }
    }
  }, [role]);

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    dispatch(setToken(false));
    window.location.href = "/";
  };

  const elementStyle = active
    ? {
        position: "fixed",
        margin: "0px",
        transform: "translate(0px, 56px)",
        opacity: "1",
        display: "flex",
        flexDirection: "column",
        right: "15px",
        top: "10px",
      }
    : {};

  const [imgSrc, setImgSrc] = useState(
    userDetails?.profileImage
      ? `/images/uploads/${userDetails.profileImage}`
      : "/images/avatar-placeholder.png"
  );

  const handleError = () => {
    setImgSrc("/images/avatar-placeholder.png");
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden && window.innerWidth > 768 ? "200%" : 0 }}
      className="hs-dropdown relative md:inline-flex max-sm:hidden"
    >
      {token ? (
        <>
          <button
            id="user-icon"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="flex shadow-lg flex-wrap items-center justify-start gap-2 cursor-pointer"
          >
            <img
              src={imgSrc}
              alt="User Profile"
              className="w-10 h-10 object-cover rounded-full"
              onError={handleError}
            />
          </button>
          <div
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className={`hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 ${active ? "block" : "hidden"} min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-[999]`}
            style={elementStyle}
          >
            <div className="flex flex-col items-start py-2 px-3">
              <p className="text-[15px] text-[#333] font-bold">
                {userDetails
                  ? userDetails?.firstName?.charAt(0).toUpperCase() +
                    userDetails?.firstName?.slice(1) +
                    " " +
                    userDetails?.lastName?.charAt(0).toUpperCase() +
                    userDetails?.lastName?.slice(1)
                  : "John Doe"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {userDetails ? userDetails?.email : "johndoe23@gmail.com"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{roleName}</p>
            </div>
            <NavLink
              to="/profile"
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
            >
              My Profile
            </NavLink>
            <a
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              Log out
            </a>
          </div>
        </>
      ) : (
        <>
          <button
            id="user-icon"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className="  cursor-pointer bg-orange-500 rounded-full py-2.5 px-3"
          >
            <div className="flex justify-center items-center gap-1">
              <h3 className="text-sm font-medium">Login</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="white"
                className={`size-3 transform transition-all duration-300 ${active ? "rotate-180 " : ""}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </button>
          <div
            className={`hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 ${active ? "block" : "hidden"} w-60 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-[999] justify-center items-center`}
            style={elementStyle}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <img
              src="/images/logo/IFBC 1.png"
              alt="IFBC"
              className="w-full px-3 py-2"
            />
            <NavLink to="/login" className="account-links">
              Log into your account
            </NavLink>
            <NavLink to="/registration" className="account-links">
              Create a new account
            </NavLink>
            <a
              href="http://crm.ifbc.co/"
              target="_blank"
              className="account-links"
            >
              Log into our CRM
            </a>
            <NavLink to="/ambassador/signup" className="account-links">
              Join now as an IFBC Ambassador
            </NavLink>
          </div>
        </>
      )}
    </motion.div>
  );
};
export default Header;
