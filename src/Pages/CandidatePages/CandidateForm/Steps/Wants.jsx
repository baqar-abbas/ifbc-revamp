import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import HorizontalNonLinearStepper from "../Stepper";
const Wants = ({
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
    const url = `https://backend.ifbc.co/api/wants/${docid}`;
    const response = await axios.get(url);
    return response.data;
  };

  // Use the query with enabled option based on docid
  const { data, isLoading, error } = useQuery(
    ["wants", docid], // Query key including docid
    fetchCandidates, // Query function
    {
      enabled: !!docid, // Only enable if docid and name are available
    }
  );

  // Optionally handle effects based on data, loading, and error
  useEffect(() => {
    if (data && !visitedSteps.wants) {
      // Handle the data
      setFormFields((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const handleWants = async (e) => {
    e.preventDefault();
    setVisitedSteps((prev) => ({ ...prev, wants: true }));
    setStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 5);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        handlePreviousClick();
      } else if (event.key === "Enter") {
        handleWants(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePreviousClick = () => {
    setVisitedSteps((prev) => ({ ...prev, wants: true }));
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

      <div className="max-md:col-span-12 md:col-span-7 p-6">
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
          Wants
        </h1>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              What do you find most attractive about being a business owner?
            </p>
            <input
              onChange={handleInputChange}
              name="attractiveBusinessOwner"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.attractiveBusinessOwner }
                  : { defaultValue: candDetails?.attractiveBusinessOwner }
                : { value: formFields?.attractiveBusinessOwner })}
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              From your past experience is there anything you prefer not to
              handle with your new business?
            </p>
            <input
              onChange={handleInputChange}
              name="handleNewBusiness"
              type="text"
              className="candidate-input"
              required
              {...(candNames
                ? candNames.length > 0
                  ? { value: selectedDetails?.handleNewBusiness }
                  : { defaultValue: candDetails?.handleNewBusiness }
                : { value: formFields?.handleNewBusiness })}
            />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="candidate-label">
            What are your expectations from the business? What type of lifestyle
            are you looking to achieve?
          </label>
          <textarea
            onChange={handleInputChange}
            name="businessExpectations"
            id="message"
            rows={10}
            className="bg-gray-50 border p-2 rounded-3xl border-custom-dark-blue text-custom-dark-blue text-sm block focus:outline-none focus:ring-1 w-full"
            value={
              candNames
                ? candNames.length > 0
                  ? selectedDetails?.businessExpectations
                  : candDetails?.businessExpectations
                : formFields?.businessExpectations || ""
            }
          />
        </div>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs ">
            <p className="candidate-label">Do you prefer B2B or B2C?</p>
            <ul className="flex mt-3 items-center">
              <li className="flex mr-4">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="preferB2b"
                  defaultValue="Both"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.preferB2b === "Both" }
                      : {
                          defaultChecked: candDetails?.preferB2b === "Both",
                        }
                    : { checked: formFields?.preferB2b === "Both" })}
                />
                <label className="candidate-radio-text">Both</label>
              </li>
              <li className="flex mr-4 items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="preferB2b"
                  defaultValue="B2B"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.preferB2b === "B2B" }
                      : {
                          defaultChecked: candDetails?.preferB2b === "B2B",
                        }
                    : { checked: formFields?.preferB2b === "B2B" })}
                />
                <label className="candidate-radio-text">B2B</label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="preferB2b"
                  defaultValue="B2C"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.preferB2b === "B2C" }
                      : {
                          defaultChecked: candDetails?.preferB2b === "B2C",
                        }
                    : { checked: formFields?.preferB2b === "B2C" })}
                />
                <label className="candidate-radio-text">B2C</label>
              </li>
            </ul>
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              Do you prefer a physical location or home-based business model?
            </p>
            <ul className="flex mt-3 items-center">
              <li className="flex mr-4 items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="physicalLocation"
                  defaultValue="Both"
                  {...(candNames
                    ? candNames.length > 0
                      ? {
                          checked: selectedDetails?.physicalLocation === "Both",
                        }
                      : {
                          defaultChecked:
                            candDetails?.physicalLocation === "Both",
                        }
                    : { checked: formFields?.physicalLocation === "Both" })}
                />
                <label className="candidate-radio-text" htmlFor="Both">
                  Both
                </label>
              </li>
              <li className="flex items-center mr-4">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="physicalLocation"
                  defaultValue="Home-based"
                  {...(candNames
                    ? candNames.length > 0
                      ? {
                          checked:
                            selectedDetails?.physicalLocation === "Home-based",
                        }
                      : {
                          defaultChecked:
                            candDetails?.physicalLocation === "Home-based",
                        }
                    : {
                        checked: formFields?.physicalLocation === "Home-based",
                      })}
                />
                <label className="candidate-radio-text" htmlFor="Home-based">
                  Homebased
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="physicalLocation"
                  defaultValue="Physical"
                  {...(candNames
                    ? candNames.length > 0
                      ? {
                          checked:
                            selectedDetails?.physicalLocation === "Physical",
                        }
                      : {
                          defaultChecked:
                            candDetails?.physicalLocation === "Physical",
                        }
                    : { checked: formFields?.physicalLocation === "Physical" })}
                />
                <label className="candidate-radio-text" htmlFor="Physical">
                  Physical
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              Would you prefer to have an inventory or service-based business
              model?
            </p>
            <ul className="flex mt-3 items-center">
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="inventory"
                  defaultValue="Both"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.inventory === "Both" }
                      : {
                          defaultChecked: candDetails?.inventory === "Both",
                        }
                    : { checked: formFields?.inventory === "Both" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor=" Would you prefer to have an inventory or service-based business
          models_Both"
                >
                  Both
                </label>
              </li>
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="inventory"
                  defaultValue="inventory"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.inventory === "inventory" }
                      : {
                          defaultChecked:
                            candDetails?.inventory === "inventory",
                        }
                    : { checked: formFields?.inventory === "inventory" })}
                />
                <label className="candidate-radio-text" htmlFor="type1">
                  inventory
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="inventory"
                  defaultValue="Service"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.inventory === "Service" }
                      : {
                          defaultChecked: candDetails?.inventory === "Service",
                        }
                    : { checked: formFields?.inventory === "Service" })}
                />
                <label className="candidate-radio-text" htmlFor="type2">
                  Service
                </label>
              </li>
            </ul>
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              Are you comfortable with a business that requires cold calling?
            </p>
            <ul className="flex mt-3 items-center">
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="coldCalling"
                  defaultValue="Both"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.coldCalling === "Both" }
                      : {
                          defaultChecked: candDetails?.coldCalling === "Both",
                        }
                    : { checked: formFields?.coldCalling === "Both" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you comfortable with a business that requires cold calling?_Both"
                >
                  Both
                </label>
              </li>
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="coldCalling"
                  defaultValue="Yes"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.coldCalling === "Yes" }
                      : {
                          defaultChecked: candDetails?.coldCalling === "Yes",
                        }
                    : { checked: formFields?.coldCalling === "Yes" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you comfortable with a business that requires cold calling?
            
            _Yes"
                >
                  Yes
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="coldCalling"
                  defaultValue="No"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.coldCalling === "No" }
                      : {
                          defaultChecked: candDetails?.coldCalling === "No",
                        }
                    : { checked: formFields?.coldCalling === "No" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you comfortable with a business that requires cold calling?
            
            _no"
                >
                  No
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div className="candidate-two-col">
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              Are you going to be in this business as an owner/operator or do
              you prefer a passive model, semi-passive model? (Passive Ownership
              means the owner is working 15 hours or less per week in the
              business.)
            </p>
            <ul className="flex mt-3 items-center">
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="passiveMode"
                  defaultValue="Owner/Operator"
                  {...(candNames
                    ? candNames.length > 0
                      ? {
                          checked:
                            selectedDetails?.passiveMode === "Owner/Operator",
                        }
                      : {
                          defaultChecked:
                            candDetails?.passiveMode === "Owner/Operator",
                        }
                    : {
                        checked: formFields?.passiveMode === "Owner/Operator",
                      })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you going to be in this business as an operator or do you prefer a passive model, semi-passive model? (Passive Ownership means the owner is working 15 hours or less per week in the business.)Owner/Operator"
                >
                  Operator
                </label>
              </li>
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="passiveMode"
                  defaultValue="Passive"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.passiveMode === "Passive" }
                      : {
                          defaultChecked:
                            candDetails?.passiveMode === "Passive",
                        }
                    : { checked: formFields?.passiveMode === "Passive" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you going to be in this business as an owner/operator or do you prefer a passive model, semi-passive model? (Passive Ownership means the owner is working 15 hours or less per week in the business.)
            
            _Passive"
                >
                  Passive
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="passiveMode"
                  defaultValue="Semi"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.passiveMode === "Semi" }
                      : {
                          defaultChecked: candDetails?.passiveMode === "Semi",
                        }
                    : { checked: formFields?.passiveMode === "Semi" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Are you going to be in this business as an owner/operator or do you prefer a passive model, semi-passive model? (Passive Ownership means the owner is working 15 hours or less per week in the business.)
            
            _Semi"
                >
                  Semi
                </label>
              </li>
            </ul>
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">
              Is working standard business hours (9am-5pm) important to you?
            </p>
            <ul className="flex mt-3 items-center">
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="businessHours"
                  defaultValue="Both"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.businessHours === "Both" }
                      : {
                          defaultChecked: candDetails?.businessHours === "Both",
                        }
                    : { checked: formFields?.businessHours === "Both" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Is working standard business hours (9am-5pm) important to you?_Both"
                >
                  Both
                </label>
              </li>
              <li className="mr-4 flex">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="businessHours"
                  defaultValue="Yes"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.businessHours === "Yes" }
                      : {
                          defaultChecked: candDetails?.businessHours === "Yes",
                        }
                    : { checked: formFields?.businessHours === "Yes" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Is working standard business hours (9am-5pm) important to you?
            
            _Yes"
                >
                  Yes
                </label>
              </li>
              <li className="flex items-center">
                <input
                  onChange={handleInputChange}
                  type="radio"
                  className="mr-2"
                  name="businessHours"
                  defaultValue="No"
                  {...(candNames
                    ? candNames.length > 0
                      ? { checked: selectedDetails?.businessHours === "No" }
                      : {
                          defaultChecked: candDetails?.businessHours === "No",
                        }
                    : { checked: formFields?.businessHours === "No" })}
                />
                <label
                  className="candidate-radio-text"
                  htmlFor="Is working standard business hours (9am-5pm) important to you?
            
            _no"
                >
                  No
                </label>
              </li>
            </ul>
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
              onClick={handleWants}
              className="candidate-btn md:w-40 max-md:w-full flex items-center justify-between"
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

export default Wants;
