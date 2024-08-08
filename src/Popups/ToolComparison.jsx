import React from "react";
import { useState } from "react";

import DialogBox from "src/Popups/DialogBox";

const ToolComparison = ({ showComparison, setShowComparison }) => {
  return (
    <DialogBox show={showComparison} setShow={setShowComparison}>
      <div className="bg-white p-10 flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="text-2xl text-center font-bold text-custom-heading-color">
            Create a Custom Comparison Report
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            onClick={() => setShowComparison(false)}
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
            To run your report please make sure that you have checkmarked all
            franchise selections you wish to run a report on. Franchises that
            are not selected may be used as a bookmark to their respective
            profile pages.
          </p>
        </div>
      </div>
    </DialogBox>
  );
};

export default ToolComparison;
