import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "src/Context/ListingDataContext";
import DialogBox from "./DialogBox";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import axios from "axios";
import Form from "src/Pages/CandidatePages/CandidateForm/Form";

import { validateUsername, validateZipcode } from "src/Utils/SanitizeInput";
import data from "../../public/files/data.json"; // Adjust the path if necessary

const RegisterationPopup = ({ setShow, show, registrationType }) => {
  const { cands, userDetails, loading } = useContext(MyCandContext);
  const { activeListings } = useContext(MyContext);
  const [selectedDocId, setSelectedDocId] = useState();
  const [selectedDetails, setSelectedDetails] = useState({
    DocId: "",
    firstName: "",
    lastName: "",
    territoryCity: "",
    territoryState: "",
    territoryZipcode: "",
    territoryNotes: "",
    IncludeNameInTerritoryRequest: false,
  });
  const [newDataNames, setNewDataNames] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [showsuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!loading && cands && cands.length > 0) {
      const filtered = cands.map((cand) => ({
        name: cand.firstName + " " + cand.lastName,
        docId: cand.docId,
      }));
      setNewDataNames(filtered);
    }
  }, [cands, loading]);

  useEffect(() => {
    if (selectedDocId && selectedDocId !== "") {
      const filtered = cands.filter((cand) => cand.docId == selectedDocId);
      if (filtered) {
        const selectedCand = filtered[0];
        setSelectedDetails({
          DocId: selectedDocId,
          firstName: selectedCand.firstName,
          lastName: selectedCand.lastName,
          territoryCity: selectedCand.territoryCity,
          territoryState: selectedCand.territoryState,
          territoryZipcode: selectedCand.territoryZipcode,
          territoryNotes: selectedCand.territoryNotes,
          IncludeNameInTerritoryRequest: false,
        });
      } else {
        setSelectedDetails({
          DocId: "",
          firstName: "",
          lastName: "",
          territoryCity: "",
          territoryState: "",
          territoryZipcode: "",
          territoryNotes: "",
          IncludeNameInTerritoryRequest: false,
        });
      }
    }
  }, [selectedDocId, cands]);

  return (
    <>
      {/* SUCCESS DIALOG BOX */}
      <DialogBox show={showsuccess} setShow={setShowSuccess}>
        <div className="p-10 text-2xl text-custom-heading-color text-center">
          {successMsg}
        </div>
      </DialogBox>
      {/* TCHECK DIALOG BOX */}
      <DialogBox setShow={setShow} show={show}>
        <button
          className="absolute top-5 right-10"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>

        <div
          id="registration-popup"
          className="bg-white overflow-y-scroll h-[500px] rounded-lg shadow-md p-10"
        >
          {activeListings && activeListings.length > 0 ? (
            <>
              <h2 className="text-custom-heading-color font-bold md:text-5xl uppercase text-center max-md:text-3xl">
                {registrationType === "TC"
                  ? "Territory Check"
                  : "Formal Registration"}
              </h2>
              {registrationType === "TC" ? (
                <FormTC
                  selectedDetails={selectedDetails}
                  setSelectedDocId={setSelectedDocId}
                  candNames={newDataNames}
                  selectedDocId={selectedDocId}
                  userDetails={userDetails}
                  activeListings={activeListings}
                  setSelectedDetails={setSelectedDetails}
                  setShowSuccess={setShowSuccess}
                  setSuccessMsg={setSuccessMsg}
                />
              ) : (
                <Form
                  candNames={newDataNames}
                  candDetails={cands}
                  activeListings={activeListings}
                />
              )}
            </>
          ) : (
            <h1 className="md:text-3xl max-md:text-2xl text-center font-semibold text-custom-heading-color h-full flex items-center">
              No Franchises Selected for the report. To send a territory check
              please make sure that you have checkmarked all franchise
              selections you wish to send a territory check to.
            </h1>
          )}
        </div>
      </DialogBox>
    </>
  );
};

