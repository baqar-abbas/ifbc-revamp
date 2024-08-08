import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import { useEffect } from "react";
import { useState } from "react";
import PageTransition from "src/Animations/PageTransition";
import DialogBox from "src/Popups/DialogBox";
import Form from "../CandidateForm/Form";
import MessagePopup from "src/Popups/MessagePopup";
import { MyTCFRContext } from "src/Context/TCFRDataContext";
import BarLoader from "src/Animations/BarLoader";
import { MyContext } from "src/Context/ListingDataContext";
import FormatRawDate from "src/Utils/FormatRawDate";

const MainCandidateProfile = () => {
  const { id } = useParams();
  const { cands } = useContext(MyCandContext);
  const [candDetails, setCandDetails] = useState(null);
  const { newData } = useContext(MyTCFRContext);
  const { listings, loading } = useContext(MyContext);
  const [filteredData, setFilteredData] = useState();
  const history = useNavigate();
  useEffect(() => {
    if (newData && newData.length > 0) {
      const filterData = newData.filter(
        (card) => card.candidateId === candDetails.docId
      );
      setFilteredData(filterData);
    }
  }, [candDetails]);

  useEffect(() => {
    if (cands && cands.length > 0) {
      const filteredArray = cands.filter((cand) => cand.docId == id);
      if (filteredArray.length > 0) {
        const filtered = filteredArray[0];
        setCandDetails(filtered || null);
      } else {
        history("/candidate-not-found");
      }
    }
  }, [cands]);

  return (
    <PageTransition>
      <div className="grid grid-cols-12 gap-30 max-w-7xl gap-10 mx-auto my-10 max-md:px-5">
        {/* card end */}
        <LeftSideCardContainer
          candDetails={candDetails}
          listings={listings}
          filteredData={filteredData}
          loading={loading}
          setCandDetails={setCandDetails}
        />
        <div className="col-span-9 max-md:block max-md:col-span-12 w-full">
          <Form candDetails={candDetails} />
        </div>
      </div>
    </PageTransition>
  );
};

