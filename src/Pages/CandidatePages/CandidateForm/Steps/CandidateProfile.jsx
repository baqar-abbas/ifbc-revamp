import React, { useEffect, useState } from "react";
import FormFirstRow from "../FormFirstRow";
import FormSecondRow from "../FormSecondRow";
import { motion } from "framer-motion";

import data from "../../../../../public/files/data.json"; // Adjust the path if necessary
import {
  validateEmail,
  validatePhone,
  validateUsername,
  validateZipcode,
} from "src/Utils/SanitizeInput";
import HorizontalNonLinearStepper from "../Stepper";
const CandidateProfile = ({
  handleInputChange,
  formErrors,
  candDetails,
  candNames,
  setSelectedDocId,
  selectedDocId,
  selectedDetails,
  formFields,
  setFormFields,
  setStep,
  setFormErrors,
  listingNames,
  docid,
  visitedSteps,
  setVisitedSteps,
  completed,
  setCompleted,
  step,
}) => {
  const [citiesT, setCitiesT] = useState([]);
  const [citiesC, setCitiesC] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStateT, setSelectedStateT] = useState(null);
  const [selectedStateC, setSelectedStateC] = useState(null);

  const stateDD = (name) => {
    return (
      <select
        onChange={(e) => handleStateChange(e, name)}
        name={`${name}State`}
        className="candidate-select"
        style={{
          borderColor: formErrors[`${name}State`] ? "red" : undefined,
        }}
      >
        {!formFields[`${name}State`] && <option value="">Select State</option>}
        {states.map((state, index) => (
          <option
            key={index}
            value={state.value}
            {...(candNames
              ? candDetails
                ? { selected: state.value === candDetails[`${name}State`] }
                : {
                    selected: state.value === selectedDetails[`${name}State`],
                  }
              : { selected: formFields[`${name}State`] === state.value })}
          >
            {state.text}
          </option>
        ))}
      </select>
    );
  };

  const states = [
    { value: "AL", text: "Alabama" },
    { value: "AB", text: "Alberta" },
    { value: "AK", text: "Alaska" },
    { value: "AZ", text: "Arizona" },
    { value: "AR", text: "Arkansas" },
    { value: "BC", text: "British Columbia" },
    { value: "CA", text: "California" },
    { value: "CO", text: "Colorado" },
    { value: "CT", text: "Connecticut" },
    { value: "DE", text: "Delaware" },
    { value: "DC", text: "District Of Columbia" },
    { value: "FL", text: "Florida" },
    { value: "GA", text: "Georgia" },
    { value: "HI", text: "Hawaii" },
    { value: "ID", text: "Idaho" },
    { value: "IL", text: "Illinois" },
    { value: "IN", text: "Indiana" },
    { value: "IA", text: "Iowa" },
    { value: "KS", text: "Kansas" },
    { value: "KY", text: "Kentucky" },
    { value: "LA", text: "Louisiana" },
    { value: "ME", text: "Maine" },
    { value: "MB", text: "Manitoba" },
    { value: "MD", text: "Maryland" },
    { value: "MA", text: "Massachusetts" },
    { value: "MI", text: "Michigan" },
    { value: "MN", text: "Minnesota" },
    { value: "MS", text: "Mississippi" },
    { value: "MO", text: "Missouri" },
    { value: "MT", text: "Montana" },
    { value: "NE", text: "Nebraska" },
    { value: "NV", text: "Nevada" },
    { value: "NB", text: "New Brunswick" },
    { value: "NH", text: "New Hampshire" },
    { value: "NJ", text: "New Jersey" },
    { value: "NM", text: "New Mexico" },
    { value: "NY", text: "New York" },
    { value: "NL", text: "Newfoundland and Labrador" },
    { value: "NC", text: "North Carolina" },
    { value: "ND", text: "North Dakota" },
    { value: "NT", text: "Northwest Territories" },
    { value: "NS", text: "Nova Scotia" },
    { value: "NU", text: "Nunavut" },
    { value: "OH", text: "Ohio" },
    { value: "OK", text: "Oklahoma" },
    { value: "ON", text: "Ontario" },
    { value: "OR", text: "Oregon" },
    { value: "PA", text: "Pennsylvania" },
    { value: "PE", text: "Prince Edward Island" },
    { value: "QC", text: "Quebec" },
    { value: "RI", text: "Rhode Island" },
    { value: "SC", text: "South Carolina" },
    { value: "SD", text: "South Dakota" },
    { value: "SK", text: "Saskatchewan" },
    { value: "TN", text: "Tennessee" },
    { value: "TX", text: "Texas" },
    { value: "UT", text: "Utah" },
    { value: "VT", text: "Vermont" },
    { value: "VA", text: "Virginia" },
    { value: "WA", text: "Washington" },
    { value: "WV", text: "West Virginia" },
    { value: "WI", text: "Wisconsin" },
    { value: "WY", text: "Wyoming" },
    { value: "YT", text: "Yukon Territory" },
    { value: "INT", text: "International" },
  ];
  const getCitiesOfState = (stateCode) => {
    const state = states.find((s) => s.value === stateCode);

    if (state) {
      const stateName = state.text;
      return data[stateName] || [];
    } else {
      return [];
    }
  };

  const handleStateChange = (e, name) => {
    const stateCode = e.target.value;
    const cityList = getCitiesOfState(stateCode);

    if (name === "territory") {
      setSelectedStateT(stateCode);
      setCitiesT(cityList);
    } else {
      setSelectedStateC(stateCode);
      setCitiesC(cityList);
    }
    setFormFields((prev) => {
      return {
        ...prev,
        [`${name}State`]: stateCode,
      };
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        // Prevent the default Backspace behavior (like navigating back)
        event.preventDefault();

        handleCanProfile(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [formFields]);

  const handleCanProfile = async (e) => {
    e.preventDefault();

    const reqFields = [
      "firstName",
      "lastName",
      "phone",
      "email",
      "territoryState",
      "territoryCity",
      "territoryZipcode",
      "franchiseInterested",
      "currentCity",
      "currentZipcode",
      "currentState",
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
        } else if (newKey === "firstName" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "lastName" && !validateUsername(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "territoryZipcode" && !validateZipcode(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else if (newKey === "currentZipcode" && !validateZipcode(value)) {
          formErrors[newKey] = "invalid";
          allFieldsValid = false;
        } else {
          formErrors[newKey] = "";
        }
      }
    });
    setFormErrors(formErrors);

    if (allFieldsValid) {
      e.preventDefault();
      setVisitedSteps((prev) => ({ ...prev, candprofile: true }));
      setStep((prevStep) => prevStep + 1);
      window.scrollTo(0, 0);
    } else {
      setFormErrors((prev) => ({
        ...prev,
        error: "Please fill in all the required fields",
      }));
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 3, type: "spring", bounce: 0.2 },
      }}
      id="candprofile"
      className="candidate-tabs-content grid grid-cols-12  gap-3"
    >
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
        <FormFirstRow
          handleInputChange={handleInputChange}
          formErrors={formErrors}
          candDetails={candDetails}
          candNames={candNames}
          setSelectedDocId={setSelectedDocId}
          selectedDocId={selectedDocId}
          selectedDetails={selectedDetails}
          formFields={formFields}
        />
        <FormSecondRow
          stateDD={stateDD}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
          candDetails={candDetails}
          candNames={candNames}
          selectedDetails={selectedDetails}
          selectedStateT={selectedStateT}
          formFields={formFields}
          citiesT={citiesT}
          citiesC={citiesC}
          listingNames={listingNames}
          selectedStateC={selectedStateC}
          setFormFields={setFormFields}
          docid={docid}
          visitedSteps={visitedSteps}
          setVisitedSteps={setVisitedSteps}
        />
        <div className="flex w-full justify-end">
          <button
            className="candidate-btn md:w-40 max-md:w-full flex items-center justify-between"
            type="submit"
            onClick={handleCanProfile}
          >
            {loading ? "Loading..." : "Next"}
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
    </motion.div>
  );
};

export default CandidateProfile;
