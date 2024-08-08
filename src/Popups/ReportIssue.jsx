import React from "react";
import DialogBox from "./DialogBox";

const ReportIssue = ({ showReport, setShowReport }) => {
  // props kahan se arhe kahi se nh abhi to dirext
  //bhai hamesha popup banao to yaad rakho ke popup ka route nhi banta popup kisi page may dalta hamesha
  return (
    <DialogBox show={showReport} setShow={setShowReport}>
      <div className="bg-white p-10 flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="text-2xl text-center font-bold text-custom-heading-color">
            Report a Listing Issue
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            onClick={() => setShowReport(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="">
          <div className="flex">
            <p className="text-black font-bold">Email </p>{" "}
            <p className="text-red-500">*</p>
          </div>
          <p>This will appear as an open support ticket in your name.</p>

          <input
            //   onChange={handleInputChange}
            type="email"
            name="email"
            className="candidate-input"
            required
          />
        </div>

        <div className="">
          <div className="flex">
            <p className="text-black font-bold">
              Listing Name with Reported Issue
            </p>
            <p className="text-red-500">*</p>
          </div>

          <input
            //   onChange={handleInputChange}
            type="text"
            name="listingName"
            className="candidate-input"
            required
          />
        </div>

        <div className="">
          <div className="flex">
            <p className="text-black font-bold">
              What is the issue with this listing?
            </p>
            <p className="text-red-500">*</p>
          </div>

          <p>Name this request.</p>
          <input
            //   onChange={handleInputChange}
            type="text"
            name="issueListing"
            className="candidate-input"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="text-black font-bold">
            Are there any other details, specifics, or contact information you
            can provide to help us assist?
          </label>
          <p>Please describe the issue in as much detail as possible.</p>
          <textarea
            // onChange={handleChange}
            name="issue"
            id="issue"
            rows={5}
            className="candidate-input"
          />
        </div>

        <div className="">
          <button className="border-2 border-custom-heading-color bg-custom-heading-color  text-white px-5 rounded hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2 max-md:w-full font-semibold">
            Submit
          </button>
        </div>
      </div>
    </DialogBox>
  );
};

export default ReportIssue;
