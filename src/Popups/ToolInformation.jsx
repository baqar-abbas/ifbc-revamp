import React from "react";
import { useState } from "react";
import DialogBox from "src/Popups/DialogBox";
import { twMerge } from "tailwind-merge";

const ToolInformation = ({ showInformation, setShowInformation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  // yahan pr handlechange nhi laaye tum
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === "checkbox" ? (checked ? true : false) : sanitizeInput(value);

    setData({
      ...data,
      [name]: inputValue,
    });
  };
  return (
    <DialogBox show={showInformation} setShow={setShowInformation}>
      <div className="bg-white p-10 flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="text-2xl text-center font-bold text-custom-heading-color">
            Candidate Info Sheet Fields
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            onClick={() => setShowInformation(false)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="grid  gap-12 max-md:flex-col md:grid-cols-2">
          <div>
            <select
              name="layout"
              className="candidate-input w-full"
              id="layout"
              onChange={handleChange}
            >
              <option value="Select Layout">Select Layout</option>
              <option value="One Column ">One Column </option>
              <option value="Two Column">Two Column</option>
            </select>

            <div className="w-full flex mt-16">
              <label className=" text-black font-bold">
                <input
                  name="Short Description"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      shortdescription: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Short Description
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Points of Interest
"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      pointsofinterest: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Points of Interest
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Investment Range"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      investmentrange: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Investment Range
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Year Established"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      yearestablished: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Year Established
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="First Year Franchised"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      firstyearfranchised: check,
                    }));
                    setChecked(!check);
                  }}
                />
                First Year Franchised
              </label>
            </div>
            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Franchise Units"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      franchiseunits: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Franchise Units
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Corporate Owned Units"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      corporateownedunits: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Corporate Owned Units
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Projected New Units (12 months)"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      projectednewunits: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Projected New Units (12 months)
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Franchise Fee"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      franchisefee: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Franchise Fee
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Cash Investment"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      cashinvestment: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Cash Investment
              </label>
            </div>
            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Average Investment"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      averageinvestment: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Average Investment
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Discount"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      discount: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Discount
              </label>
            </div>
          </div>

          <div>
            <div className="w-full ">
              <label className=" text-black font-bold">
                <input
                  name="Make This My Default"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      makethismydefault: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Make This My Default
              </label>
            </div>

            <div className="w-full flex mt-20">
              <label className=" text-black font-bold">
                <input
                  name="Royalty
"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      royalty: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Royalty
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Ad"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      ad: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Ad
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Average # of Employees"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      averageofemployees: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Average # of Employees
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Passive Ownership"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      passiveownership: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Passive Ownership
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Earning Claim"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      earningclaim: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Earning Claim
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Description
"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      description: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Description
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Concept History Description"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      concepthistorydescription: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Concept History Description
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Ideal Candidate"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      idealcandidate: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Ideal Candidate
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Training"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      training: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Training
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Availability"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      availability: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Availability
              </label>
            </div>

            <div className="w-full flex mt-2">
              <label className=" text-black font-bold">
                <input
                  name="Day in the Life"
                  type="checkbox"
                  className="to-custom-heading-color"
                  onClick={() => {
                    setFormFields((prev) => ({
                      ...prev,
                      dayinthelife: check,
                    }));
                    setChecked(!check);
                  }}
                />
                Day in the Life
              </label>
            </div>
          </div>
        </div>
        <div className="">
          <button className="border-2 border-custom-heading-color bg-custom-heading-color  text-white px-5 rounded hover:bg-white hover:text-custom-heading-color transition-all duration-500 py-2  font-semibold">
            {loading ? "Loading..." : "GENERATE PDF PACKET"}
          </button>
        </div>
      </div>
    </DialogBox>
  );
};

export default ToolInformation;
