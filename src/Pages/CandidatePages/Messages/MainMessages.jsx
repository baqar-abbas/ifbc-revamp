import axios from "axios";
import { filter } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import BarLoader from "src/Animations/BarLoader";
import PageTransition from "src/Animations/PageTransition";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import { MyTCFRContext } from "src/Context/TCFRDataContext";
import DialogBox from "src/Popups/DialogBox";
import FormatRawDate from "src/Utils/FormatRawDate";

const baseUrl = `https://backend.ifbc.co/api`;
const fetchCandidate = async (candidateId) => {
  const { data } = await axios.get(`${baseUrl}/candidates/${candidateId}`);
  return data;
};

const fetchListing = async (listingId) => {
  const { data } = await axios.get(`${baseUrl}/listings/${listingId}`);
  return data;
};
const MainMessages = () => {
  const { name } = useParams();
  const { newData, loadingTCFR } = useContext(MyTCFRContext);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filters, setFilters] = useState({});
  useEffect(() => {
    if (name === "territory-check") {
      setFilters({ type: "TC", status: "Inbox" });
    } else if (name === "formal-registration") {
      setFilters({ type: "FR", status: "Inbox" });
    } else if (name === "inbox") {
      setFilters({ type: "All", status: "Inbox" });
    }
    setFilters((prev) => ({
      ...prev,
      status: "Inbox",
    }));
  }, [name]);

  useEffect(() => {
    if (!loadingTCFR && newData && newData.length > 0) {
      const filterType = newData.filter(
        (data) => data.docType === filters.type
      );

      if (filterType.length > 0) {
        setFilteredMessages(filterType);
      } else if (filters.type === "All") {
        setFilteredMessages(newData);
      } else {
        setFilteredMessages([]);
      }
    }
  }, [filters, newData]);

  useEffect(() => {
    if (filteredMessages && filteredMessages.length > 0 && filters.status) {
      let filterStatus = [];
      if (filters.status === "Inbox") {
        setFilteredMessages(filteredMessages);
      } else if (filters.status === "Archived") {
        filterStatus = filteredMessages.filter(
          (listing) => listing.isArchive === true
        );

        setFilteredMessages(filterStatus);
      } else if (filters.status === "Trash") {
        filterStatus = filteredMessages.filter(
          (listing) => listing.isTrash === true
        );
        setFilteredMessages(filterStatus);
      }
    }
  }, [filters.status, loadingTCFR]);

  return (
    <PageTransition>
      {!loadingTCFR ? (
        <div className=" my-20 max-w-7xl mx-auto flex flex-col gap-5 max-md:px-5">
          <FirstRow name={name} setFilters={setFilters} filters={filters} />
          <SecondRow
            setSelectedMessages={setSelectedMessages}
            filteredMessages={filteredMessages}
            setFilters={setFilters}
            filters={filters}
            selectedMessages={selectedMessages}
          />
          <div
            id="cards-container"
            className={`${filteredMessages && filteredMessages.length > 0 ? "grid" : ""} grid-cols-1 md:grid-cols-3 gap-5`}
          >
            {filteredMessages && filteredMessages.length > 0 ? (
              filteredMessages.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  selectedMessages={selectedMessages}
                  filteredMessages={filteredMessages}
                  setSelectedMessages={setSelectedMessages}
                />
              ))
            ) : (
              <h1 className="w-full text-custom-heading-color capitalize flex justify-center text-3xl items-center h-full my-5">
                No Registrations of this type please select another option
              </h1>
            )}
          </div>
        </div>
      ) : (
        <div className="grid place-items-center p-10">
          <BarLoader bgcolor={"blue"} />
        </div>
      )}
    </PageTransition>
  );
};

