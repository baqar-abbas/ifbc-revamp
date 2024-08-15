import React, { useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";
import HorizontalNonLinearStepper from "../Stepper";
const Experience = ({
  setStep,
  handleInputChange,
  candDetails,
  candNames,
  selectedDetails,
  formFields,
  setFormFields,
  docid,
  visitedSteps,
  setVisitedSteps,
  step,
}) => {
  const fetchCandidates = async () => {
    const url = `https://backend.ifbc.co/api/experience/${docid}`;
    const response = await axios.get(url);
    return response.data;
  };

  // Use the query with enabled option based on docid
  const { data, isLoading, error } = useQuery(
    ["experience", docid], // Query key including docid
    fetchCandidates, // Query function
    {
      enabled: !!docid, // Only enable if docid and name are available
    }
  );

  // Optionally handle effects based on data, loading, and error
  useEffect(() => {
    if (data && !visitedSteps.exp) {
      // Handle the data
      setFormFields((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleExperience = async (e) => {
    e.preventDefault();
    setVisitedSteps((prev) => ({ ...prev, exp: true }));
    setStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 5);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        handlePreviousClick();
      } else if (event.key === "Enter") {
        handleExperience(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePreviousClick = () => {
    setVisitedSteps((prev) => ({ ...prev, exp: true }));
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
      id="eligibility"
      className="candidate-tabs-content grid grid-cols-12  gap-3"
    >
      <HorizontalNonLinearStepper activeStep={step} setActiveStep={setStep} />

      <div className="col-span-7 p-6">
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
          Experience
        </h1>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs">
            <p className="candidate-questions">
              Have you ever owned a business before?
            </p>
            <input
              onChange={handleInputChange}
              name="businessBefore"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.businessBefore }
                  : { defaultValue: candDetails?.businessBefore }
                : { value: formFields?.businessBefore })}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-questions">
              Do you have any marketing experience?
            </p>
            <input
              onChange={handleInputChange}
              name="marketingExperience"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.marketingExperience }
                  : { defaultValue: candDetails?.marketingExperience }
                : { value: formFields?.marketingExperience })}
            />
          </div>
        </div>
        <div className="candidate-two-col ">
          <div className="candidate-sub-childs">
            <p className="candidate-questions">
              Do you have any management experience?
            </p>
            <input
              onChange={handleInputChange}
              name="managementExperience"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.managementExperience }
                  : { defaultValue: candDetails?.managementExperience }
                : { value: formFields?.managementExperience })}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-questions ">
              Do you have sales experience?
            </p>
            <input
              onChange={handleInputChange}
              name="salesExperience"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.salesExperience }
                  : { defaultValue: candDetails?.salesExperience }
                : { value: formFields?.salesExperience })}
            />
          </div>
        </div>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs">
            <p className="candidate-questions">
              Do you have experience in reviewing financial statements?
            </p>
            <input
              onChange={handleInputChange}
              name="reviewFinancialStatement"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.reviewFinancialStatement }
                  : { defaultValue: candDetails?.reviewFinancialStatement }
                : { value: formFields?.reviewFinancialStatement })}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-questions">
              Do you have customer and account management experience?
            </p>
            <input
              onChange={handleInputChange}
              name="csExperience"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.csExperience }
                  : { defaultValue: candDetails?.csExperience }
                : { value: formFields?.csExperience })}
            />
          </div>
        </div>

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
            className="flex md:justify-end mt-5 max-md:flex-col max-md:gap-5"
          >
            <button
              className="candidate-btn md:w-40 max-md:w-full flex items-center justify-between"
              onClick={handleExperience}
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
      </div>
    </motion.div>
  );
};

export default Experience;
