import { motion } from "framer-motion";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "src/Context/ListingDataContext";
import { decrementByListing } from "src/Redux/listingReducer";
import DialogBox from "./DialogBox";
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateUsername,
  validateZipcode,
} from "src/Utils/SanitizeInput";
import axios from "axios";
import PolicyContent from "src/Pages/GlobalPageSections/PolicyContent";
const ShoppingCartPopup = () => {
  const { listings } = useContext(MyContext);
  const cartListings = useSelector((state) => state.counter.cartListings);
  const dispatch = useDispatch();
  const [formShow, setFormShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const stickyThreshold = formShow ? 200 : 100; // Replace with the height after which the div should become sticky
      if (window.scrollY > stickyThreshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <motion.div
      className={` pointer-events-auto bg-[#2176ff]/30 rounded-3xl  transition-all duration-500 ease-in-out   ${
        isSticky ? "sticky  md:mt-6" : "w-full md:mt-3 relative "
      } ${cartListings?.length > 0 ? (isSticky ? "top-32" : "") : "top-44 p-2"}`}
    >
      {cartListings?.length > 0 ? (
        <div className=" overflow-y-auto px-4 py-6 w-full">
          <h1 className="text-md font-light text-center text-white bg-custom-dark-blue p-1 mb-4 rounded-3xl">
            Review Franchises
          </h1>

          <div
            id="sub-container"
            className="divide-y-2 divide-custom-dark-blue/10 w-full max-h-[100px] overflow-y-auto px-2"
          >
            {/* items-row */}
            {listings
              .filter((listing) => cartListings.includes(listing.docId))
              .map((listing, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between py-1 relative"
                >
                  <div id="item-side" className="flex  items-center w-full">
                    <div
                      id="content-side"
                      className="flex flex-col max-sm:items-center"
                    >
                      <h2 className="text-[0.8rem]">{listing.name}</h2>
                    </div>
                  </div>
                  <div
                    onClick={() => dispatch(decrementByListing(listing.docId))}
                    id="btn-side"
                    className="  text-red-800 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
          </div>

          {formShow ? (
            <CheckOutForm listings={listings} cartListings={cartListings} />
          ) : (
            <div
              id="button-container"
              className="flex max-sm:justify-center sm:justify-center items-center py-5 gap-5 flex-col"
            >
              <button
                onClick={() => setFormShow(true)}
                className="border-2 border-custom-heading-color bg-custom-heading-color  text-white md:px-5 max-md:p-3 rounded-3xl hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2  font-light w-full flex justify-between text-sm items-center"
              >
                Request Free Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <NoListingsFound />
      )}
    </motion.div>
  );
};

const NoListingsFound = () => {
  return (
    <>
      <h1 className="text-md font-light text-center text-white bg-custom-dark-blue p-1 rounded-3xl">
        Franchise List
      </h1>
      <div className="flex flex-col justify-center items-center gap-6  h-full p-2">
        <h1 className="text-md  text-center  text-custom-heading-color">
          Select up to 20 franchises to gain detailed insights and make informed
          decisions!
        </h1>
      </div>
    </>
  );
};

const CheckOutForm = ({ cartListings, listings }) => {
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const capitalOptions = [
    { value: "", label: "Available Capital" },
    { value: "10000", label: "Less than $10,000" },
    { value: "20000", label: "$20,000" },
    { value: "30000", label: "$30,000" },
    { value: "40000", label: "$40,000" },
    { value: "50000", label: "$50,000" },
    { value: "60000", label: "$60,000" },
    { value: "70000", label: "$70,000" },
    { value: "80000", label: "$80,000" },
    { value: "90000", label: "$90,000" },
    { value: "100000", label: "$100,000" },
    { value: "150000", label: "$150,000" },
    { value: "200000", label: "$200,000" },
    { value: "250000", label: "$250,000" },
    { value: "300000", label: "$300,000" },
    { value: "350000", label: "$350,000" },
    { value: "400000", label: "$400,000" },
    { value: "450000", label: "$450,000" },
    { value: "500000", label: "$500,000" },
    { value: "500001", label: "$500,000+" },
  ];

  const validateFields = () => {
    const reqFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "zipcode",
      "desiredLoc",
      "timeFrame",
      "availCapital",
    ];
    let allFieldsValid = true;
    let formErrors = {};

    reqFields.forEach((field) => {
      const newKey = field;
      const value = formFields[newKey]?.trim() || "";

      if (!value) {
        formErrors[newKey] = "This field is required";
        allFieldsValid = false;
      } else {
        // Field-specific validations
        if (newKey === "email" && !validateEmail(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "phone" && !validatePhone(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "firstname" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "lastname" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "zipcode" && !validateZipcode(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else {
          formErrors[newKey] = "";
        }
      }
    });

    setFormErrors(formErrors);
    return allFieldsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const allFieldsValid = validateFields();
      if (!allFieldsValid) {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields correctly",
        }));
        setLoading(false);
        window.scrollTo(0, 500);
        return;
      }

      if (!cartListings || cartListings.length === 0) {
        setFormErrors((prev) => ({
          ...prev,
          error: "Cart listings cannot be empty",
        }));
        setLoading(false);
        window.scrollTo(0, 500);
        return;
      }

      const formData = {
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        phone: formFields.phone,
        email: formFields.email,
        zipcode: formFields.zipcode,
        desiredLoc: formFields.desiredLoc,
        timeFrame: formFields.timeFrame,
        availCapital: formFields.availCapital,
        newsletter: formFields.newsletter ?? false,
        cartListings: JSON.stringify(cartListings),
      };

      const jsonData = JSON.stringify(formData);
      const baseUrl = "https://backend.ifbc.co/api/checkout";

      // Send the POST request using Axios
      const response = await axios.post(baseUrl, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setFormErrors({});
        setSuccessMsg("Thank you for requesting!");
        setLoading(false);
        setShow(true);

        setTimeout(() => {
          setShow(false);
          listings
            .filter((listing) => cartListings.includes(listing.docId))
            .map((listing) => {
              dispatch(decrementByListing(listing.docId));
            });
          history("/");
        }, 2000);
      } else {
        setFormErrors({ error: response.data });
        setLoading(false);
        window.scrollTo(0, 500);
        // Handle unexpected response
      }
    } catch (error) {
      console.error("Error:", error);
      setFormErrors({ error: error?.response?.data?.title });
      window.scrollTo(0, 500);
      // Handle unexpected response
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : sanitizeInput(value);

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: inputValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <div id="left-side-checkout-form" className="mt-5">
      <DialogBox setShow={setShow} show={show}>
        <button
          className="absolute top-5 right-10"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <div className="bg-white p-10 flex flex-col gap-3">
          <h1 className="text-3xl uppercase text-center">{successMsg}</h1>
          <p className="text-xl text-center">We will contact you soon.</p>
        </div>
      </DialogBox>
      <form className="flex flex-col gap-2 rounded-lg ">
        {formErrors.error && (
          <p className="border-2 border-red-600 text-red-600 p-1 items-center flex justify-between mt-2 text-xs">
            {formErrors.error}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          </p>
        )}
        <div className="flex gap-2">
          <div className="">
            <input
              onChange={handleInputChange}
              name="firstname"
              placeholder="First Name"
              className="candidate-select w-full"
              style={{ borderColor: formErrors.firstname ? "red" : undefined }}
              type="text"
            />{" "}
            {formErrors.firstname && formErrors.firstname === "invalid" && (
              <p className=" text-red text-xs py-2 flex justify-between">
                Invalid username. It should be 3-16 characters long and can
                include letters, numbers, underscores, and spaces.
              </p>
            )}
          </div>

          <div className=" ">
            <input
              onChange={handleInputChange}
              name="lastname"
              placeholder="Last Name"
              className="candidate-select w-full"
              style={{ borderColor: formErrors.lastname ? "red" : undefined }}
              type="text"
            />{" "}
            {formErrors.lastname && formErrors.lastname === "invalid" && (
              <p className=" text-red text-xs py-2 flex justify-between">
                Invalid username. It should be 3-16 characters long and can
                include letters, numbers, underscores, and spaces.
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="">
            <input
              onChange={handleInputChange}
              name="phone"
              placeholder="Phone Number"
              className="candidate-input w-full"
              style={{ borderColor: formErrors.phone ? "red" : undefined }}
              id="phone"
              type="tel"
              defaultValue={""}
            />{" "}
            {formErrors.phone && formErrors.phone === "invalid" && (
              <p className=" text-red text-xs py-2 flex justify-between">
                Invalid Phone Number (Please use numbers only)
              </p>
            )}
          </div>

          <div className="">
            <input
              onChange={handleInputChange}
              name="zipcode"
              placeholder="ZIP Code"
              className="candidate-input w-full"
              style={{ borderColor: formErrors.zipcode ? "red" : undefined }}
              id="zip"
              type="number"
            />
          </div>
        </div>
        <div className="">
          <input
            onChange={handleInputChange}
            name="email"
            placeholder="Email"
            className="candidate-input w-full"
            style={{ borderColor: formErrors.email ? "red" : undefined }}
            id="email"
            type="email"
          />
          {formErrors.email && formErrors.email === "invalid" && (
            <p className=" text-red text-xs py-2 flex justify-between">
              Invalid Email (john@example.com)
            </p>
          )}
        </div>
        <div className="">
          <input
            name="desiredLoc"
            className="candidate-select w-full "
            style={{ borderColor: formErrors.desiredLoc ? "red" : undefined }}
            id="desiredLoc"
            placeholder="Desired Location"
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <select
            name="availCapital"
            className="candidate-select w-full"
            style={{ borderColor: formErrors.availCapital ? "red" : undefined }}
            id="availCapital"
            onChange={handleInputChange}
          >
            {capitalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <select
            name="timeFrame"
            className="candidate-select w-full "
            style={{ borderColor: formErrors.timeFrame ? "red" : undefined }}
            id="timeFrame"
            onChange={handleInputChange}
          >
            <option value="">Time Frame</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>
        <p className="text-xs text-custom-heading-color text-justify    rounded-3xl">
          By submitting this form, you agree to receive calls, texts, or emails.
          See our{" "}
          <a href="/terms-conditions" className="  underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="  underline">
            Privacy Policy
          </a>{" "}
          for more details.
        </p>

        <div className=" flex justify-center">
          <button
            className="candidate-btn flex justify-between items-center w-full"
            type="submit"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Request Now"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingCartPopup;
