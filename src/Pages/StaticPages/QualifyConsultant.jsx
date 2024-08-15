import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "src/Animations/PageTransition";
import DialogBox from "src/Popups/DialogBox";
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateUsername,
} from "src/Utils/SanitizeInput";

const QualifyConsultant = () => {
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
        window.scrollTo(0, 0);
        return;
      }

      const formData = {
        firstname: formFields.firstname,
        lastname: formFields.lastname,
        email: formFields.email,
        phone:formFields.phone,
        street: formFields.street?? "",
        city: formFields.city?? "",
        postal: formFields.postal?? "",
        state: formFields.state?? "",
        geographical: formFields.geographical?? "",
        employed: formFields.employed?? "",
        presentations: formFields.presentations?? "",
        networking: formFields.networking?? "",
        hearAbout: formFields.hearAbout?? "",
      };
      // total fields are 13 but above coming only 12

      const jsonData = JSON.stringify(formData);
      const baseUrl = "https://backend.ifbc.co/api/becomeconsultant";

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

          history("/");
        }, 2000);
      } else {
        setFormErrors({ error: response.data });
        setLoading(false);
        window.scrollTo(0, 0);
        // Handle unexpected response
      }
    } catch (error) {
      console.error("Error:", error);
      setFormErrors({ error: error?.response?.data?.title });
      window.scrollTo(0, 0);
      // Handle unexpected response
      setLoading(false);
    }
  };

  const validateFields = () => {
    const reqFields = [
      "firstname",
      "lastname",
      "email",
      "phone",
      // "state",
      // "city",
      // "geographical",
      // "employed",
      // "presentations",
      // "networking",
      // "hearAbout",
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
        } else if (newKey === "state" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "city" && !validateUsername(value)) {
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

  // last field options
  const options = [
    { value: "", label: "Please Select", disabled: true },
    { value: "America Hires", label: "America Hires" },
    { value: "BPI Group Webinar", label: "BPI Group Webinar" },
    { value: "DBM Webinar", label: "DBM Webinar" },
    { value: "Email", label: "Email" },
    { value: "ExecuNet", label: "ExecuNet" },
    { value: "Facebook", label: "Facebook" },
    { value: "IFBC Consultation", label: "IFBC Consultation" },
    { value: "Friend", label: "Friend" },
    { value: "Google", label: "Google" },
    { value: "IMPACT Group Webinar", label: "IMPACT Group Webinar" },
    { value: "LHH Webinar", label: "LHH Webinar" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Networking", label: "Networking" },
    { value: "Newspaper", label: "Newspaper" },
    { value: "Other Search Engine", label: "Other Search Engine" },
    { value: "Online Advertising", label: "Online Advertising" },
    { value: "Outplacement", label: "Outplacement" },
    { value: "SBA", label: "SBA" },
    { value: "SBDC", label: "SBDC" },
    { value: "SCORE", label: "SCORE" },
    { value: "Seminar", label: "Seminar" },
    { value: "Tradeshow", label: "Tradeshow" },
    { value: "Webinar", label: "Webinar" }
  ];
  

  return (
    <PageTransition>
      <div className="flex justify-center my-10">
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
          className="p-8 flex flex-col gap-8 md:max-w-[50%] max-md:w-full text-gray-600 rounded-3xl bg-custom-dark-blue/30 shadow-lg"
          onSubmit={handleSubmit}
        >
      
      <div id="top-div">
      <h1 className="candidate-sub-heading">Become a Consultant</h1>
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
      </div>
         
          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="firstname"
              >
                First Name*
              </label>
              <input
                onChange={handleInputChange}
                name="firstname"
                placeholder="First Name"
                className="candidate-input w-full"
                style={{
                  borderColor: formErrors.firstname ? "red" : undefined,
                }}
                type="text"
              />{" "}
              {formErrors.firstname && formErrors.firstname === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-custom-heading-color text-sm font-medium" htmlFor="lastname">
                Last Name*
              </label>
              <input
                onChange={handleInputChange}
                name="lastname"
                placeholder="Last Name"
                className="candidate-input w-full"
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

          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label className="text-custom-heading-color text-sm font-medium" htmlFor="email">
                Email*
              </label>
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

            <div className="flex flex-col">
              <label className="text-custom-heading-color text-sm font-medium">
                Phone*
              </label>
              <input
                onChange={handleInputChange}
                name="phone"
                placeholder="Phone Number"
                className="candidate-input w-full"
                style={{ borderColor: formErrors.phone ? "red" : undefined }}
                id="phone"
                type="number"
                defaultValue={""}
              />{" "}
              {formErrors.phone && formErrors.phone === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid Phone Number (Please use numbers only)
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="street"
              >
                Street Address
              </label>
              <input
                onChange={handleInputChange}
                name="street"
                placeholder="Street Address"
                className="candidate-select w-full"
                // style={{ borderColor: formErrors.street ? "red" : undefined }}
                type="text"
              />{" "}
              {/* {formErrors.street && formErrors.street === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="city"
              >
                City
              </label>
              <input
                onChange={handleInputChange}
                name="city"
                placeholder="City"
                className="candidate-select w-full"
                // style={{ borderColor: formErrors.city ? "red" : undefined }}
                type="text"
              />{" "}
              {/* {formErrors.city && formErrors.city === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )} */}
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="state"
              >
                State/Region
              </label>
              <input
                onChange={handleInputChange}
                name="state"
                placeholder="State/Region"
                className="candidate-select w-full"
                // style={{ borderColor: formErrors.state ? "red" : undefined }}
                type="text"
              />{" "}
              {/* {formErrors.state && formErrors.state === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )} */}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="postal"
              >
                Postal Code
              </label>
              <input
                onChange={handleInputChange}
                name="postal"
                placeholder="Postal Code"
                className="candidate-select w-full"
                // style={{ borderColor: formErrors.postal ? "red" : undefined }}
                type="number"
              />{" "}
              {/* {formErrors.postal && formErrors.postal === "invalid" && (
                <p className=" text-red text-xs py-2 flex justify-between">
                  Invalid username. It should be 3-16 characters long and can
                  include letters, numbers, underscores, and spaces.
                </p>
              )} */}
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="geographical"
              >
                What geographical area are you interested in?
              </label>
              <input
                onChange={handleInputChange}
                name="geographical"
                className="candidate-input w-full"
                // style={{
                //   borderColor: formErrors.geographical ? "red" : undefined,
                // }}
                id="geographical"
                type="text"
              />{" "}
              {/* {formErrors.geographical &&
                formErrors.geographical === "invalid" && (
                  <p className=" text-red text-xs py-2 flex justify-between">
                    Invalid username. It should be 3-16 characters long and can
                    include letters, numbers, underscores, and spaces.
                  </p>
                )} */}
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="employed"
              >
                Are you currently employed?
              </label>
              <select
                name="employed"
                className="candidate-select w-full "
                // style={{ borderColor: formErrors.employed ? "red" : undefined }}
                id="employed"
                onChange={handleInputChange}
              >
                {/* {states.map((state, index) => (
                <option key={index} value={state.value}>
                  {state.text}
                </option>
              ))} */}
                <option value="">Select one</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label className="text-custom-heading-color text-sm font-medium">
                Comfortable Giving Presentations?
              </label>
              <select
                name="presentations"
                className="candidate-select w-full "
                // style={{ borderColor: formErrors.presentations ? "red" : undefined }}
                id="presentations"
                onChange={handleInputChange}
              >
                {/* {capitalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} */}
                <option value="">Select one</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                className="text-custom-heading-color text-sm font-medium"
                htmlFor="networking"
              >
                Comfortable networking?
              </label>
              <select
                name="networking"
                className="candidate-select w-full "
                // style={{ borderColor: formErrors.networking ? "red" : undefined }}
                id="networking"
                onChange={handleInputChange}
              >
                <option value="">Select one</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-14 max-md:gap-8">
            <div className="flex flex-col">
              <label className="text-custom-heading-color text-sm font-medium">
                How did you hear about us?
              </label>
              <select
                name="hearAbout"
                className="candidate-select w-full "
                id="hearAbout"
                onChange={handleInputChange}
              >
                {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
               
              </select>
            </div>
          </div>

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
    </PageTransition>
  );
};

export default QualifyConsultant;
