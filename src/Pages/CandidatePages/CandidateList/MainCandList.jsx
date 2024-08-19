import React, { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PageTransition from "src/Animations/PageTransition";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import DialogBox from "src/Popups/DialogBox";
import Papa from "papaparse";
import FormatRawDate from "src/Utils/FormatRawDate";

const cleanKeys = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => cleanKeys(item));
  } else if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      const newKey = key.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
      acc[newKey] = cleanKeys(data[key]);
      return acc;
    }, {});
  }
  return data;
};

const MainCandList = () => {
  const { cands, loading } = useContext(MyCandContext);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [allCandidatesIds, setAllCandidatesIds] = useState([]);

  const [show, setShow] = useState(false);
  const [allSelectedCandData, setAllSelectedCandData] = useState([]);
  const [filterCands, setFilterCands] = useState();
  const [format, setFormat] = useState(
    window.innerWidth > 768 ? "table" : "grid"
  );
  // Function to handle checkbox change
  const handleCheckboxChange = (docid) => {
    setSelectedCandidates((prevSelected) => {
      // Check if docid already exists in selectedMessages
      const index = prevSelected.indexOf(docid);
      if (index === -1) {
        // Add docid if it doesn't exist
        return [...prevSelected, docid];
      } else {
        // Remove docid if it exists
        return prevSelected.filter((sN) => sN !== docid);
      }
    });
  };

  useEffect(() => {
    if (cands?.length > 0) {
      if (filterCands?.status) {
        const filterStatus =
          filterCands?.status === "N/A"
            ? cands.filter((cand) => cand.pipelineStep === "")
            : cands.filter((cand) => cand.pipelineStep === filterCands?.status);
        setFilteredCandidates(filterStatus);
      } else {
        setFilteredCandidates(cands);
      }
    }
  }, [filterCands?.status, loading, cands]);

  useEffect(() => {
    if (cands && cands.length > 0) {
      const docids = cands.map((cand) => cand.docid);
      const uniquedocids = [...new Set(docids)];
      setAllCandidatesIds(uniquedocids);
    }
  }, [cands]);

  useEffect(() => {
    if (cands && cands.length > 0) {
      const allMessages = cands.filter((cand) =>
        selectedCandidates.includes(cand.docid)
      );
      setAllSelectedCandData(allMessages);
    }
  }, [selectedCandidates]);

  const handleBulkActions = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFilterCands((prev) => ({
      ...prev,
      action: value,
    }));
  };
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  };
  const allSelected = arraysEqual(selectedCandidates, allCandidatesIds);

  const actions = [
    { text: "Bulk Actions" },
    { text: "Delete" },
    { text: "Update Lead Source" },
    { text: "Update Deal Stage" },
    { text: "Merge Candidates" },
    { text: "Add Candidates to Hubspot" },
  ];

  const handleEdit = async (e) => {
    e.preventDefault();
    //setLoading(true);

    const url = "https://backend.ifbc.co/api/candidateprofile/";

    allSelectedCandData.map((cand) => {
      const formData = {
        ...cand,
        isArchive: filterCands.action === "Archive" ? true : false,
        DealStage: filterCands.action === "Update Deal Stage" ? true : false,
      };

      axios
        .put(url + cand.docid, formData)
        .then((response) => {
          // // Handle successful response
          if (response.status === 204) {
            setShow(true);
            setTimeout(() => {
              setShow(false);
              window.location.reload();
            }, 3000);
            setLoading(false);
          }
        })
        .catch((error) => {
          // Handle error
          setLoadingError(true);
          console.error("Error fetching data:", error);
        });
    });
    // Make a GET request to fetch the data
  };

  return (
    // page banner
    <PageTransition>
      <div className="grid grid-cols-12 gap-5 md:max-w-7xl md:mx-auto md:my-10 max-md:mx-5 max-md:my-5">
        <div className="col-span-12 flex justify-between gap-3 p-5 bg-[#2176ff]/30 rounded-3xl">
          <div
            id="cand-list-top"
            className={`md:grid  ${filterCands?.action ? "md:grid-cols-4" : "md:grid-cols-3"} gap-5 max-md:flex flex-col  w-full`}
          >
            <div className="flex items-center ">
              <SearchingInput setFilterCands={setFilterCands} />
            </div>
            <div className=" md:flex items-center ">
              <input
                type="datetime-local"
                className="candidate-input w-full"
                onChange={() => setFilterCands({ datetime: e.target.value })}
              />
            </div>

            {/* yahan pr  dalengay select*/}
            <select
              className="candidate-select"
              name="actions"
              onChange={handleBulkActions}
            >
              {actions.map((step, index) => (
                <option key={index} value={step.text}>
                  {step.text}
                </option>
              ))}
            </select>

            {filterCands?.action && filterCands?.action !== "Bulk Actions" && (
              <button className="candidate-btn">Confirm</button>
            )}
          </div>

          {window.innerWidth > 768 && (
            <div id="formatchanger" className="flex items-center">
              <svg
                onClick={() => setFormat("table")}
                xmlns="http://www.w3.org/2000/svg"
                fill={`${format === "table" ? "rgb(33 118 255)" : "black"}`}
                className="w-8 h-8 cursor-pointer"
                viewBox="0 0 100 100"
              >
                <rect x={19} y="18.92" width={60} height={16} rx={4} ry={4} />
                <rect x={19} y="40.92" width={27} height={16} rx={4} ry={4} />
                <rect x={19} y="62.92" width={27} height={16} rx={4} ry={4} />
                <path d="M64.95,72.49a1.45,1.45,0,0,0,2.1,0l11.5-11.4a1.45,1.45,0,0,0,0-2.1L67,47.49a1.45,1.45,0,0,0-2.1,0l-2.1,2.1a1.45,1.45,0,0,0,0,2.1l3.6,3.6a1,1,0,0,1-.7,1.7H53.6a1.63,1.63,0,0,0-1.6,1.5v3A1.71,1.71,0,0,0,53.6,63H65.75a1,1,0,0,1,.7,1.7l-3.6,3.6a1.45,1.45,0,0,0,0,2.1Z" />
              </svg>

              <svg
                onClick={() => setFormat("grid")}
                xmlns="http://www.w3.org/2000/svg"
                fill={`${format === "grid" ? "rgb(33 118 255)" : "black"}`}
                className="w-8 h-8 cursor-pointer"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 100 100"
                xmlSpace="preserve"
              >
                <path d="M56.5,38.3c0-1-0.9-1.9-1.9-1.9H43.4c-1,0-1.9,0.9-1.9,1.9V72c0,1,0.9,1.9,1.9,1.9h11.2c1,0,1.9-0.9,1.9-1.9  V38.3z M34,38.3c0-1-0.9-1.9-1.9-1.9H20.9c-1,0-1.9,0.9-1.9,1.9V77c0,1,0.9,1.9,1.9,1.9h11.2c1,0,1.9-0.9,1.9-1.9V38.3z M79,38.3  c0-1-0.9-1.9-1.9-1.9H65.9c-1,0-1.9,0.9-1.9,1.9V67c0,1,0.9,1.9,1.9,1.9h11.2c1,0,1.9-0.9,1.9-1.9V38.3z M79,20.8  c0-1-0.9-1.9-1.9-1.9H20.9c-1,0-1.9,0.9-1.9,1.9V27c0,1,0.9,1.9,1.9,1.9h56.2c1,0,1.9-0.9,1.9-1.9V20.8z" />
              </svg>
            </div>
          )}
        </div>
        <div className="md:col-span-4 max-md:col-span-12">
          <ImportExport setFormat={setFormat} format={format} cands={cands} />
        </div>

        {!loading && (
          <div className="max-md:col-span-12 md:col-span-8 ">
            {window.innerWidth > 768 && (
              <TableFormatData
                loading={loading}
                cands={filteredCandidates}
                format={format}
                selectedCandidates={selectedCandidates}
                handleCheckboxChange={handleCheckboxChange}
                setSelectedCandidates={setSelectedCandidates}
                allSelected={allSelected}
                allCandidatesIds={allCandidatesIds}
              />
            )}
            <GridFormatData
              loading={loading}
              cands={filteredCandidates}
              format={format}
              selectedCandidates={selectedCandidates}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        )}
      </div>
    </PageTransition>
  );
};