const FormTC = ({
  selectedDocId,
  setSelectedDocId,
  candNames,
  selectedDetails,
  userDetails,
  setSelectedDetails,
  activeListings,
  setShowSuccess,
  setSuccessMsg,
}) => {
  const [addContacts, setAddContacts] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
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
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setSelectedDetails((prev) => {
      return {
        ...prev,
        territoryState: stateCode,
      };
    });
    const cityList = getCitiesOfState(stateCode);
    setCities(cityList);
  };

  useEffect(() => {
    if (selectedDetails && selectedDetails.territoryState) {
      setSelectedState(selectedDetails.territoryState);
      const cityList = getCitiesOfState(selectedDetails.territoryState);
      setCities(cityList);
    }
  }, [selectedDetails?.territoryState]);

  const addContactDiv = (index) => {
    return (
      <div
        key={index}
        id={`additional-contact-row-${index}`}
        className="p-5 border-2 border-custom-heading-color shadow-lg"
      >
        <h1 className="candidate-sub-heading">Additional Territory</h1>
        <div
          id="first-sub-row"
          className="flex flex-col gap-[15px] sm:flex-row sm:gap-[35px] justify-between"
        >
          <div className="candidate-sub-childs">
            <p className="candidate-label">City</p>
            <input
              onChange={handleInputChange}
              type="text"
              name={`additionalcity${index}`}
              className="candidate-input"
              required
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Last Name</p>
            <input
              onChange={handleInputChange}
              type="text"
              name={`additionallastname${index}`}
              className="candidate-input"
              required
            />
          </div>
        </div>
        <div
          id="second-sub-row"
          className="flex flex-col gap-[15px] sm:flex-row sm:gap-[35px] justify-between"
        >
          <div className="candidate-sub-childs">
            <p className="candidate-label">Zip</p>
            <input
              onChange={handleInputChange}
              type="text"
              name={`additionalzip${index}`}
              className="candidate-input"
              required
            />
          </div>
          <div className="candidate-sub-childs">
            <p className="candidate-label">Email</p>
            <input
              onChange={handleInputChange}
              type="text"
              name={`additionalemail${index}`}
              className="candidate-input"
              required
            />
          </div>
        </div>
        <div id="button-container" className="w-full flex justify-center">
          <button
            className="candidate-btn"
            onClick={() => setAddContacts((prevContacts) => prevContacts - 1)}
          >
            REMOVE CONTACT
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const reqFields = [
      "firstName",
      "lastName",
      "territoryState",
      "territoryZipcode",
      "territoryCity",
    ];
    let allFieldsValid = true;
    let formErrors = {};

    reqFields.forEach((field) => {
      const newKey = field;
      const value = selectedDetails[newKey];

      if (!value) {
        formErrors[newKey] = "This field is required";
        allFieldsValid = false;
      } else {
        if (newKey === "territoryZipcode" && !validateZipcode(value)) {
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
      if (allFieldsValid && activeListings && activeListings.length > 0) {
        activeListings.map(async (id) => {
          const formData = {
            candidateId: selectedDocId ?? 0,
            AgentId: userDetails.docId ?? 0,
            listingsIds: id.toString() ?? "",
            InterRequest:
              selectedDetails.IncludeNameInTerritoryRequest ?? false,
            docType: "TC",
            Status: "Pending",
            Message: "",
            email: "",
            isArchive: false,
            isTrash: false,
            isFav: false,
            isRead: false,
            territoryState: selectedDetails?.territoryState,
            territoryCity: selectedDetails?.territoryCity,
            territoryZipcode: selectedDetails?.territoryZipcode,
          };

          const baseUrl = "https://backend.ifbc.co/api/registrations";

          // Send the POST request using Axios
          const response = await axios.post(baseUrl, formData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 201) {
            setFormErrors({});
            setSuccessMsg("Territory Check Send Successfully.");
            setShowSuccess(true);
            setLoading(false);
            setTimeout(() => {
              window.location.href = "/messages/territory-check";
            }, 3000);
          }
        });
      } else {
        setFormErrors((prev) => ({
          ...prev,
          error: "Please fill in all the required fields",
        }));
        setLoading(false);
        window.scrollTo(0, 500);

        // Handle invalid fields (e.g., show validation errors)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setSelectedDetails((prevFields) => ({
      ...prevFields,
      [name]: inputValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <form action="">
      {formErrors.error && (
        <p className="border-2 border-red-600 text-red-600 p-4 flex justify-between">
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

      <div id="fr-tcheck-popup" className="mt-10">
        <h2 className="candidate-sub-heading">Candidate Name*</h2>

        <div className="flex justify-between w-full max-md:flex-col gap-5">
          <div className="flex flex-col w-full">
            <p className="candidate-paragraph">First Name</p>

            <select
              id="firstname"
              name="firstName"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.firstName ? "red" : undefined,
              }}
              onChange={(e) => setSelectedDocId(e.target.value)}
            >
              {!selectedDocId && <option value="">Choose any Candidate</option>}
              {candNames &&
                candNames.map((cand) => (
                  <option key={cand.docId} value={cand.docId}>
                    {cand.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <p className="candidate-paragraph">Last Name*</p>
            <input
              onChange={handleInputChange}
              name="lastName"
              type="text"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.lastName ? "red" : undefined,
              }}
              required
              value={selectedDetails?.lastName}
            />
          </div>
        </div>
      </div>

      <div id="sr-tcheck-popup" className="mt-10">
        <h2 className="candidate-sub-heading">Territory*</h2>
        <div className="flex justify-between gap-4 max-md:flex-col">
          <div className="flex flex-col w-full">
            <p className="candidate-paragraph">State/Province/Region</p>

            <select
              onChange={handleStateChange}
              name="territoryState"
              id="state"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.territoryState ? "red" : undefined,
              }}
            >
              {" "}
              {!selectedState && <option value={""}>Select a state</option>}
              {states.map((state, index) => (
                <option
                  key={index}
                  value={state.value}
                  selected={selectedDetails?.territoryState === state.value}
                >
                  {state.text}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <p className="candidate-paragraph">City</p>
            {cities.length > 0 ? (
              <select
                onChange={handleInputChange}
                name="territoryCity"
                className="candidate-select w-full"
                style={{
                  borderColor: formErrors.territoryCity ? "red" : undefined,
                }}
              >
                {!selectedState ? (
                  <option value="" disabled>
                    Select a state first
                  </option>
                ) : (
                  cities.map((city, index) => (
                    <option
                      key={index}
                      value={city}
                      selected={
                        selectedDetails?.territoryCity.toLowerCase() ===
                        city.toLowerCase()
                      }
                    >
                      {city}
                    </option>
                  ))
                )}
              </select>
            ) : (
              <input
                onChange={handleInputChange}
                name="territoryCity"
                className="candidate-select w-full"
                style={{
                  borderColor: formErrors.territoryCity ? "red" : undefined,
                }}
                type="text"
              />
            )}
          </div>

          <div className="flex flex-col w-full">
            <p className="candidate-paragraph">ZIP/Postal Code</p>
            <input
              onChange={handleInputChange}
              name="territoryZipcode"
              type="number"
              className="candidate-input w-full"
              style={{
                borderColor: formErrors.territoryZipcode ? "red" : undefined,
              }}
              required
              value={selectedDetails?.territoryZipcode}
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <label
          htmlFor="message"
          className="text-gray-500 font-bold first-letter:text-xl"
        >
          Territory Note / Email Contents
        </label>
        <textarea
          id="message"
          rows={6}
          className="candidate-input"
          onChange={handleInputChange}
          name="territoryNotes"
          value={selectedDetails?.territoryNotes}
        />
      </div>
      <div className="max-md:flex justify-center">
        <button
          className="candidate-btn mt-6"
          onClick={() => setAddContacts((prevContacts) => prevContacts + 1)}
        >
          ADD ADDITIONAL TERRITORY
        </button>
      </div>
      {addContacts > 0 && (
        <div className="flex flex-col gap-8 mt-5">
          {Array.from({ length: addContacts }).map((_, index) =>
            addContactDiv(index + 1)
          )}
        </div>
      )}
      <label className="flex items-center gap-2 mt-6">
        <input
          onChange={handleInputChange}
          type="checkbox"
          name="IncludeNameInTerritoryRequest"
          className="accent-custom-heading-color"
          checked={selectedDetails?.IncludeNameInTerritoryRequest || false}
        />
        <p className="text-gray-500 font-bold first-letter:text-1xl">
          Include candidate name in Territory Request
        </p>
      </label>
      <div className="flex flex-row justify-center mt-6">
        <button className="candidate-btn w-64" onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default RegisterationPopup;
