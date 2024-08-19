import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PolicyContent from "src/Pages/GlobalPageSections/PolicyContent";
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateStrongPassword,
  validateUsername,
} from "src/Utils/SanitizeInput";
import DialogBox from "src/Popups/DialogBox";
import axios from "axios";
import { useQuery } from "react-query";
import BarLoader from "src/Animations/BarLoader";
import PageTransition from "src/Animations/PageTransition";

const AmbassadorSignup = () => {
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const { email: nonValidatedEmail } = useParams();
  const [email, setEmail] = useState();

  const fetchAmbassadors = () => {
    const url = `https://backend.ifbc.co/api/ambassador/email/${email}`;
    return axios.get(url);
  };

  useEffect(() => {
    if (nonValidatedEmail) {
      if (validateEmail(nonValidatedEmail)) {
        setEmail(nonValidatedEmail);
        setFormFields((prev) => ({ ...prev, email: nonValidatedEmail }));
      }
    }
  }, [nonValidatedEmail]);

  const {
    data: AmbassadorData,
    isLoading,
    isError,
  } = useQuery(["AMBASSADOR", email], fetchAmbassadors, { enabled: !!email });

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
  const floatingAnimation = {
    y: ["0%", "10%", "0%"], // Keyframes for vertical movement
    transition: {
      duration: 3, // Duration for one full cycle
      ease: "easeInOut",
      repeat: Infinity, // Infinite loop
      repeatType: "loop", // Loop the animation
    },
  };

  const validateFields = () => {
    const reqFields = ["firstname", "lastname", "email", "phone", "password"];
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
        } else if (newKey === "password" && !validateStrongPassword(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else {
          formErrors[newKey] = "";
        }
      }
    });

    if (allFieldsValid) {
      if (formFields?.password !== formFields?.confirmpassword) {
        formErrors["password"] = "same";
        formErrors["confirmpassword"] = "same";
        allFieldsValid = false;
      }
    }

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
        window.scrollTo(0, 200);
        return;
      }

      const formData = {
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        phone: formFields.phone,
        email: formFields.email,
        password: formFields.password,
        isVerified: email ? "true" : "false",
      };

      const jsonData = JSON.stringify(formData);
      const baseUrl = "https://backend.ifbc.co/api/ambassador";

      // Send the POST request using Axios
      const response = await axios.post(baseUrl, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setFormErrors({});
        setSuccessMsg("Thank you for joining IFBC as an ambassador!");
        setLoading(false);
        setShow(true);

        setTimeout(() => {
          setShow(false);

          history("/ambassador/dashboard");
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

  return (
    <PageTransition>
      <div
        className="min-h-screen flex flex-col items-center justify-center max-md:p-5"
        style={{
          background:
            "linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)",
        }}
      >
        {isLoading ? (
          <BarLoader bgcolor={"white"} />
        ) : AmbassadorData?.data && !isError ? (
          <motion.div
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-lg max-md:my-5 md:my-10 md:p-10 max-md:p-5 flex flex-col justify-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-center text-xl">
              You have already created an IFBC Ambassador account recently, you
              can login to your account
            </p>
            <NavLink to="/login" className="candidate-btn md:w-64 mx-auto">
              Login to your account
            </NavLink>
          </motion.div>
        ) : (
          <>
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
              </div>
            </DialogBox>

            <motion.form
              onSubmit={handleSubmit}
              className="w-full max-w-4xl bg-white rounded-3xl shadow-lg max-md:my-5 md:my-10 "
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 ">
                <motion.div
                  className="flex  flex-col justify-center items-center rounded-tl-3xl rounded-bl-3xl text-ambassador p-5 relative"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    backgroundImage:
                      window.innerWidth < 768
                        ? undefined
                        : "url(/images/photos/ambassador.jpg)",
                    backgroundSize: "cover",
                  }}
                >
                  <motion.div
                    className="md:absolute bg-custom-dark-blue md:top-5 md:-left-1/2 p-8 flex flex-col gap-2 rounded-3xl md:w-96 "
                    animate={
                      window.innerWidth < 768 ? undefined : floatingAnimation
                    }
                  >
                    <motion.h2
                      className="text-2xl font-medium text-center text-white z-50 capitalize "
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      Start Your Journey as an IFBC Ambassador!
                    </motion.h2>
                    <h2 className=" text-sm font-light text-center text-white z-50">
                      Become a valued ambassador for our brand and help us
                      spread the word about our mission and products! As an
                      ambassador, you'll have the opportunity to work closely
                      with us, represent our values, and engage with our
                      community in meaningful ways.
                    </h2>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-6 p-10 "
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {formErrors.error && (
                    <p className="border-2 border-red-600 text-red-600 rounded-xl p-4 flex justify-between items-center">
                      {formErrors.error}
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
                          d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                        />
                      </svg>
                    </p>
                  )}
                  <div className="">
                    <label
                      className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                      htmlFor="firstname"
                    >
                      First Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="firstname"
                      placeholder="Enter First Name"
                      className="candidate-input w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-custom-heading-color"
                      type="text"
                      style={{
                        borderColor: formErrors.firstname ? "red" : undefined,
                      }}
                    />
                    {formErrors.firstname &&
                      formErrors.firstname === "invalid" && (
                        <p className="text-red-500 text-xs py-2">
                          Invalid username. It should be 3-16 characters long
                          and can include letters, numbers, underscores, and
                          spaces.
                        </p>
                      )}
                  </div>

                  <div className="">
                    <label
                      className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                      htmlFor="lastname"
                    >
                      Last Name
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="lastname"
                      placeholder="Enter Last Name"
                      className="candidate-input w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-custom-heading-color"
                      type="text"
                      style={{
                        borderColor: formErrors.lastname ? "red" : undefined,
                      }}
                    />
                    {formErrors.lastname &&
                      formErrors.lastname === "invalid" && (
                        <p className=" text-red-500 text-xs py-2 flex justify-between">
                          Invalid username. It should be 3-16 characters long
                          and can include letters, numbers, underscores, and
                          spaces.
                        </p>
                      )}
                  </div>

                  <div className="">
                    <label
                      className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="email"
                      placeholder="Enter Email"
                      className={`candidate-input w-full ${email ? "bg-gray-200 focus:ring-0 cursor-not-allowed" : " focus:ring-1"} border-gray-300  rounded-lg p-2  focus:ring-custom-heading-color `}
                      type="email"
                      style={{
                        borderColor: formErrors.email ? "red" : undefined,
                      }}
                      value={email}
                      disabled={email ? true : false}
                    />
                    {formErrors.email && formErrors.email === "invalid" && (
                      <p className="text-red-500 text-xs py-2">
                        Invalid Email (john@example.com)
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label
                      className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="phone"
                      placeholder="Enter Phone Number"
                      className="candidate-input w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-custom-heading-color"
                      type="number"
                      style={{
                        borderColor: formErrors.phone ? "red" : undefined,
                      }}
                    />
                    {formErrors.phone && formErrors.phone === "invalid" && (
                      <p className=" text-red-500 text-xs py-2 flex justify-between">
                        Invalid Phone Number, Enter 10/11 Digits
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label
                      className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleInputChange}
                      name="password"
                      placeholder="Enter Password"
                      className="candidate-input w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-custom-heading-color"
                      type="password"
                      style={{
                        borderColor: formErrors.password ? "red" : undefined,
                      }}
                    />
                    {formErrors.password &&
                      formErrors.password === "invalid" && (
                        <p className="text-red-500 text-xs py-2">
                          Password must be at least 8 characters long and
                          include at least one uppercase letter, one lowercase
                          letter, one number, and one special character.
                        </p>
                      )}
                    {formErrors.password && formErrors.password === "same" && (
                      <p className="text-red-500 text-xs py-2">
                        Passwords don't match!
                      </p>
                    )}
                  </div>

                  <div className="">
                    <div className="flex flex-col">
                      <label
                        className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                        htmlFor="lastname"
                      >
                        Confirm Password
                      </label>
                      <input
                        onChange={handleInputChange}
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        className="candidate-select w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-custom-heading-color"
                        type="password"
                        style={{
                          borderColor: formErrors.lastname ? "red" : undefined,
                        }}
                      />
                      {formErrors.confirmpassword &&
                        formErrors.confirmpassword === "same" && (
                          <p className="text-red-500 text-xs py-2">
                            Passwords don't match!
                          </p>
                        )}
                    </div>
                  </div>
                  <PolicyContent isContact={true} />
                  <button className="candidate-btn max-md:w-full">
                    {loading ? "Loading..." : "Create Account"}
                  </button>
                </motion.div>
              </div>
            </motion.form>
          </>
        )}
      </div>
    </PageTransition>
  );
};

export default AmbassadorSignup;