const TableFormatData = ({
  cands,
  format,
  selectedCandidates,
  handleCheckboxChange,
  setSelectedCandidates,
  allSelected,
  allCandidatesIds,
}) => {
  return (
    <div
      id="cand-table-format"
      className={`${format === "table" ? "block" : "hidden"} mt-2 `}
    >
      <div className="relative overflow-x-auto shadow-[rgba(6,_24,_44,_0.01)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] rounded-3xl ">
        <table
          className="w-full text-sm text-left rtl:text-right text-black "
          align="center"
        >
          <thead className="text-md text-center text-white uppercase bg-[#2176ff] ">
            <tr>
              {" "}
              <th scope="col" className="px-6 py-3">
                <label className=" h-full flex items-center ">
                  <input
                    className="peer cursor-pointer hidden after:opacity-100"
                    type="checkbox"
                    checked={allSelected}
                    onChange={() =>
                      setSelectedCandidates(allSelected ? [] : allCandidatesIds)
                    }
                  />
                  <span className="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#141414] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100" />
                </label>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3">
                Deal Stage
              </th>
              <th scope="col" className="px-6 py-3">
                Worked On
              </th>
            </tr>
          </thead>
          <tbody>
            {cands?.length > 0 &&
              cands.map((cand) => {
                const formatted = FormatRawDate(cand);
                return (
                  <tr
                    className=" border-b text-center cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      handleCheckboxChange(cand.docid);
                    }}
                  >
                    <td className="px-3 py-7 text-base capitalize ">
                      <label class=" h-full flex items-center ">
                        <input
                          class="peer cursor-pointer hidden after:opacity-100"
                          checked={selectedCandidates.includes(cand.docid)}
                          onChange={() => {
                            handleCheckboxChange(cand.docid);
                          }}
                          type="checkbox"
                        />
                        <span class="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#141414] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
                      </label>
                    </td>
                    <td className="px-3 py-7 text-base capitalize ">
                      {console.log(cand)}
                      <NavLink
                        to={`/candidate-profile/${cand.docid} `}
                        className="hover:underline"
                      >{`${cand.firstName} ${cand.lastName}`}</NavLink>
                    </td>
                    <td className="px-3 py-4 text-base">
                      <a href={`tel:${cand.phone}`}>{cand.phone}</a> <br />
                      <a href={`mailto:${cand.email}`}>{cand.email}</a>
                    </td>
                    <td className="px-3 py-4 text-base">
                      {cand.pipelineStep ? cand.pipelineStep : "N/A"}
                    </td>
                    <td className="px-3 py-4 text-base">{formatted}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GridFormatData = ({ format, cands }) => {
  const steps = [
    { text: "Initial Call Attempt" },
    { text: "Connected" },
    { text: "Spoton/Candidate Research" },
    { text: "Research & Prep Presentation" },
    { text: "Present/Franchise Review" },
    { text: "Intro to Zor" },
    { text: "Franchise Due Diligence" },
    { text: "Validation - FSO" },
    { text: "Discovery Day/Award - FSO" },
    { text: "Closed Won" },
    { text: "Closed Lost" },
    { text: "On Hold" },
  ];
  return (
    <div
      id="container"
      className={`${
        format === "grid" ? "block" : "hidden"
      } divide-x-4 flex max-w-[100%] mx-auto overflow-x-scroll `}
    >
      {steps.map((step) => (
        <div className=" w-[400px] ">
          <div className=" rounded-md ">
            <h1 className="text-white p-3 text-center bg-[#2176ff]">
              {step.text}
            </h1>
          </div>
          <div className="p-7 flex flex-col gap-5">
            {cands?.length > 0 &&
              cands.map((cand) => {
                return <Card cand={cand} />;
              })}
          </div>
        </div>
      ))}
    </div>
  );
};

const Card = ({ cand }) => {
  return (
    <div className="p-3 rounded-md border-2 border-[#2176ff]  overflow-hidden z-[50] relative cursor-pointer snap-start  bg-white flex flex-col flex-wrap items-center justify-center gap-3 transition-all duration-300 group shadow-lg">
      <h1 className="text-2xl text-left font-semibold text-[#434955] capitalize">
        {cand.firstName} {cand.lastName}
      </h1>
      <ul className="flex flex-col items-center gap-2 has-[:last]:border-b-0 justify-center border-b-[1.5px] border-b-stone-700 border-dotted pb-3 text-xs">
        <li className="flex items-center gap-1">
          <svg
            id="phone"
            viewBox="0 0 24 24"
            className="fill-stone-700 group-hover:fill-[#58b0e0]"
            height={15}
            width={15}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
          </svg>
          <p className="text-sm">
            <a href={`tel:${cand.phone}`}> {cand.phone}</a>
          </p>
        </li>
        <li className="flex items-center gap-1">
          <svg
            className="fill-stone-700 group-hover:fill-[#58b0e0]"
            height={15}
            width={15}
            id="mail"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16,14.81,28.78,6.6A3,3,0,0,0,27,6H5a3,3,0,0,0-1.78.6Z"
              fill="#231f20"
            />
            <path
              d="M16.54,16.84h0l-.17.08-.08,0A1,1,0,0,1,16,17h0a1,1,0,0,1-.25,0l-.08,0-.17-.08h0L2.1,8.26A3,3,0,0,0,2,9V23a3,3,0,0,0,3,3H27a3,3,0,0,0,3-3V9a3,3,0,0,0-.1-.74Z"
              fill="#231f20"
            />
          </svg>
          <p className="text-sm">
            <a href={`mailto:${cand.email}`}>{cand.email}</a>
          </p>
        </li>
      </ul>
      {/* <hr className="w-full group-hover:h-5 h-3 bg-[#2176ff] group-hover:transition-all group-hover:duration-300 transition-all duration-300 " /> */}
    </div>
  );
};

const SearchingInput = ({ setFilterCands }) => {
  const ref = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchInputChange = () => {
    const keyword = ref.current.value;
    setSearchKeyword(keyword);

    // Update the filters state with the search keyword
    setFilterCands({
      ...filters,
      search: keyword,
    });
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        id="search-field"
        placeholder="Search Any Candidate"
        value={searchKeyword}
        ref={ref}
        onChange={handleSearchInputChange}
        className="block w-full p-3 text-sm text-black pr-10 outline-none bg-white rounded-full"
      />

      <button
        className=" absolute right-2.5 top-4 w-4 h-4"
        onClick={handleSearchInputChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 487.95 487.95"
        >
          <path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
        </svg>
      </button>
    </div>
  );
};

const ImportExport = ({ cands, setFilterCands, filterCands }) => {
  const [show, setShow] = useState(false);

  const [jsonData, setJsonData] = useState(null);

  // METHODS FOR EXPORTING THE DATA
  const handleExport = (jsonData) => {
    if (!jsonData || !jsonData.length) {
      alert("No data to export!");
      return;
    }

    // Convert JSON to CSV format
    const csv = Papa.unparse(jsonData);

    // Create a Blob object to represent the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "exported_data.csv");

    // Simulate a click on the <a> element to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the URL and removing the <a> element
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const mapDataToDbColumns = (data) => {
    const mappings = {
      closeDate: "Close Date",
      firstName: "First Name",
      lastName: "Last Name",
      Phone: "Phone",
      Email: "Email",
      territoryCity: "Territory City",
      territoryState: "Territory State",
      territoryZipcode: "Territory Zipcode",
      currentCity: "Current City",
      currentState: "Current State",
      currentZipcode: "Current Zipcode",
      territoryNotes: "Territory Notes",
      DealSource: "Deal Source",
      DealSourceCost: "Deal Source Cost",
      ZorackleValue: "Zorackle Value",
      DealValue: "Deal Value",
      About: "About This Client / Email Contents",
      InvestmentFranchise:
        "How much money are you wanting to invest in the franchise?",
      Funding: "Do you have a need for funding?",
      CreditScore:
        "Do you happen to know what your credit score currently is? Is this an estimate?",
      InitialQualifyingNote: "Initial Qualifying Note",
      Activities: "What work activities do you enjoy?",
      AttendingNetworkFunction:
        "Are you comfortable attending networking functions to promote your new business?",
      MultiUnitOps: "Are you interested in Multiple-Unit Operation or Masters?",
      BusinessPartner: "Are you planning on having a partner in the business?",
      FamilyFeel: "How does your family feel about your interest in this?",
      EmployeesPrefer:
        "What types of employees would you prefer to work with (if any)?",
      StaffSize: "What size staff are you comfortable with?",
      ZorakleNotes: "Zorakle Notes",
      FundingBusiness: "How do you plan on funding the business?",
      RetirementPlan:
        "Do you have retirement plans (Such as 401k) you plan to use?",
      VALoan:
        "Have you been in the military or could you qualify for a VA loan?",
      CurrentNetworth:
        "Is your current net worth over $500,000? If not, what is your current net worth?",
      TrafficViolation:
        "Have you or your spouse ever been convicted of something other than a minor traffic violation?",
      Unsatisfiedjudgment:
        "Are you or your spouse subject to a pending litigation or unsatisfied judgment?",
      Bankruptcy:
        "Have you or your spouse ever declared bankruptcy? If yes, when was it discharged?",
      EligibilityNote: "Eligibility Note",
      BusinessBefore: "Have you ever owned a business before?",
      MarketingExperience: "Do you have any marketing experience?",
      ManagementExperice: "Do you have any management experience?",
      SalesExperience: "Do you have sales experience?",
      ReviewFinancialStatement:
        "Do you have experience in reviewing financial statements?",
      CSExperience:
        "Do you have customer service and account management experience?",
      AttractiveBusinessOwner:
        "What do you find most attractive about being a business owner?",
      HandleNewBusiness:
        "From your past experience is there anything you prefer not to handle with your new business?",
      BusinessExpectations:
        "What are your expectations from the business? What type of lifestyle are you looking to achieve?",
      WantNote: "Want Notes",
      PreferB2b: "Do you prefer B2B or B2C?",
      PhysicalLocation:
        "Do you prefer a physical location or home-based business model?",
      Inventory:
        "Would you prefer to have an inventory or service-based business model?",
      ColdCalling:
        "Are you comfortable with a business that requires cold calling?",
      PassiveMode:
        "Are you going to be in this business as an owner/operator or do you prefer a passive model, semi-passive model?",
      BusinessHours:
        "Is working standard business hours (9am-5pm) important to you?",
      Networth: "Net Worth ?",
      LiquidCash: "Liquid Cash? ",
      Competency1: "Competency 1",
      Competency2: "Competency 2",
      Competency3: "Competency 3",
      FranchiseCause: "What caused you to start looking for a franchise?  ",
      ProfessionalBackground: "What is your professional background? ",
      FranchiseInterested: "What franchises are you interested in?",
      TimeFrame: "What is your time frame? ",
      Status: "Status",
      PipelineStep: "Pipeline Step",
      LostReason: "Lost Reason",
      CategoryRating: "Category Rating",
    };

    const transformedData = {};
    Object.keys(data).forEach((key) => {
      const dbKey =
        mappings[key] || key.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
      transformedData[dbKey] = data[key];
    });

    return transformedData;
  };
  // METHODS FOR IMPORTING THE DATA
  const handleFileUpload = (event) => {
    const file = event.target.previousElementSibling.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length) {
              console.error("Errors during parsing:", results.errors);
              alert(
                "There was an error parsing the CSV file. Please check the file format."
              );
            } else {
              const cleanedData = cleanKeys(results.data);
              const dbData = cleanedData.map((item) =>
                mapDataToDbColumns(item)
              );
              setJsonData(dbData);
            }
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            alert("There was an error reading the CSV file.");
          },
        });
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const steps = [
    { text: "Select Deal Stage" },
    { text: "N/A" },
    { text: "Initial Call Attempt" },
    { text: "Connected" },
    { text: "Spoton/Candidate Research" },
    { text: "Research & Prep Presentation" },
    { text: "Present/Franchise Review" },
    { text: "Intro to Zor" },
    { text: "Franchise Due Diligence" },
    { text: "Validation - FSO" },
    { text: "Discovery Day/Award - FSO" },
    { text: "Closed Won" },
    { text: "Closed Lost" },
    { text: "On Hold" },
  ];

  const handleStatusChange = (e) => {
    e.preventDefault();
    setFilterCands((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col gap-5 mt-3">
      <div
        id="filters-dd"
        className={`${filterCands?.action !== "Bulk Actions" ? "grid-cols-5" : "grid-cols-4"}   flex flex-col gap-5 `}
      >
        <select
          className="candidate-select"
          name="steps"
          onChange={handleStatusChange}
        >
          {steps.map((step, index) => (
            <option key={index} value={step.text}>
              {step.text}
            </option>
          ))}
        </select>

        <div id="last-col-candlist" className="flex  items-center">
          <label
            htmlFor="default-checkbox"
            className="flex items-center ms-2 text-sm font-medium text-slate-500 "
          >
            <input
              id="default-checkbox"
              type="checkbox"
              defaultValue
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            View Archived Candidates
          </label>
        </div>
      </div>

      <button
        className="candidate-btn w-full"
        onClick={() => handleExport(cands)}
      >
        Export
      </button>
      <button className="candidate-btn w-full" onClick={() => setShow(true)}>
        Import
      </button>

      <DialogBox show={show} setShow={setShow}>
        <div className="p-10 flex flex-col relative gap-3 items-center text-center">
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
          <h1 className="candidate-sub-heading">Import Candidates</h1>
          <p>
            Select CSV file to upload
            <br />
            Download a sample sheet
            <a
              href="/files/sample-client-import.csv"
              download
              className="font-bold underline text-custom-heading-color"
            >
              here
            </a>
          </p>

          <div className="grid w-full max-w-xs items-center gap-1.5">
            <label htmlFor="" className="candidate-label">
              Upload your file here
            </label>
            <input
              id="csv"
              type="file"
              accept=".csv"
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            />
            <button
              type="button"
              className="candidate-btn"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>
        </div>
      </DialogBox>
    </div>
  );
};

export default MainCandList;
