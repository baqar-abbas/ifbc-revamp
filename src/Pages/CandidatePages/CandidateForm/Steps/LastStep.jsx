import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PolicyContent from "src/Pages/GlobalPageSections/PolicyContent";
import DialogBox from "src/Popups/DialogBox";
import { motion } from "framer-motion";
import { validateUsername } from "src/Utils/SanitizeInput";
import HorizontalNonLinearStepper from "../Stepper";

const LastStep = ({
  handleInputChange,
  setStep,
  formFields,
  candDetails,
  candNames,
  show,
  setShow,
  loading,
  handleSubmit,
  setVisitedSteps,
  formErrors,
  setFormErrors,
  setLoading,
  step,
}) => {
  const timeZones = [
    { name: "Select a Timezone", abbreviation: "" },
    { name: "Alaska Time (AKT)", abbreviation: "AKT" },
    { name: "Atlantic Time (AST)", abbreviation: "AST" },
    { name: "Central Time (CT)", abbreviation: "CT" },
    { name: "Chamorro Time (ChST)", abbreviation: "ChST" },
    { name: "Eastern Time (ET)", abbreviation: "ET" },
    { name: "Hawaii-Aleutian Time (HAT)", abbreviation: "HAT" },
    { name: "Mountain Time (MT)", abbreviation: "MT" },
    { name: "Newfoundland Time Zone (NT)", abbreviation: "NT" },
    { name: "Pacific Time (PT)", abbreviation: "PT" },
    { name: "Samoa Time (SST)", abbreviation: "SST" },
  ];

  const timeRanges = [
    { name: "Select Preferred Call Time", range: "" },
    { name: "Early Morning", range: "7:00 AM to 9:00 AM" },
    { name: "Mid-Morning", range: "9:00 AM to 11:00 AM" },
    { name: "Midday", range: "11:00 AM to 1:00 PM" },
    { name: "Early Afternoon", range: "1:00 PM to 3:00 PM" },
    { name: "Late Afternoon", range: "3:00 PM to 5:00 PM" },
    { name: "Evening", range: "5:00 PM to 7:00 PM" },
  ];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        event.preventDefault();
        handlePreviousClick();
      } else if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLastStep = async (e) => {
    e.preventDefault();

    const reqFields = ["hearAboutUs"];
    let allFieldsValid = true;
    let formErrors = {};

    reqFields.forEach((field) => {
      const newKey = field;
      const value = formFields[newKey];

      if (!value) {
        formErrors[newKey] = "This field is required";
        allFieldsValid = false;
      } else {
        // Field-specific validations
        if (newKey === "hearAboutUs" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else {
          formErrors[newKey] = "";
        }
      }
    });
    setFormErrors(formErrors);

    if (allFieldsValid) {
      handleSubmit(e);
    } else {
      setFormErrors((prev) => ({
        ...prev,
        error: "Please fill in all the required fields",
      }));
      setLoading(false);
      window.scrollTo(0, 100);

      // Handle invalid fields (e.g., show validation errors)
    }
  };

  const handlePreviousClick = () => {
    setVisitedSteps((prev) => ({ ...prev, ls: true }));
    setStep((prevStep) => prevStep - 1);
    window.scrollTo(0, 5);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 3, type: "spring", bounce: 0.2 },
      }}
      id="initial"
      className="candidate-tabs-content grid grid-cols-12  gap-3"
    >
      <DialogBox show={show} setShow={setShow}>
        <div className="bg-white p-10">
          <p className="text-xl text-center text-custom-heading-color">
            Thank you for taking the time to contact us.
            <br />A IFBC customer service representative will contact you within
            two business days. <br /> For the mean time you can indulge yourself
            in searching some franchises <br />
            <br />
            <NavLink to="/search-franchises" className="candidate-btn w-[50%]">
              Search Franchise
            </NavLink>
          </p>
        </div>
      </DialogBox>
      <HorizontalNonLinearStepper activeStep={step} setActiveStep={setStep} />
      <div className="col-span-7 p-6">
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
        )}{" "}
        <div
          id="fc-second-last-row"
          className="grid md:grid-cols-2 max-md:grid-cols-1 md:gap-x-10"
        >
          <div className="w-full mr-4 flex flex-col justify-between my-3">
            <p className="candidate-label">Preferred Call Time</p>

            <select
              name="preferredCallTime"
              className="candidate-select w-full"
              onChange={handleInputChange}
            >
              {timeRanges.map((tz) => (
                <option
                  value={tz.name}
                  {...(candNames
                    ? candNames.length > 0
                      ? { selected: selectedDetails?.preferredCallTime }
                      : { selected: candDetails?.preferredCallTime }
                    : { selected: formFields?.preferredCallTime })}
                >
                  {tz.name} {tz.range && `(${tz.range})`}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full mr-4 flex flex-col justify-between my-3">
            <p className="candidate-label">Timezone</p>

            <select
              name="timezone"
              className="candidate-select w-full"
              onChange={handleInputChange}
            >
              {timeZones.map((tz) => (
                <option
                  value={tz.name}
                  {...(candNames
                    ? candNames.length > 0
                      ? { selected: selectedDetails?.timezone }
                      : { selected: candDetails?.timezone }
                    : { selected: formFields?.timezone })}
                >
                  {tz.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full mr-4 flex flex-col justify-between my-3">
          <p className="candidate-label capitalize">
            How did you hear about us / Referred by? We will be In Touch
            Shortly!*
          </p>
          <input
            type="text"
            name="hearAboutUs"
            className="candidate-input w-full"
            required
            style={{
              borderColor: formErrors?.hearAboutUs ? "red" : undefined,
            }}
            onChange={handleInputChange}
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.hearAboutUs }
                : { defaultValue: candDetails?.hearAboutUs }
              : { value: formFields?.hearAboutUs })}
          />
        </div>
        <PolicyContent isContact={true} />
        <div className="candidate-two-col">
          <div
            id="button-container-initial"
            className="flex md:justify-start mt-5 max-md:flex-col max-md:gap-5"
          >
            <button
              className="candidate-btn md:w-40 max-md:w-full flex items-center justify-between"
              onClick={handlePreviousClick}
            >
              {" "}
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
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
              Previous
            </button>
          </div>
          <div
            id="button-container-initial"
            className="flex md:justify-end mt-5 max-md:flex-col max-md:gap-5 md:mr-3"
          >
            <button
              onClick={handleLastStep}
              className="candidate-btn  md:w-40 max-md:w-full  flex items-center justify-between"
            >
              {loading ? "Loading..." : "Submit"}
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
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LastStep;
