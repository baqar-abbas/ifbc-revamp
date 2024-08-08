import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
const Eligibility = ({
  handleInputChange,
  candDetails,
  candNames,
  selectedDetails,
  setStep,
  formFields,
  setFormFields,
  docid,
  visitedSteps,
  setVisitedSteps,
}) => {
  const militaryOptions = [
    { value: "AA", label: "Select one" },
    { value: "Veteran", label: "Veteran" },
    { value: "First Responder", label: "First Responder" },
    { value: "Minority", label: "Minority" },
    { value: "Woman", label: "Woman" },
    { value: "Conversion", label: "Conversion" },
    { value: "Existing Franchisee", label: "Existing Franchisee" },
    { value: "N/A", label: "N/A" },
  ];

  const fetchCandidates = async () => {
    const url = `https://backend.ifbc.co/api/eligibility/${docid}`;
    const response = await axios.get(url);
    return response.data;
  };

  // Use the query with enabled option based on docid
  const { data, isLoading, error } = useQuery(
    ["eligibility", docid], // Query key including docid
    fetchCandidates, // Query function
    {
      enabled: !!docid, // Only enable if docid and name are available
    }
  );

  // Optionally handle effects based on data, loading, and error
  useEffect(() => {
    if (data && !visitedSteps.elig) {
      // Handle the data
      setFormFields((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleEligibility = async (e) => {
    e.preventDefault();
    setVisitedSteps((prev) => ({ ...prev, elig: true }));
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 3, type: "spring", bounce: 0.2 },
      }}
      id="eligibility"
      className="candidate-tabs-content"
    >
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
        Eligibility
      </h1>

      <div className="candidate-two-col ">
        <div className="candidate-sub-childs">
          <div>
            <p className="candidate-label">
              Have you been in the military or could you qualify for a VA loan?
              Do you qualify for any of these discounts
            </p>
          </div>
          <select
            onChange={handleInputChange}
            name="vaLoan"
            id="Qualify"
            className="candidate-select "
          >
            {militaryOptions.map((option, index) => (
              <option
                key={index}
                value={option.value}
                {...(candNames
                  ? candNames.length > 0
                    ? { selected: selectedDetails?.vaLoan === option.value }
                    : { selected: candDetails?.vaLoan === option.value }
                  : { selected: formFields?.vaLoan === option.value })}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="candidate-sub-childs">
          <p className="candidate-label">
            Have you or your spouse ever declared bankruptcy? If yes, when was
            it discharged?
          </p>
          <input
            onChange={handleInputChange}
            name="bankruptcy"
            type="text"
            className="candidate-input"
            required
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.bankruptcy }
                : { defaultValue: candDetails?.bankruptcy }
              : { value: formFields?.bankruptcy })}
          />
        </div>
      </div>

      <div className="candidate-two-col ">
        <div className="candidate-sub-childs">
          <p className="candidate-label">What is the value of your 401k/IRA?</p>
          <input
            onChange={handleInputChange}
            name="eligibilityValue"
            type="tel"
            className="candidate-input"
            required
            {...(candNames
              ? candNames.length > 0
                ? { value: selectedDetails?.eligibilityValue }
                : { defaultValue: candDetails?.eligibilityValue }
              : { value: formFields?.eligibilityValue })}
          />
        </div>
      </div>

      <div className="candidate-two-col ">
        <div className="flex flex-col">
          <p className="candidate-label">
            Have you or your spouse ever been convicted of something other than
            a minor traffic violation?
          </p>
          <ul className="flex mt-3 items-center">
            <li className="mr-4 flex items-center">
              <input
                onChange={handleInputChange}
                type="radio"
                className="mr-2"
                name="trafficViolation"
                defaultValue="true"
                {...(candNames
                  ? candNames.length > 0
                    ? {
                        checked: selectedDetails?.trafficViolation === "true",
                      }
                    : {
                        defaultChecked:
                          candDetails?.trafficViolation === "true",
                      }
                  : { checked: formFields?.trafficViolation === "true" })}
              />
              <label
                className="candidate-radio-text"
                htmlFor="Have you or your spouse ever been convicted of something other
          than a minor traffic violation?_yes"
              >
                Yes
              </label>
            </li>
            <li className="flex items-center">
              <input
                onChange={handleInputChange}
                type="radio"
                className="mr-2"
                name="trafficViolation"
                defaultValue="false"
                {...(candNames
                  ? candNames.length > 0
                    ? {
                        checked: selectedDetails?.trafficViolation === "false",
                      }
                    : {
                        defaultChecked:
                          candDetails?.trafficViolation === "false",
                      }
                  : { checked: formFields?.trafficViolation === "false" })}
              />
              <label
                className="candidate-radio-text"
                htmlFor="Have you or your spouse ever been convicted of something other
          than a minor traffic violation?_no"
              >
                No
              </label>
            </li>
          </ul>
          {formFields?.trafficViolation === "true" && (
            <div className="mt-3">
              <label
                htmlFor="trafficViolationReason"
                className="candidate-label"
              >
                Please provide details:
              </label>
              <input
                type="text"
                id="trafficViolationReason"
                name="trafficViolationReason"
                {...(candNames
                  ? candNames.length > 0
                    ? { value: selectedDetails?.trafficViolationReason }
                    : { defaultValue: candDetails?.trafficViolationReason }
                  : { value: formFields?.trafficViolationReason })}
                onChange={handleInputChange}
                className="candidate-input md:w-[80%] max-md:w-[90%]"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="candidate-label">
            Are you or your spouse subject to a pending litigation or
            unsatisfied judgment?
          </p>
          <ul className="flex items-center mt-3">
            <li className="mr-4 flex items-center">
              <input
                onChange={handleInputChange}
                type="radio"
                className="mr-2"
                name="unsatisfiedjudgment"
                defaultValue="true"
                {...(candNames
                  ? candNames.length > 0
                    ? {
                        checked:
                          selectedDetails?.unsatisfiedjudgment === "true",
                      }
                    : {
                        defaultChecked:
                          candDetails?.unsatisfiedjudgment === "true",
                      }
                  : { checked: formFields?.unsatisfiedjudgment === "true" })}
              />
              <label
                className="candidate-radio-text"
                htmlFor="Are you or your spouse subject to a pending litigation or unsatisfied judgment?_yes"
              >
                Yes
              </label>
            </li>
            <li className="flex items-center">
              <input
                onChange={handleInputChange}
                type="radio"
                className="mr-2"
                name="unsatisfiedjudgment"
                defaultValue="false"
                {...(candNames
                  ? candNames.length > 0
                    ? {
                        checked:
                          selectedDetails?.unsatisfiedjudgment === "false",
                      }
                    : {
                        defaultChecked:
                          candDetails?.unsatisfiedjudgment === "false",
                      }
                  : { checked: formFields?.unsatisfiedjudgment === "false" })}
              />
              <label
                className="candidate-radio-text"
                htmlFor="Are you or your spouse subject to a pending litigation or unsatisfied judgment?_no"
              >
                No
              </label>
            </li>
          </ul>
          {formFields?.unsatisfiedjudgment === "true" && (
            <div className="mt-3">
              <label
                htmlFor="unsatisfiedjudgmentReason"
                className="candidate-label"
              >
                Please provide details:
              </label>
              <input
                type="text"
                id="unsatisfiedjudgmentReason"
                name="unsatisfiedjudgmentReason"
                {...(candNames
                  ? candNames.length > 0
                    ? { value: selectedDetails?.unsatisfiedjudgmentReason }
                    : { defaultValue: candDetails?.unsatisfiedjudgmentReason }
                  : { value: formFields?.unsatisfiedjudgmentReason })}
                onChange={handleInputChange}
                className="candidate-input md:w-[100%] max-md:w-[90%]"
              />
            </div>
          )}
        </div>
      </div>

      {/* button container */}
      {/* lekn hume pehle step ke ilawa baaki saaray steps may previous button bhi chaye hoga agr kisi ko back jana ho to */}
      <div className="candidate-two-col">
        <div
          id="button-container-initial"
          className="flex md:justify-start mt-5 max-md:flex-col max-md:gap-5"
        >
          <button
            className="candidate-btn w-40 flex items-center justify-between"
            onClick={() => {
              setVisitedSteps((prev) => ({ ...prev, elig: true }));
              setStep((prevStep) => prevStep - 1);
            }}
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
          className="flex md:justify-end mt-5 max-md:flex-col max-md:gap-5 md:mr-6"
        >
          <button
            className="candidate-btn  w-40  flex items-center justify-between"
            onClick={handleEligibility}
          >
            Next
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

export default Eligibility;
