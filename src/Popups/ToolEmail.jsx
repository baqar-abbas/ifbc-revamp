import React from "react";
import { useState } from "react";
import DialogBox from "src/Popups/DialogBox";
import { twMerge } from "tailwind-merge";

const ToolEmail = ({ showEmail, setShowEmail }) => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === "checkbox" ? (checked ? true : false) : sanitizeInput(value);

    // jab bhi koi method lao uske andar ki states dekha kro wo banana parti
    setData({
      ...data,
      [name]: inputValue,
    });
  };
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  return (
    <DialogBox show={showEmail} setShow={setShowEmail}>
      <div className="bg-white p-10 flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="text-2xl text-center font-bold text-custom-heading-color">
            Email Concepts
          </p>
          {/* is button pr close hona chaye */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            onClick={() => setShowEmail(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="bg-blue-100 p-10 rounded-lg">
          <p className="text-custom-dark-blue">
            No Franchises Selected for the report. To send an email please make
            sure that you have checkmarked all franchise selections you wish to
            send a email to.
          </p>
        </div>

        <div className="">
          <p className="text-black font-bold">Subject*</p>
          <input
            onChange={handleChange}
            type="text"
            name="subject"
            className={twMerge(
              `candidate-input`,
              formErrors.subject === "error" ? "bg-red-300" : ""
            )}
          />
        </div>

        <div>
          <label htmlFor="message" className="text-black font-bold">
            Message*
          </label>
          <textarea
            onChange={handleChange}
            name="message"
            id="message"
            rows={10}
            className="candidate-input"
          />
        </div>

        <div className="">
          <button className="border-2 border-custom-heading-color bg-custom-heading-color  text-white px-5 rounded hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2  font-semibold">
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
        <p className="text-custom-dark-blue font-bold text-sm">
          List of concepts to sent territory check to:
        </p>
      </div>
    </DialogBox>
  );
};

export default ToolEmail;
