import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MyTCFRContext } from "src/Context/TCFRDataContext";
import FormatRawDate from "src/Utils/FormatRawDate";
import { Link, NavLink } from "react-router-dom";
import BarLoader from "src/Animations/BarLoader";
import { useQuery } from "react-query";
import axios from "axios";

const CandidateSideBar = ({ active, setActive, setSelectedCandName }) => {
  const { newData, loadingTCFR, newDataNames, isLoadingNames } =
    useContext(MyTCFRContext);

  useEffect(() => {
    document.querySelector("html").style.overflow = active ? "hidden" : "auto";
  }, [active]);

  return (
    <>
      {active && (
        <div
          id="bg-on-active"
          className="fixed z-[9999] w-full h-full top-0 bg-custom-heading-color/50"
        />
      )}
      <motion.div
        initial={{ y: "100%" }}
        animate={{
          y: active ? 0 : "100%",
          transformOrigin: "bottom",
          transition: { duration: 1, type: "spring", bounce: 0.1 },
        }}
        id="right-side-container"
        className={`bg-custom-heading-color fixed bottom-0  right-0 w-full h-[100%] transition-[width] z-[99999] drop-shadow-md`}
      >
        {/* <ToggleButton active={active} setActive={setActive} /> */}
        <ActivityGridContainer
          newData={newData}
          active={active}
          setActive={setActive}
          loadingTCFR={loadingTCFR}
          newDataNames={newDataNames}
          isLoadingNames={isLoadingNames}
          setSelectedCandName={setSelectedCandName}
        />
      </motion.div>
    </>
  );
};

const baseUrl = `https://backend.ifbc.co/api`;

const fetchCandidate = async (candidateId) => {
  const { data } = await axios.get(`${baseUrl}/candidates/${candidateId}`);
  return data;
};

const fetchListing = async (listingId) => {
  const { data } = await axios.get(`${baseUrl}/listings/${listingId}`);
  return data;
};

const ActivityGridContainer = ({
  loadingTCFR,
  active,
  newData,
  newDataNames,
  isLoadingNames,
  setActive,
  setSelectedCandName,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCandId, setSelectedCandId] = useState("");

  useEffect(() => {
    if (selectedCandId && selectedCandId !== "0") {
      const filteredData = newData.filter(
        (data) => data.candidateId == selectedCandId
      );
      setFilteredData(filteredData.length > 0 ? filteredData : newData);
    } else {
      setFilteredData(newData);
    }
  }, [newData, selectedCandId]);

  const handleSelectCand = (e) => {
    setSelectedCandId(e.target.value);
    const selectedName = newDataNames.find(
      (name) => name.value == e.target.value
    );

    setSelectedCandName(
      selectedName ? { name: selectedName.name, docId: e.target.value } : null
    );
  };

  return !loadingTCFR && !isLoadingNames ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: active ? 1 : 0,
        transition: { duration: 1, ease: "backInOut" },
      }}
      className="side-bar-main-div md:p-10 max-md:p-5 flex flex-col gap-6 text-center h-full overflow-y-scroll"
    >
      <div
        id="top-candidate-sidebar"
        className="flex md:justify-between max-md:flex-col max-md:gap-4 max-md:w-full py-5 md:px-10"
      >
        <h2 className="side-bar-first-heading text-3xl">Recent Activity</h2>

        <div
          id="select-candidate-container"
          className="flex max-md:flex-col gap-5"
        >
          <NavLink to="/apply-now" className="candidate-inverted-btn ">
            Add New Candidate
          </NavLink>
          {filteredData && filteredData.length > 0 && (
            <select
              className="md:w-64 max-md:text-center px-2   candidate-select capitalize max-md:w-full"
              name="candidate-names "
              id="candidate-names"
              onChange={handleSelectCand}
            >
              <option value="">No Candidates Selected</option>
              {newDataNames &&
                newDataNames.length > 0 &&
                newDataNames.map((name, index) => (
                  <option key={index} value={name.value}>
                    {name.name}
                  </option>
                ))}
            </select>
          )}
        </div>

        <button
          className="absolute top-3 right-6"
          onClick={() => setActive(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <div
        id="activity-grid-container"
        className={`max-md:block ${filteredData && filteredData.length > 0 ? "grid" : "flex flex-col h-full items-center"} md:max-xl:grid-cols-2 xl:max-2xl:grid-cols-3 2xl:grid-cols-4 gap-3`}
      >
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((card, index) => <Card key={index} card={card} />)
        ) : (
          <h1 className="w-full text-white flex justify-center text-3xl items-center h-full">
            No Registrations
          </h1>
        )}
      </div>
    </motion.div>
  ) : (
    <div className="w-full flex justify-center h-full items-center">
      <BarLoader bgcolor={"white"} />
    </div>
  );
};

const Card = ({ card }) => {
  const { data: filteredCand, isLoading: isLoadingCand } = useQuery(
    ["candidate", card.candidateId],
    () => fetchCandidate(card.candidateId),
    {
      enabled: !!card.candidateId,
      cacheTime: 86400 * 3,
    }
  );

  const { data: filteredListing, isLoading: isLoadingListing } = useQuery(
    ["listing", card.listingsIds],
    () => fetchListing(card.listingsIds),
    {
      enabled: !!card.listingsIds,
      cacheTime: 86400 * 3,
    }
  );

  return (
    <div
      id="main-card-container"
      key={card}
      className={`rounded-b-lg ${card.isArchive ? " border-4  border-gray-800" : ""}`}
    >
      {!isLoadingListing && !isLoadingCand ? (
        <div className=" bg-white relative rounded-b-lg border-t-8 border-custom-grey px-4 py-5 flex flex-col justify-around shadow-md h-full">
          <div id="status-container" className="flex justify-between">
            <h1 className="candidate-territory">
              {card?.docType?.trim() === "TC"
                ? "Territory Check"
                : "Formal Registration"}
            </h1>
            <h1
              className={`${card.status?.toLowerCase() === "pending" ? "candidate-pending" : "candidate-available"}`}
            >
              {card.status}
            </h1>
          </div>
          <div className="flex justify-center items-center w-full mt-4 gap-3">
            <img
              src={`/${filteredListing?.imgUrl}`}
              alt="smash"
              className="w-14"
            />
            <p className="text-lg font-bold text-custom-heading-color">
              {filteredListing?.name}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="py-3 ">
              <p className="text-md font-bold  text-custom-dark-blue text-center">
                Candidate Information
              </p>
              <ul>
                <li className="text-sm text-custom-grey text-center">
                  {filteredCand?.firstName} {filteredCand?.lastName}
                </li>
                <li className="text-sm text-custom-grey text-center">
                  {filteredCand?.territoryCity} {filteredCand?.territoryState},{" "}
                  {filteredCand?.territoryZipcode}
                </li>
                <li className="text-sm text-custom-grey text-center">
                  {" "}
                  {FormatRawDate(card)}
                </li>
              </ul>
            </div>
            <div className="py-3 ml-8">
              <p className="text-md font-bold  text-custom-dark-blue text-center">
                Company Information
              </p>
              <ul>
                <li className="text-sm text-custom-grey text-center">
                  {filteredListing?.username}
                </li>
                <li className="text-sm text-custom-grey underline text-center">
                  <a href={"tel:" + filteredListing?.phone}>
                    {filteredListing?.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-sm flex gap-2 items-center justify-between">
            <p></p>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center">
          <img src="/images/banners/loading.gif" alt="" />
        </div>
      )}
    </div>
  );
};
export default CandidateSideBar;