const LeftSideCardContainer = ({
  candDetails,
  listings,
  filteredData,
  loading,
  setCandDetails,
}) => {
  const [activityOn, setActivityOn] = useState(false);
  const [flsOn, setFlsOn] = useState(false);
  const [resourcesOn, setResourcesOn] = useState(false);
  const [regOn, setRegOn] = useState(false);
  const { userDetails } = useContext(MyCandContext);

  const profileButtons = [
    // {
    //   text: "Activity",
    //   setShow: setActivityOn,
    // },
    {
      text: " View Contact",
      setShow: setRegOn,
    },
    {
      text: "FLS Criteria",
      setShow: setFlsOn,
    },
    {
      text: "Resources",
      setShow: setResourcesOn,
    },
    {
      text: "Registrations",
      setShow: setRegOn,
    },
  ];
  const handleEdit = async () => {};
  const dealStage = [
    { value: "", label: "Select Stage" },
    { value: "Initial Call Attempt", label: "Initial Call Attempt" },
    { value: "Connected", label: "Connected" },
    { value: "Spoton Candidate Research", label: "Spoton/Candidate Research" },
    {
      value: "Research & Prep Presentation",
      label: "Research & Prep Presentation",
    },
    { value: "Present Franchise Review", label: "Present/Franchise Review" },
    { value: "Intro to Zor", label: "Intro to Zor" },
    { value: "Franchise Due Diligence", label: "Franchise Due Diligence" },
    { value: "Validation FSO", label: "Validation - FSO" },
    { value: "Discovery Day Award FSO", label: "Discovery Day/Award - FSO" },
    { value: "Closed Won", label: "Closed Won" },
    { value: "Closed Lost", label: "Closed Lost" },
    { value: "On Hold", label: "On Hold" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setCandDetails((prevFields) => ({
      ...prevFields,
      [name]: inputValue,
    }));
  };

  return (
    candDetails && (
      <div className="md: flex flex-col gap-5 items-start max-md:col-span-12 md:col-span-3">
        <div className="mr-3 w-full">
          <p className="text-slate-500 text-sm font-semibold mb-2">
            Deal Stage
          </p>
          <select
            onChange={handleInputChange}
            className="candidate-select w-full"
            name="pipelineStep"
          >
            {dealStage.map((option, index) => (
              <option
                key={index}
                value={option.value}
                selected={option.value === candDetails?.pipelineStep}
              >
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm mb-1 font-medium ">
            To update the deal stage please update the contact's deal in
            HubSpot.
          </p>
        </div>
        <div className=" flex items-center">
          <input type="checkbox" id="archived" defaultValue={1} />
          <label
            className="text-sm text-custom-dark-blue font-serif ml-2 mb-0"
            htmlFor="archived"
          >
            Archive Candidate
          </label>
        </div>

        <div className="mr-3 w-full">
          <p className="text-slate-500 text-sm font-semibold mb-2">Broker</p>
          <p className="text-black capitalize">
            {userDetails.firstName + " " + userDetails.lastName}
          </p>
        </div>

        <ExtraButtonIcons />
        {/* buttons */}
        {profileButtons.map((btn, index) => (
          <button
            key={index}
            className="candidate-btn w-full"
            onClick={() => btn.setShow(true)}
          >
            {btn.text}
          </button>
        ))}
        {/* <DialogBox setShow={setActivityOn} show={activityOn}>
          <Activity setShow={setActivityOn} />
        </DialogBox> */}

        <DialogBox setShow={setFlsOn} show={flsOn}>
          <Flscriteria setShow={setFlsOn} />
        </DialogBox>

        <DialogBox setShow={setResourcesOn} show={resourcesOn}>
          <Resources setShow={setResourcesOn} />
        </DialogBox>

        <DialogBox setShow={setRegOn} show={regOn}>
          <Registerations
            setShow={setRegOn}
            listings={listings}
            filteredData={filteredData}
            loading={loading}
          />
        </DialogBox>

        <Link className="candidate-btn  w-full text-center">
          View Candidate in FLS
        </Link>

        <button className="candidate-btn w-full" onClick={handleEdit}>
          {loading ? "Loading..." : "Save Information"}
        </button>
      </div>
    )
  );
};

const Activity = ({ setShow }) => {
  const dealStage = [
    { value: "", label: "Select Stage" },
    { value: "Initial-Call-Attempt", label: "Initial Call Attempt" },
    { value: "Connected", label: "Connected" },
    { value: "Spoton-Candidate-Research", label: "Spoton/Candidate Research" },
    {
      value: "Research&Prep-Presentation",
      label: "Research & Prep Presentation",
    },
    { value: "Present-Franchise-Review", label: "Present/Franchise Review" },
    { value: "Intro-to-Zor", label: "Intro to Zor" },
    { value: "Franchise-Due-Diligence", label: "Franchise Due Diligence" },
    { value: "Validation-FSO", label: "Validation - FSO" },
    { value: "Discovery-Day-Award-FSO", label: "Discovery Day/Award - FSO" },
    { value: "Closed-Won", label: "Closed Won" },
    { value: "Closed-Lost", label: "Closed Lost" },
    { value: "On-Hold", label: "On Hold" },
  ];

  const Broker = [
    { value: "", label: "Select Broker" },
    { value: "Keerit-Tiwana", label: "Keerit Tiwana" },
  ];

  return (
    <div id="activity" className="candidate-tabs-content gap-4">
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

      <div className="flex w-full mt-5 gap-2">
        {/* <div className="w-full">
          <input
            type="text"
            name="activity-search"
            id="activity-search"
            placeholder="Search Activity"
            className="p-[6px] mb-2 bg-gray-50 border-gray-300 border rounded-sm placeholder-[#2176ff] placeholder:text-sm placeholder:font-bold text-black"
          />
        </div> */}
        <div className="w-full">
          <select className=" candidate-select w-full">
            {dealStage.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <select className="candidate-select w-full">
            {Broker.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Card
          title={" Formal Registration"}
          date={" Apr 19, 2024 at 11:31AM"}
          text={
            "Sent a Formal Registration to Teriyaki Madness for AVON IN 46123"
          }
        />
        <Card
          title={" Formal Registration"}
          date={" Apr 19, 2024 at 11:31AM"}
          text={
            "Sent a Formal Registration to Teriyaki Madness for AVON IN 46123"
          }
        />
      </div>
    </div>
  );
};
const Card = ({ title, date, text }) => {
  return (
    <div className="flex w-full">
      <div className=" bg-white rounded-b-lg border-t-8 border-custom-grey px-4 py-5 flex flex-col shadow-md">
        <div className="flex justify-center flex-col items-center">
          <p className="text-xl font-bold text-custom-heading-color">{title}</p>

          <p className="text-sm font-bold  text-custom-dark-blue text-center ">
            {date}
          </p>

          <p className="text-sm text-custom-grey text-center mt-3">{text}</p>
        </div>
      </div>
    </div>
  );
};

const Flscriteria = ({ setShow }) => {
  const selectData = [
    { name: "advertising", label: "Advertising" },
    { name: "automotive", label: "Automotive" },
    { name: "beautyspa", label: "Beauty & Spa" },
    { name: "businessmanagement", label: "Business Management & Coaching" },
    { name: "businessservices", label: "Business Services" },
    { name: "childeducation", label: "Child Education, STEM & Tutoring" },
    { name: "childservices", label: "Child Services & Products" },
    {
      name: "cleaningresidential",
      label: "Cleaning: Residential & Commercial",
    },
    { name: "computertechnology", label: "Computer Technology" },
    {
      name: "ratingdistribution",
      label: "Select a rating Distribution Services",
    },
    { name: "drycleaning", label: "Dry Cleaning-Laundry" },
    { name: "financialservices", label: "Financial Services" },
    { name: "fitness", label: "Fitness" },
    { name: "foodbeverage", label: "Food & Beverage: Restaurant/QSR/Catering" },
    { name: "foodcoffee", label: "Food: Coffee/Tea/Smoothies/Sweets" },
    { name: "foodstores", label: "Food: Stores & Catering" },
    { name: "healthmedical", label: "Health/Medical" },
    { name: "healthwellness", label: "Health/Wellness" },
    { name: "homeimprovement", label: "Home Improvement" },
    { name: "design", label: "Interior/Exterior Design" },
    { name: "maintenance", label: "Maintenance & Repair" },
    { name: "moving", label: "Moving, Storage & Junk Removal" },
    { name: "painting", label: "Painting" },
    { name: "pestcontrol", label: "Pest Control" },
    { name: "petcare", label: "Pet Care & Grooming" },
    { name: "print", label: "Print, Copy & Mailing" },
    { name: "realstate", label: "Real Estate" },
    { name: "restoration", label: "Restoration" },
    { name: "retail", label: "Retail" },
    { name: "security", label: "Security" },
    { name: "seniorcare", label: "Senior Care: Medical/Non-Medical" },
    {
      name: "seniorcareoption",
      label: "Senior Care: Medical/Non-Medical Option",
    },
    { name: "signs", label: "Signs" },
    { name: "eventplanning", label: "Special Event Planning" },
    { name: "sportsrecreation", label: "Sports & Recreation" },
    { name: "staffing", label: "Staffing" },
    { name: "travelplanning", label: "Travel Planning" },
    { name: "vending", label: "Vending" },
  ];
  return (
    <div id="fls-criteria" className="candidate-tabs-content p-30">
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

      <div id="container2" className="py-4 mb-2">
        <h1 className="text-lg text-[#2176ff] font-bold mb-2">
          Franchise Categories
        </h1>
        <p className="text-sm text-black font-semibold">
          Rank the Franchise Categories in order of preference, with 1 being the
          least favorite and 10 being the most favorite.
        </p>
      </div>

      <div
        id="container3"
        className="border-b border-gray-300  grid grid-cols-2 gap-x-10"
      >
        {selectData.map((item, index) => (
          <div key={index} className="w-full mr-4">
            <div className="mt-2">
              <label className="flex gap-x-1 items-center mr-6">
                <input type="checkbox" name="Hide Section" />
                <span className="text-black">{item.label}</span>
              </label>
            </div>
            <Select name={item.name} />
          </div>
        ))}
        <h1 className="text-lg text-[#2176ff] font-bold">FLS Filters</h1>
        {/* Yahn Tabs Ayainge Fls filtes ke */}
      </div>
    </div>
  );
};

const Select = ({ name }) => {
  return (
    <div className="mt-2">
      <div className="mr-4 w-full">
        <select id={name} name={name} className=" candidate-select w-full">
          <option selected>Select a rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

const Resources = ({ setShow }) => {
  return (
    <div id="resources" className="candidate-tabs-content p-5">
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
      <h1 className="text-lg font-bold text-[#2176ff]">
        No resources available
      </h1>
    </div>
  );
};

const Registerations = ({ setShow, listings, filteredData, loading }) => {
  const tools = [
    { value: "", label: "Tools" },
    { value: "info", label: "Create Information Packet" },
    { value: "comparison", label: "Create Comparison Report" },
    { value: "2-min", label: "Download 2-Min Drill Packet" },
    { value: "one-sheet", label: "Download One Sheet Packets" },
  ];
  const allFilters = [
    { value: "", label: "All Filters" },
    { value: "available", label: "Available" },
    { value: "accepted", label: "Accepted" },
    { value: "notavailable", label: "Not Available" },
    { value: "alternate", label: "Alternate Areas Available" },
    { value: "responded", label: "Not Responded" },
    { value: "territorychecks", label: "Territory Checks" },
    { value: "formalregistrations", label: "Formal Registrations" },
  ];
  const allTerritories = [
    { value: "", label: "All Territories" },
    { value: "46123", label: "AVON IN 46123" },
  ];

  const updateSelected = [
    { value: "", label: "Update Selected" },

    { value: "territorycheck", label: "Territory Check" },

    { value: "available", label: "Available" },
    { value: "not-available", label: "Not Available" },
    { value: "alternate", label: "Alternate Areas Available" },
    { value: "formalregistration", label: "Formal Registration" },
    { value: "accepted", label: "Accepted" },
  ];

  return (
    <>
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
      {!loading ? (
        filteredData.length > 0 ? (
          <div
            id="registerations"
            className="candidate-tabs-content p-24 mt-10"
          >
            <div id="top-registration" className="grid grid-cols-4 gap-3">
              {/* input 1 */}
              <select className="candidate-select w-full">
                {tools.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select className="candidate-select">
                {allFilters.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select className="candidate-select">
                {allTerritories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <input
                type="datetime-local"
                name=""
                id=""
                className="candidate-input w-full"
              />
            </div>

            <div id="second-row" className="w-full flex gap-6 my-4">
              <button className="candidate-btn w-full">Select All</button>
              <select className="candidate-select w-full">
                {updateSelected.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div
              id="headings-row"
              className="grid grid-cols-4 divide-x-2 justify-center align-middle "
            >
              {/* column 1 */}
              <div className=" p-4 bg-[#2176ff] align-middle">
                <h1 className="text-white font-bold text-sm">Franchise Name</h1>
              </div>
              {/* column 2 */}
              <div className="  p-4 bg-[#2176ff] align-middle">
                <h1 className="text-white font-bold text-sm">Type</h1>
              </div>
              {/* column3 */}
              <div className=" p-4 bg-[#2176ff] align-middle">
                <h1 className="text-white font-bold text-sm">Sent Date</h1>
              </div>
              {/* column 4 */}
              <div className=" p-4 bg-[#2176ff] align-middle border-r ">
                <h1 className="text-white font-bold text-sm">Status</h1>
              </div>
            </div>
            {/* container 3  */}
            {filteredData?.map((card) => (
              <Description card={card} listings={listings} />
            ))}
          </div>
        ) : (
          <div className="md:p-10 grid place-items-center max-md:py-20 max-md:px-10">
            <h1 className="font-bold text-4xl text-custom-heading-color">
              No Registrations
            </h1>
          </div>
        )
      ) : (
        <div className="w-full grid place-items-center">
          <BarLoader bgcolor={"blue"} />
        </div>
      )}
    </>
  );
};

const Description = ({ card, listings }) => {
  const [show, setShow] = useState(false);

  const [filteredListing, setFilteredListing] = useState();
  useEffect(() => {
    if (listings && listings.length > 0) {
      const filtered = listings.filter(
        (listing) => listing.docId == card.listingsIds
      );
      if (filtered) {
        setFilteredListing(filtered[0]);
      }
    }
  }, [listings]);

  return (
    <div id="description-row" className="grid grid-cols-4 divide-x-2">
      <div className=" p-3  bg-gray-200 justify-center">
        <div id="listing-name-container" className="flex items-center gap-1">
          <label className="flex items-center">
            <input type="checkbox" name="Hide Section" />
          </label>

          <button
            id="listing-name"
            className="text-custom-heading-color text-left underline font-bold text-sm"
            onClick={() => setShow(true)}
          >
            {filteredListing?.name}
          </button>
        </div>
        <DialogBox show={show} setShow={setShow}>
          <MessagePopup setShow={setShow} />
        </DialogBox>
      </div>
      <div className=" p-3 bg-gray-200">
        <p className="text-black font-bold text-sm">
          {card.docType.trim() === "TC"
            ? "Territory Check"
            : "Formal Registeration"}
        </p>
      </div>
      <div className=" p-3 bg-gray-200">
        <p className="text-black font-bold text-sm">
          {FormatRawDate(card, true)}
        </p>
      </div>
      <div className=" p-3 bg-gray-200 ">
        <p className="text-black font-bold text-sm">{card.status}</p>
      </div>
    </div>
  );
};

const ExtraButtonIcons = () => {
  return (
    <div className="flex mt-3 mb-3 justify-between w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="candidate-profile-icons"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="candidate-profile-icons"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="candidate-profile-icons"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="candidate-profile-icons"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="candidate-profile-icons "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    </div>
  );
};

export default MainCandidateProfile;
