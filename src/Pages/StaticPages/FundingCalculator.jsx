import axios from "axios";
import React, { useEffect, useState } from "react";
import PageTransition from "src/Animations/PageTransition";
import DialogBox from "src/Popups/DialogBox";

import {
  formatCurrency,
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateUsername,
} from "src/Utils/SanitizeInput";
import { twMerge } from "tailwind-merge";

const FundingCalculator = () => {
  const [data, setData] = useState({
    downPayment: 0,
    houseHold: 0,
    debtPayments: 0,
    totalNet: 0,
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue =
      type === "checkbox" ? (checked ? 1 : 0) : sanitizeInput(value);

    // If the input is a number, parse it as an integer
    if (
      ["downPayment", "houseHold", "debtPayments", "totalNet"].includes(name)
    ) {
      inputValue = parseInt(inputValue, 10);
    }

    setData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  useEffect(() => {
    // Check if all keys except 'error' are not empty
    const allFieldsFilled = Object.keys(data).every((key) => data[key] !== "");

    // If all fields are filled, remove the 'error' key from formErrors
    if (allFieldsFilled) {
      setFormErrors((prevErrors) => {
        const { error, ...remainingErrors } = prevErrors;
        return remainingErrors;
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reqFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "realState",
      "percentage",
      "bankruptcies",
      "creditHistory",
      "debtPayments",
      "houseHold",
      "launching",
      "creditScore",
      "downPayment",
      "franchiseLocation",
      "totalNet",
    ];
    let allFieldsValid = true;
    let formErrors = {};

    reqFields.forEach((field) => {
      const newKey = field;
      const value = data[newKey];

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
        } else {
          formErrors[newKey] = "";
        }
      }
    });

    setFormErrors(formErrors);

    try {
      if (allFieldsValid) {
        const formData = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          message: data.message ?? "",
          franchiseLocation: data.franchiseLocation,
          creditScore: data.creditScore,
          launching: data.launching,
          creditHistory: data.creditHistory,
          bankruptcies: data.bankruptcies,
          percentage: data.percentage,
          realState: data.realState,
          downPayment: data.downPayment,
          houseHold: data.houseHold,
          debtPayments: data.debtPayments,
          totalNet: data.totalNet,
        };
        const url = "https://backend.ifbc.co/api/fundcalculator";
        // const url = "https://localhost:7047/api/fundcalculator";
        const response = await axios.post(url, formData);
        if (response.status === 201) {
          setLoading(false);

          setData({
            downPayment: 0,
            houseHold: 0,
            debtPayments: 0,
            totalNet: 0,
          });

          window.location.href = `/results/${response.data.docId}`;
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields",
        }));
        setLoading(false);
        window.scrollTo(0, 1000);

        // Handle invalid fields (e.g., show validation errors)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PageTransition>
      <div id="description" className="flex flex-col  gap-5 my-8 ">
        <div className="text-md my-5 text-center flex flex-col gap-3 md:mx-5 max-md:w-full md:w-[50%] mx-auto">
          <p className=" text-md ">
            By Rolling Your IRA, 401(K), 403(B), Keogh Or Other Retirement Funds
            Into A 401(K) Franchise Financing Vehicle
          </p>
          <p className=" text-md">
            You can buy A Franchise, Lower Overhead and Increase Your Success
            Rate. Instead of sending interest payments to a lender, you can use
            your money to purchase advertising, buy equipment, lease a company
            van, or use it in any way that will bring you quicker profits.
          </p>
          <p className="text-md">
            Eliminate Personal Liability. Use our own funds to avoid pledging
            your home or other assets as loan collateral and potentially
            jeopardizing your personal credit.
          </p>
          <p className="text-md">
            Maximize Tax-Deferred Benefits. By investing your retirement funds
            into your own franchise, you can reinvest your profits tax-deferred
            in your business or in your retirement account. Build your business
            while you grow your retirement nest egg! Enjoy Flexibility.
          </p>

          <p className="text-md">
            You can mix your retirement funds with personal funds or capital
            from other investors. It’s the ideal financing structure for
            husband-and-wife teams!
          </p>
          <p>
            Invest in Yourself. Unlike taking risks in the volatile stock
            market, financing your business with retirement funds is an
            investment in yourself & one that you can control and count on!
            Discover your retirement account’s true investing power (and the
            ability to finance your franchise with money you already have)
          </p>
        </div>

        <div className="flex flex-col text-center gap-4 ">
          <p className="font-bold text-center max-md:text-xl md:text-2xl">
            PRE-QUALIFY FOR FUNDING
          </p>
          <p className="font-bold text-center text-custom-dark-blue max-md:text-xl md:text-3xl">
            Determine How Much And What Sources Of Options <br></br> Are
            Available To You
          </p>
        </div>

        <div className="md:max-w-3xl md:mx-auto max-md:mx-5">
          {formErrors.error && (
            <p className="border border-[#dc2626] text-[#dc2626] p-4 flex justify-between">
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
          <form onSubmit={handleSubmit}>
            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.franchiseLocation ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  What type of franchise location are you most interested in?
                  {!data.franchiseLocation && (
                    <span className="text-[#dc2626] italic">(Required)</span>
                  )}
                </p>
              </div>

              <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    defaultValue="Homebased"
                    name="franchiseLocation"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.franchiseLocation === "Homebased" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Homebased
                  </span>
                </label>

                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    defaultValue="Food and Beverage"
                    class="peer hidden"
                    name="franchiseLocation"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.franchiseLocation === "Food and Beverage" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Food and Beverage
                  </span>
                </label>
              </div>
              <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="franchiseLocation"
                    defaultValue="Non Food Storefront"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.franchiseLocation === "Non Food Storefront" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Non Food Storefront
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="franchiseLocation"
                    defaultValue="Mobile Services"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.franchiseLocation === "Mobile Services" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Mobile Services
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <p
                className={`funding-questions ${formErrors.downPayment ? "border border-[#dc2626] p-2 w-full" : ""}`}
              >
                How much cash do you have available for a downpayment and
                working capital (include retirement accounts)?{" "}
                {data.downPayment === 0 && (
                  <span className="text-[#dc2626] italic">(Required)</span>
                )}
              </p>

              <div>
                <label
                  htmlFor="steps-range"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  DownPayment & Working Capital
                </label>
                <input
                  onChange={handleChange}
                  id="steps-range"
                  type="range"
                  name="downPayment"
                  min={0}
                  max={5000000}
                  defaultValue={0}
                  step={500}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />

                <p className="mt-2 text-2xl text-black font-bold">
                  Amount: {formatCurrency(data.downPayment)}
                </p>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.creditScore ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  What is your most recent credit score?
                  {!data.creditScore && (
                    <span className="text-[#dc2626] italic">(Required)</span>
                  )}
                </p>
              </div>

              <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditScore"
                    defaultValue="below 680"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditScore === "below 680" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Below 679
                  </span>
                </label>

                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditScore"
                    defaultValue="680 - 715"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditScore === "680 - 715" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    680 - 739
                  </span>
                </label>
              </div>
              <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditScore"
                    defaultValue="716 - 750"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditScore === "716 - 750" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    740 - 779
                  </span>
                </label>

                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditScore"
                    defaultValue="Above 750"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditScore === "Above 750" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    780 - 850
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.launching ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  Do you have a working spouse or partner who can cover living
                  expenses while the business is launching?{" "}
                  {!data.launching && (
                    <span className="text-[#dc2626] italic">(Required)</span>
                  )}
                </p>
              </div>

              <div class="flex md:space-x-2 rounded-xl select-none">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="launching"
                    defaultValue="Yes"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.launching === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Yes
                  </span>
                </label>

                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="launching"
                    defaultValue="No"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.launching === "No" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    No
                  </span>
                </label>
              </div>
              <div class="flex md:space-x-2 rounded-xl select-none">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="launching"
                    defaultValue="I have other means to cover living expenses during the launch"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.launching === "I have other means to cover living expenses during the launch" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    I have other means to cover living expenses during the
                    launch
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <p
                className={`funding-questions ${formErrors.houseHold ? "border border-[#dc2626] p-2 w-full" : ""}`}
              >
                What is your annual household income?
                {data.houseHold === 0 && (
                  <span className="text-[#dc2626] italic">(Required)</span>
                )}
              </p>
              <div>
                <label
                  htmlFor="household"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Annual HouseHold Income
                </label>
                <input
                  onChange={handleChange}
                  type="range"
                  name="houseHold"
                  min={0}
                  max={5000000}
                  defaultValue={0}
                  step={500}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />

                <p className="mt-2 text-2xl text-black font-bold">
                  Amount: {formatCurrency(data.houseHold)}
                </p>
              </div>
            </div>
            <div className="my-10">
              <p
                className={`funding-questions ${formErrors.debtPayments ? "border border-[#dc2626] p-2 w-full" : ""}`}
              >
                What are your monthly personal debt payments?{" "}
                {data.debtPayments === 0 && (
                  <span className="text-[#dc2626] italic">(Required)</span>
                )}
              </p>

              <div>
                <label
                  htmlFor="personal"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Monthly Personal Debt Payments
                </label>
                <input
                  onChange={handleChange}
                  id="personal"
                  type="range"
                  name="debtPayments"
                  min={0}
                  max={5000000}
                  defaultValue={0}
                  step={500}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />

                <p className="mt-2 text-2xl text-black font-bold">
                  Amount: {formatCurrency(data.debtPayments)}
                </p>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.creditHistory ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  Do you have a minimum 5-year credit history?
                  {!data.creditHistory && (
                    <span className="text-[#dc2626] italic">(Required)</span>
                  )}
                </p>
              </div>

              <div class="flex md:space-x-2 rounded-xl select-none">
                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditHistory"
                    defaultValue="Yes"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditHistory === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Yes
                  </span>
                </label>

                <label class="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="creditHistory"
                    defaultValue="No"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.creditHistory === "No" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    No
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.bankruptcies ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  Bankruptcies within the last 7 years{" "}
                  {!data.bankruptcies && (
                    <span className="text-[#dc2626] italic">(Required)</span>
                  )}
                </p>
              </div>

              <div className="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bankruptcies"
                    defaultValue="Never"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.bankruptcies === "Never" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Never
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bankruptcies"
                    defaultValue="0-7 years ago"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.bankruptcies === "0-7 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    0-7 years ago
                  </span>
                </label>
              </div>
              <div class="flex md:space-x-2 rounded-xl select-none max-md:flex-col md:flex-row">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bankruptcies"
                    defaultValue="8-10 years ago"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.bankruptcies === "8-10 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    8-10 years ago
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="bankruptcies"
                    defaultValue="More than 10 years ago"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.bankruptcies === "More than 10 years ago" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    More than 10 years ago
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.percentage ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  On your credit cards, what percentage of the credit limit are
                  you using (your statement balances divided by your credit
                  limits)?{" "}
                  {formErrors.percentage ||
                    (!data.percentage && (
                      <span className="text-[#dc2626] italic">(Required)</span>
                    ))}
                </p>
              </div>

              <div className="flex md:space-x-2 rounded-xl select-none">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="percentage"
                    defaultValue="0-35%"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.percentage === "0-35%" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    0-35%
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="percentage"
                    defaultValue="36-50%"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.percentage === "36-50%" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    36-50%
                  </span>
                </label>
              </div>
              <div className="flex md:space-x-2 rounded-xl select-none">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="percentage"
                    defaultValue="51% or higher"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.percentage === "51% or higher" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    51% or higher
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <div className="flex gap-2 items-center">
                <p
                  className={`funding-questions ${formErrors.realState ? "border border-[#dc2626] p-2 w-full" : ""}`}
                >
                  Do you own real estate?
                  {formErrors.realState ||
                    (!data.realState && (
                      <span className="text-[#dc2626] italic">(Required)</span>
                    ))}
                </p>
              </div>

              <div className="flex md:space-x-2 rounded-xl select-none">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="realState"
                    defaultValue="Yes"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.realState === "Yes" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    Yes
                  </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer w-full">
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="realState"
                    defaultValue="No"
                    class="peer hidden"
                  />
                  <span
                    className={twMerge(
                      `candidate-funding-btn w-full ${data.realState === "No" ? "bg-custom-dark-blue text-white" : ""}`
                    )}
                  >
                    No
                  </span>
                </label>
              </div>
            </div>

            <div className="my-10">
              <p
                className={`funding-questions ${formErrors.totalNet ? "border border-[#dc2626] p-2 w-full" : ""}`}
              >
                What is your total net worth?{" "}
                {data.totalNet === 0 && (
                  <span className="text-[#dc2626] italic">(Required)</span>
                )}
              </p>

              <div>
                <label
                  htmlFor="totalnet"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Total Net Worth
                </label>
                <input
                  onChange={handleChange}
                  id="totalnet"
                  type="range"
                  name="totalNet"
                  min={0}
                  max={5000000}
                  defaultValue={0}
                  step={500}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />

                <p className="mt-2 text-2xl text-black font-bold">
                  Amount: {formatCurrency(data.totalNet)}
                </p>
              </div>
            </div>

            <div className="w-full mx-auto gap-2 flex justify-center items-center flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.07),0px_0px_0px_1px_rgba(25,28,33,0.1)] p-5 rounded-3xl bg-[#2176ff]/30">
              <div className="flex md:gap-4 max-md:flex-col md:flex-row w-full justify-center">
                <div className="candidate-sub-childs">
                  <p className="funding-questions">First Name</p>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="firstName"
                    className="funding-input "
                    style={{
                      borderColor: formErrors.firstName ? "#dc2626" : undefined,
                    }}
                  />
                  {formErrors.firstName &&
                    formErrors.firstName === "invalid" && (
                      <p className=" text-[#dc2626] py-2 flex justify-between">
                        Invalid username. It should be 3-16 characters long and
                        can include letters, numbers, underscores, and spaces.
                      </p>
                    )}
                </div>
                <div className="candidate-sub-childs">
                  <p className="funding-questions">Last Name</p>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    className="funding-input"
                    style={{
                      borderColor: formErrors.lastName ? "#dc2626" : undefined,
                    }}
                  />{" "}
                  {formErrors.lastName && formErrors.lastName === "invalid" && (
                    <p className=" text-[#dc2626] py-2 flex justify-between">
                      Invalid username. It should be 3-16 characters long and
                      can include letters, numbers, underscores, and spaces.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex md:gap-4 max-md:flex-col md:flex-row w-full  justify-center">
                <div className="candidate-sub-childs">
                  <p className="funding-questions">Email </p>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="funding-input"
                    style={{
                      borderColor: formErrors.email ? "#dc2626" : undefined,
                    }}
                  />
                  {formErrors.email && formErrors.email === "invalid" && (
                    <p className=" text-[#dc2626] py-2 flex justify-between">
                      Invalid Email (john@example.com)
                    </p>
                  )}
                </div>
                <div className="candidate-sub-childs">
                  <p className="funding-questions">Phone </p>
                  <input
                    onChange={handleChange}
                    type="tel"
                    name="phone"
                    className="funding-input"
                    style={{
                      borderColor: formErrors.phone ? "#dc2626" : undefined,
                    }}
                  />{" "}
                  {formErrors.phone && formErrors.phone === "invalid" && (
                    <p className=" text-[#dc2626] py-2 flex justify-between">
                      Invalid Phone Number (Please use numbers only)
                    </p>
                  )}
                </div>
              </div>
              <div className=" flex md:gap-2 flex-col  w-full justify-center mx-auto max-w-[80%]">
                <label htmlFor="message" className="funding-questions">
                  Message
                </label>
                <textarea
                  onChange={handleChange}
                  name="message"
                  id="message"
                  rows={10}
                  className="funding-input"
                />
                {formErrors.firstName && formErrors.firstName === "invalid" && (
                  <p className=" text-[#dc2626] py-2 flex justify-between">
                    Invalid username. It should be 3-16 characters long and can
                    include letters, numbers, underscores, and spaces.
                  </p>
                )}
              </div>
              <p className="text-sm text-custom-heading-color text-left  p-5 rounded-3xl max-w-[80%]">
                By submitting the form, you agree to receive calls, text
                messages, or emails from <a href="https://ifbc.co">ifbc.co</a>{" "}
                at the contact information provided. Message rates may apply.{" "}
                <br />
                Text STOP to cancel text messaging at any time. <br />
                See{" "}
                <a href="/terms-conditions" className="  underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="  underline">
                  Privacy Policy
                </a>{" "}
                for additional details.
              </p>
              <div className="flex justify-center">
                <button className="border-2 border-custom-heading-color bg-custom-heading-color  text-white px-5 rounded-3xl hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2  font-semibold">
                  {loading ? "Loading..." : "Calculate My Results"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default FundingCalculator;