const Card = ({ card, selectedMessages, setSelectedMessages }) => {
  const { data: filteredCand, isLoading: isLoadingCand } = useQuery(
    ["candidate", card.candidateId],
    () => fetchCandidate(card.candidateId),
    {
      enabled: !!card.candidateId,
      staleTime: 86400 * 1000, // 1 day in milliseconds
      cacheTime: 86400 * 1000 * 3, // 3 days in milliseconds
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnMount: false, // Disable refetch on mount
      refetchOnReconnect: false, // Disable refetch on reconnect
    }
  );

  const { data: filteredListing, isLoading: isLoadingListing } = useQuery(
    ["listing", card.listingsIds],
    () => fetchListing(card.listingsIds),
    {
      enabled: !!card.listingsIds,
      cacheTime: 86400 * 1000 * 3, // 3 days in milliseconds
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnMount: false, // Disable refetch on mount
      refetchOnReconnect: false, // Disable refetch on reconnect
    }
  );

  // Function to handle checkbox change
  const handleCheckboxChange = (docId) => {
    setSelectedMessages((prevSelected) => {
      // Check if docId already exists in selectedMessages
      const index = prevSelected.indexOf(docId);
      if (index === -1) {
        // Add docId if it doesn't exist
        return [...prevSelected, docId];
      } else {
        // Remove docId if it exists
        return prevSelected.filter((sN) => sN !== docId);
      }
    });
  };
  return (
    <div
      id="main-card-container"
      key={card}
      className={`rounded-b-lg ${card.isArchive ? " border-4  border-gray-800" : ""}`}
    >
      {!isLoadingListing && !isLoadingCand ? (
        <div className=" bg-white relative rounded-b-lg border-t-8 border-custom-grey px-4 py-5 flex flex-col justify-around shadow-md h-full">
          <div class="flex justify-center items-center absolute top-1/2">
            <label class="container">
              <input
                class="peer cursor-pointer hidden after:opacity-100"
                checked={selectedMessages.includes(card.docId)}
                onChange={() => {
                  handleCheckboxChange(card.docId);
                }}
                type="checkbox"
              />
              <span class="inline-block w-5 h-5 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>
            </label>
          </div>

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

const FirstRow = ({ setFilters, name }) => {
  const handleInputChange = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const selectOptions = [
    { value: "All", label: "All" },
    { value: "Favs", label: "Favorites" },
    { value: "Msgs", label: "Messages" },
    { value: "Read", label: "Read" },
    { value: "Unread", label: "Unread" },
    { value: "territory-check", label: "Territory Checks" },
    { value: "formal-registration", label: "Formal Registration" },
  ];

  return (
    <div
      id="filter-options"
      className="grid grid-cols-1 md:grid-cols-3 gap-5 content-center"
    >
      <div id="compose-btn-container">
        <button className=" flex justify-center items-center gap-3 w-full candidate-btn">
          Compose
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
      </div>
      <div id="inbox-container">
        <select
          name="inbox-dropdown"
          id="inbox-dropdown"
          className="candidate-select w-full"
          onChange={handleStatusChange}
        >
          <option value="Inbox">Inbox</option>
          <option value="Archived">Archived</option>
          <option value="Trash">Trash</option>
        </select>
      </div>
      <div id="filter-container">
        <select
          name="filterby-dropdown"
          id="filterby-dropdown"
          className="candidate-select w-full"
          onChange={handleInputChange}
        >
          {selectOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={name === option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SecondRow = ({
  setSelectedMessages,
  filteredMessages,
  setFilters,
  filters,
  selectedMessages,
}) => {
  const [allMessagesIds, setAllMessagesIds] = useState([]);
  const [allSelectedMessagesData, setAllSelectedMessagesData] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (filteredMessages && filteredMessages.length > 0) {
      const docIds = filteredMessages.map((msg) => msg.docId);
      const uniquedocIds = [...new Set(docIds)];
      setAllMessagesIds(uniquedocIds);
    }
  }, [filteredMessages]);

  useEffect(() => {
    if (filteredMessages && filteredMessages.length > 0) {
      const allMessages = filteredMessages.filter((msg) =>
        selectedMessages.includes(msg.docId)
      );
      setAllSelectedMessagesData(allMessages);
    }
  }, [selectedMessages]);

  const handleBulkActions = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      action: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    //setLoading(true);

    const url = "https://backend.ifbc.co/api/registrations/";

    allSelectedMessagesData.map((message) => {
      const formData = {
        ...message,
        isArchive: filters.action === "Archive" ? true : false,
        isTrash: filters.action === "Trash" ? true : false,
        isRead: filters.action === "MarkRead" ? true : false,
        isFav: filters.type === "Favs" ? true : false,
      };

      axios
        .put(url + message.docId, formData)
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
          console.error("Error fetching data:", error);
        });
    });
    // Make a GET request to fetch the data
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
  };
  const allSelected = arraysEqual(selectedMessages, allMessagesIds);

  return (
    <>
      <DialogBox show={show} setShow={setShow}>
        <div className="p-10 bg-white flex justify-center items-center">
          <h1 className="text-custom-heading-blue text-3xl">
            Messages Successfully Updated!
          </h1>
        </div>
      </DialogBox>
      <div
        id="buttons-container"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        <div
          id="bulkaction-container"
          className="flex gap-5 items-center justify-center"
        >
          {allSelected ? (
            <button
              onClick={() => setSelectedMessages([])}
              id="select-all-btn"
              className="candidate-btn w-full flex justify-center items-center gap-3"
            >
              Unselect
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
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setSelectedMessages(allMessagesIds)}
              id="select-all-btn"
              className="candidate-btn w-full flex justify-center items-center gap-3"
            >
              Select All
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
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </button>
          )}
        </div>

        <div id="read-unread-btns" className="flex gap-3 justify-end">
          <select
            name="markread-dropdown"
            id="markread-dropdown"
            className="candidate-select w-full"
            onChange={handleBulkActions}
          >
            {!filters.action && <option value="">Bulk Options</option>}
            <option value="MarkRead">Mark read</option>
            <option value="Archive">Archive</option>
            <option value="Trash">Delete</option>
          </select>
          {filters.action && (
            <button
              className="candidate-btn w-full flex justify-center items-center gap-3"
              onClick={handleEdit}
            >
              Confirm
            </button>
          )}
        </div>

        <div id="search">
          <SearchingInput filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </>
  );
};

const SearchingInput = ({ filters, setFilters }) => {
  const ref = useRef();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInputChange = () => {
    const keyword = ref.current.value;
    setSearchKeyword(keyword);

    // Update the filters state with the search keyword
    setFilters({
      ...filters,
      search: [keyword],
    });
  };

  return (
    <div className="relative w-full">
      <input
        type="search"
        id="search-field"
        placeholder="Search Any Message"
        value={searchKeyword}
        ref={ref}
        onChange={handleSearchInputChange}
        className="block w-full p-3 text-sm text-black pr-10 outline-none bg-gray-200"
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
export default MainMessages;
