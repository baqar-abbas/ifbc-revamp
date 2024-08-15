import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import HorizontalNonLinearStepper from "../Stepper";
const FranchiseCategories = ({
  handleInputChange,
  setStep,
  formFields,
  candDetails,
  candNames,
  loading,
  setFormFields,
  docid,
  visitedSteps,
  setVisitedSteps,
  step,
}) => {
  const fetchCandidates = async () => {
    const url = `https://backend.ifbc.co/api/franchisecategories/${docid}`;
    const response = await axios.get(url);
    return response.data;
  };

  // Use the query with enabled option based on docid
  const { data, isLoading, error } = useQuery(
    ["franchisecategories", docid], // Query key including docid
    fetchCandidates, // Query function
    {
      enabled: !!docid, // Only enable if docid and name are available
    }
  );

  // Optionally handle effects based on data, loading, and error
  useEffect(() => {
    if (data && !visitedSteps.fc) {
      // Handle the data
      setFormFields((prev) => ({ ...prev, ...data }));
    }
  }, [data]);

  const selectData = [
    { name: "advertising", label: "Advertising" },
    { name: "automotive", label: "Automotive" },
    { name: "beautySpa", label: "Beauty & Spa" },
    {
      name: "businessManagementCoaching",
      label: "business Management & Coaching",
    },
    { name: "businessServices", label: "Business Services" },
    {
      name: "childEducationStemTutoring",
      label: "Child Education, STEM & Tutoring",
    },
    { name: "childServicesProducts", label: "Child Services & Products" },
    {
      name: "cleaningResidentialCommercial",
      label: "Cleaning: Residential & Commercial",
    },
    { name: "computerTechnology", label: "Computer Technology" },
    {
      name: "distributionServices",
      label: "Select a rating Distribution Services",
    },
    { name: "dryCleaningLaundry", label: "Dry Cleaning-Laundry" },
    { name: "financialServices", label: "Financial Services" },
    { name: "fitness", label: "Fitness" },
    {
      name: "foodBeverageRestaurantQSR",
      label: "Food & Beverage: Restaurant/QSR/Catering",
    },
    {
      name: "foodCoffeeTeaSmoothiesSweets",
      label: "Food: Coffee/Tea/Smoothies/Sweets",
    },
    { name: "foodStoresCatering", label: "Food: Stores & Catering" },
    { name: "healthMedical", label: "Health/Medical" },
    { name: "healthWellness", label: "Health/Wellness" },
    { name: "homeImprovement", label: "Home Improvement" },
    { name: "interiorExteriorDesign", label: "Interior/Exterior Design" },
    { name: "maintenanceRepair", label: "Maintenance & Repair" },
    {
      name: "movingStorageJunkRemoval",
      label: "Moving, Storage & Junk Removal",
    },
    { name: "painting", label: "Painting" },
    { name: "pestControl", label: "Pest Control" },
    { name: "petCareGrooming", label: "Pet Care & Grooming" },
    { name: "printCopyMailing", label: "Print, Copy & Mailing" },
    { name: "realState", label: "Real Estate" },
    { name: "restoration", label: "Restoration" },
    { name: "retail", label: "Retail" },
    { name: "security", label: "Security" },
    {
      name: "seniorCareMedicalNonMedical",
      label: "Senior Care: Medical/Non-Medical",
    },
    { name: "signs", label: "Signs" },
    { name: "specialEventPlanning", label: "Special Event Planning" },
    { name: "sportsRecreation", label: "Sports & Recreation" },
    { name: "staffing", label: "Staffing" },
    { name: "travelPlanning", label: "Travel Planning" },
    { name: "vending", label: "Vending" },
  ];

  const handleFranchiseCategories = (e) => {
    e.preventDefault();
    setVisitedSteps((prev) => ({ ...prev, fc: true }));
    setStep((prevStep) => prevStep + 1);
    window.scrollTo(0, 5);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === "Backspace") {
        handlePreviousClick();
      } else if (event.key === "Enter") {
        handleFranchiseCategories(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePreviousClick = () => {
    setVisitedSteps((prev) => ({ ...prev, fc: true }));
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
          Franchise Categories
        </h1>

        <div id="container2" className="py-4 mb-2">
          <p className="text-sm text-black font-semibold">
            Rank the Franchise Categories in order of preference, with 1 being
            the least favorite and 10 being the most favorite (so that we can
            search according to your requirements).
          </p>
        </div>

        <div
          id="container3"
          className="grid md:grid-cols-2 max-md:grid-cols-1 md:gap-x-10"
        >
          {selectData.map((item, index) => (
            <div
              key={index}
              className="w-full mr-4 flex flex-col justify-between my-3"
            >
              <div className="mt-2">
                <label className="flex gap-x-1 items-center mr-6 text-sm">
                  <span className="text-black">{item.label}</span>
                </label>
              </div>
              <Select
                name={item.name}
                handleInputChange={handleInputChange}
                candNames={candNames}
                formFields={formFields}
                candDetails={candDetails}
                className="candidate-select w-full"
              />
            </div>
          ))}
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
            className="flex md:justify-end mt-5 max-md:flex-col max-md:gap-5 md:mr-3"
          >
            <button
              className="candidate-btn  md:w-40 max-md:w-full  flex items-center justify-between"
              onClick={handleFranchiseCategories}
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
      </div>
    </motion.div>
  );
};

const Select = ({ name, handleInputChange, candNames, formFields }) => {
  const franchiseRating = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  return (
    <div className="mt-2">
      <div className="mr-4 w-full">
        <select
          onChange={handleInputChange}
          id={name}
          name={name}
          className="candidate-select w-full"
        >
          <option selected>Select a rating</option>
          {franchiseRating.map((option, index) => {
            return (
              <option
                key={index}
                value={option}
                {...(candNames
                  ? candNames.length > 0
                    ? {
                        selected:
                          selectedDetails &&
                          selectedDetails[name] &&
                          selectedDetails[name] === option,
                      }
                    : {
                        selected:
                          candDetails &&
                          candDetails[name] &&
                          candDetails[name] === option,
                      }
                  : {
                      selected:
                        formFields &&
                        formFields[name] &&
                        formFields[name] === option,
                    })}
              >
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FranchiseCategories;
