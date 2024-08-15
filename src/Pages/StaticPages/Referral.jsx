import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PageTransition from "src/Animations/PageTransition";
import DialogBox from "src/Popups/DialogBox";
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateUsername,
} from "src/Utils/SanitizeInput";
import PolicyContent from "../GlobalPageSections/PolicyContent";
const Referral = () => {
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

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

  const validateFields = () => {
    const reqFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      "reffirstname",
      "reflastname",
      "refemail",
      "refphone",
      "franchiseinterested",
      "desiredLoc",
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
        }
        if (newKey === "refemail" && !validateEmail(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "refphone" && !validatePhone(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "reffirstname" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "reflastname" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (
          newKey === "franchiseinterested" &&
          !validateUsername(value)
        ) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "desiredLoc" && !validateUsername(value)) {
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

      const formData = {
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        phone: formFields.phone,
        email: formFields.email,
        franchiseinterested: formFields.franchiseinterested,
        desiredLoc: formFields.desiredLoc,
        reffirstname: formFields.reffirstname,
        reflastname: formFields.reflastname,
        refphone: formFields.refphone,
        refemail: formFields.refemail,
      };

      const jsonData = JSON.stringify(formData);
      const baseUrl = "https://backend.ifbc.co/api/referral";

      // Send the POST request using Axios
      const response = await axios.post(baseUrl, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setFormErrors({});
        setSuccessMsg("Thank you for referring!");
        setLoading(false);
        setShow(true);

        setTimeout(() => {
          setShow(false);

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

  return (
    <PageTransition>
      <Helmet>
        <title>
          Make a Referral | International Franchise Business Consultant
        </title>
        <meta
          name="description"
          content="Refer a candidate to International Franchise Business Consultants. Help someone find the perfect franchise opportunity and receive rewards for your referral."
        />
      </Helmet>

      <div className="flex items-center justify-center p-6">
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

        <form
          className="p-8 flex flex-col gap-6 md:max-w-[45%] max-md:w-full text-gray-600 rounded-3xl w-full bg-custom-dark-blue/30 shadow-lg"
          onSubmit={handleSubmit}
        >
          {formErrors.error && (
            <p className="border-2 border-red-600 text-red-600 rounded-xl p-4 flex justify-between">
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
          <h1 className="candidate-sub-heading ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Candidate Information
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1 "
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                onChange={handleInputChange}
                name="firstname"
                placeholder="Enter First Name"
                className="candidate-input w-full"
                type="text"
                style={{
                  borderColor: formErrors.firstname ? "red" : undefined,
                }}
              />
              {formErrors.firstname && formErrors.firstname === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )}
            </div>

            <div className="flex flex-col">
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
                className="candidate-select w-full"
                type="text"
                style={{
                  borderColor: formErrors.lastname ? "red" : undefined,
                }}
              />
              {formErrors.lastname && formErrors.lastname === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
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
                className="candidate-input w-full"
                type="email"
                style={{
                  borderColor: formErrors.email ? "red" : undefined,
                }}
              />
              {formErrors.email && formErrors.email === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid Email (john@example.com)
                </p>
              )}
            </div>

            <div className="flex flex-col">
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
                className="candidate-input w-full"
                type="tel"
                style={{
                  borderColor: formErrors.phone ? "red" : undefined,
                }}
              />
              {formErrors.phone && formErrors.phone === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid Phone Number (Please use numbers only)
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                htmlFor="franchiseinterested"
              >
                Franchise Interested
              </label>
              <input
                onChange={handleInputChange}
                name="franchiseinterested"
                placeholder="Enter Franchise Name"
                className="candidate-input w-full"
                type="text"
                style={{
                  borderColor: formErrors.franchiseinterested
                    ? "red"
                    : undefined,
                }}
              />
              {formErrors.franchiseinterested &&
                formErrors.franchiseinterested === "invalid" && (
                  <p className=" text-red text-xs py-2 flex justify-between">
                    Invalid franchise name. It should be 3-16 characters long
                    and can include letters, numbers, underscores, and spaces.
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                htmlFor="desiredLoc"
              >
                Desired Location
              </label>
              <input
                onChange={handleInputChange}
                name="desiredLoc"
                placeholder="Enter Desired Location"
                className="candidate-select w-full"
                type="text"
                style={{
                  borderColor: formErrors.desiredLoc ? "red" : undefined,
                }}
              />
              {formErrors.desiredLoc && formErrors.desiredLoc === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid location. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )}
            </div>
          </div>

          <h1 className="candidate-sub-heading ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            Your Information
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1 "
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                onChange={handleInputChange}
                name="reffirstname"
                placeholder="Enter First Name"
                className="candidate-input w-full"
                type="text"
                style={{
                  borderColor: formErrors.reffirstname ? "red" : undefined,
                }}
              />
              {formErrors.reffirstname &&
                formErrors.reffirstname === "invalid" && (
                  <p className=" text-red text-xs py-2 flex justify-between">
                    Invalid username. It should be 3-16 characters long and can
                    include letters, numbers, underscores, and spaces.
                  </p>
                )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                onChange={handleInputChange}
                name="reflastname"
                placeholder="Enter Last Name"
                className="candidate-select w-full"
                type="text"
                style={{
                  borderColor: formErrors.reflastname ? "red" : undefined,
                }}
              />
              {formErrors.reflastname &&
                formErrors.reflastname === "invalid" && (
                  <p className=" text-red text-xs py-2 flex justify-between">
                    Invalid username. It should be 3-16 characters long and can
                    include letters, numbers, underscores, and spaces.
                  </p>
                )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={handleInputChange}
                name="refemail"
                placeholder="Enter Email"
                className="candidate-input w-full"
                type="email"
                style={{
                  borderColor: formErrors.refemail ? "red" : undefined,
                }}
              />
              {formErrors.refemail && formErrors.refemail === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid Email (john@example.com)
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color font-medium text-sm pl-1 pb-1"
                htmlFor="refphone"
              >
                Phone
              </label>
              <input
                onChange={handleInputChange}
                name="refphone"
                placeholder="Enter Phone Number"
                className="candidate-input w-full"
                type="tel"
                style={{
                  borderColor: formErrors.refphone ? "red" : undefined,
                }}
              />
              {formErrors.refphone && formErrors.refphone === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid Phone Number (Please use numbers only)
                </p>
              )}
            </div>
          </div>

          <PolicyContent isContact={true} />
          <div className="flex justify-center w-full">
            <button
              className="candidate-btn md:w-44 max-md:w-full"
              type="submit"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <motion.div
        className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div>
          <img
            src="/public/images/banners/refer.jpg"
            alt="Referral Banner"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <h2 className="text-2xl font-bold mb-2">Referral Program</h2>
          <p className="mb-4 text-gray-700">
            Invite your friends and earn rewards! Share the benefits with your
            network and enjoy exclusive perks.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Learn More
          </button>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default Referral;
