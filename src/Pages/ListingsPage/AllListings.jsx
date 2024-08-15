import { useContext, useEffect, useState } from "react";
import ListingsColumns from "./ListingsColumns";
import BarLoader from "src/Animations/BarLoader";
import Pagination from "../GlobalPageSections/Pagination";
import { MyContext } from "src/Context/ListingDataContext";

import { useDispatch } from "react-redux";
import {
  decrementAllActiveListing,
  incrementActiveListing,
} from "src/Redux/listingReducer";

import ToolInformation from "src/Popups/ToolInformation";
import ToolEmail from "src/Popups/ToolEmail";
import ToolComparison from "src/Popups/ToolComparison";
import SearchingComponent from "./SearchingComponent";
import ListingsFilter from "./ListingsFilter";

const AllListings = ({ setRegistrationType, setShow }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    filters,
    paginationListings,
    setPaginationListings,
    listings,
    loading,
    activeListings,
    showActiveListings,
    role,
  } = useContext(MyContext);
  const [filterListings, setFilterListings] = useState();
  const totalNoOfListings =
    window.innerWidth < 768
      ? showActiveListings
        ? activeListings.length
        : 10
      : showActiveListings
        ? activeListings.length
        : 24;

  const filterKeys = [
    "search",
    "category",
    "franchisedUnits",
    "franchiseFee",
    "investmentRange",
    "liquidity",
    "investmentRange",
    "minimumNetWorth",
    "monthCash",
    "numberofEmployees",
    "ownedUnits",
    "projectedNewUnits",
    "yearEstablished",
    "territories",
  ];

  // Effect to reset currentPage to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (listings.length > 0) {
      const filteredListings = filters
        ? listings.filter((listing) => {
            return filterKeys.every((key) => {
              if (
                filters.hasOwnProperty(key) &&
                filters[key] !== "" &&
                filters[key].length > 0
              ) {
                if (Array.isArray(filters[key]) && key === "search") {
                  return filters["search"].some(
                    (searchString) =>
                      listing.name.toLowerCase().includes(searchString) ||
                      listing.category.toLowerCase().includes(searchString)
                  );
                } else if (
                  Array.isArray(filters[key]) &&
                  key === "territories"
                ) {
                  return filters["territories"].some((searchString) =>
                    listing.territories.toLowerCase().includes(searchString)
                  );
                } else if (
                  Array.isArray(filters[key]) &&
                  (key === "franchiseFee" ||
                    key === "franchisedUnits" ||
                    key === "ownedUnits" ||
                    key === "liquidity" ||
                    key === "yearEstablished" ||
                    key === "projectedNewUnits" ||
                    key === "monthCash")
                ) {
                  return filters[key].some((filterValue) => {
                    const splittedFilterValue = filterValue.split("-");
                    const minValueFilter = Number(
                      splittedFilterValue[0]?.trim()?.replace(/[$,]/g, "")
                    );
                    const maxValueFilter = Number(
                      splittedFilterValue[1]?.trim()?.replace(/[$,]/g, "")
                    );
                    const newListingValue = Number(
                      listing[key]?.trim()?.replace(/[$,]/g, "")
                    );

                    if (filterValue.includes(">")) {
                      const maxValue = Number(
                        filterValue.split("> ")[1]?.trim()?.replace(/[$,]/g, "")
                      );
                      return newListingValue >= maxValue;
                    }
                    return (
                      newListingValue >= minValueFilter &&
                      newListingValue <= maxValueFilter
                    );
                  });
                } else if (
                  Array.isArray(filters[key]) &&
                  key === "investmentRange"
                ) {
                  return filters[key].some((filterValue) => {
                    const splittedListingValue = listing[key].split("-");

                    const valueFilter = Number(
                      filterValue?.trim()?.replace(/[$,]/g, "")
                    );

                    const minValueListing = Number(
                      splittedListingValue[0]?.trim()?.replace(/[$,]/g, "")
                    );
                    const maxValueListing = Number(
                      splittedListingValue[1]?.trim()?.replace(/[$,]/g, "")
                    );
                    return (
                      minValueListing <= valueFilter &&
                      maxValueListing <= valueFilter
                    );
                  });
                } else if (Array.isArray(filters[key]) && key === "category") {
                  return filters["category"].some((searchString) => {
                    return listing.category
                      .toLowerCase()
                      .includes(searchString?.toLowerCase());
                  });
                } else {
                  return listing[key]
                    ?.toLowerCase()
                    .includes(filters[key][0].toLowerCase());
                }
              }
              return true;
            });
          })
        : listings;
      setFilterListings(filteredListings);

      // Get current listings
      const indexOfLastListing = currentPage * totalNoOfListings;
      const indexOfFirstListing = indexOfLastListing - totalNoOfListings;

      let currentListings = filteredListings.slice(
        indexOfFirstListing,
        indexOfLastListing
      );
      setPaginationListings(currentListings);
    }
  }, [listings, currentPage, filters]);

  // Change page
  const paginate = (pageNumber) => {
    window.scrollTo({
      top: window.innerWidth < 768 ? 1000 : 100,
      behavior: "smooth",
    });
    setCurrentPage(pageNumber);
  };

  return loading ? (
    <div className="grid place-content-center">
      <BarLoader bgcolor={"blue"} />
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <ExtraTools setShow={setShow} setRegistrationType={setRegistrationType} />
      <div
        className={`flex-col flex md:flex-row gap-5 md:gap-0 ${role && role !== "N" ? "justify-between" : "justify-center"} items-center`}
      >
        {role && role !== "N" && (
          <p className="ml-5 text-custom-heading-color font-bold">
            Showing {paginationListings?.length} out of{" "}
            {filterListings ? filterListings.length : listings.length}{" "}
            Franchises
          </p>
        )}

        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filterListings?.length / totalNoOfListings)}
          onPageChange={paginate}
        /> */}
      </div>
      <ListingsFilter />
      <div
        id="listing-columns"
        className={`max-md:block ${
          paginationListings && paginationListings.length > 0 ? "grid" : ""
        } md:max-lg:grid-cols-2 lg:max-2xl:grid-cols-3 2xl:grid-cols-4`}
      >
        {showActiveListings &&
          paginationListings
            ?.filter((listing) => activeListings?.includes(listing.docId))
            .map((listing, index) => (
              <ListingsColumns key={index} index={index} listing={listing} />
            ))}

        {!showActiveListings &&
        paginationListings &&
        paginationListings.length > 0 ? (
          paginationListings.map((listing, index) =>
            window.innerWidth < 768 && index < 10 ? (
              <ListingsColumns key={index} index={index} listing={listing} />
            ) : (
              <ListingsColumns key={index} index={index} listing={listing} />
            )
          )
        ) : (
          <h1 className="text-custom-heading-color text-4xl w-full p-5 capitalize w-full">
            No Franchises Found For This Filter, Please try another filter
          </h1>
        )}
      </div>
      {/* Pagination */}

      <div className="w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filterListings?.length / totalNoOfListings)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
};

const ExtraTools = ({ setShow, setRegistrationType }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const {
    activeListings,
    showActiveListings,
    setShowActiveListings,
    paginationListings,
    role,
    setFilters,
    token,
  } = useContext(MyContext);
  const dispatch = useDispatch();

  const selectAllListings = () => {
    // Get an array of all listing names currently displayed on the page
    paginationListings?.map((listing) =>
      dispatch(incrementActiveListing(listing.docId))
    );

    // Update the activeListings state to include all listing names
  };

  const handleOpenRegistration = (type) => {
    setRegistrationType(type);
    setShow(true);
  };

  const handleTools = (e) => {
    // getting selected value from select
    const value = e.target.value;
    //select krne pr value arhi

    if (value === "email") {
      setShowEmail(true);
    }
    // issi tarah baaki dono ki bhi states true hongy
    else if (value === "info") {
      setShowInformation(true);
    } else if (value === "comparison") {
      setShowComparison(true);
    }
  };
  const roleCheck = role && role !== "N" && token;
  return (
    <div className="grid grid-cols-12 gap-3 items-center">
      {roleCheck && (
        <div
          className={`col-span-12 ${
            roleCheck ? "lg:col-span-4" : "lg:col-span-6"
          } md:flex md:mb-4 mb-0 flex-col h-full 
              justify-between 
           `}
        >
          <SearchingComponent setFilters={setFilters} />
          {activeListings && activeListings.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowActiveListings(!showActiveListings)}
              className={`border-2 border-custom-blue  hover:bg-custom-blue  hover:text-white transition-all duration-500 py-2 px-5 w-full whitespace-nowrap mr-4 rounded-md ${
                showActiveListings
                  ? "text-white bg-custom-blue"
                  : "text-custom-blue"
              }`}
            >
              My Selection ({activeListings.length})
            </button>
          ) : (
            <button
              type="button"
              className={`border-2 border-custom-blue  cursor-default transition-all duration-500 py-2 px-5 w-full whitespace-nowrap mr-4 rounded-md text-custom-blue`}
            >
              No Franchise Selected
            </button>
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-12 col-span-12  ${
          roleCheck ? "lg:col-span-4 " : "lg:col-span-12"
        } w-full gap-3 sm:gap-3 `}
      >
        {roleCheck && (
          <div className="col-span-12">
            <select
              onChange={handleTools}
              className="candidate-select w-full rounded-md"
            >
              <option value="">Tools</option>
              <option value="email"> Email Selected Franchises </option>
              <option value="info"> Create Information Packet </option>
              {/* <option value="comparison"> Create Comparison Report </option>
              <option value="2-min"> Download 2-Min Drill Packet </option>
              <option value="one-sheet"> Download One Sheet Packets </option> */}
            </select>
          </div>
        )}

        <ToolEmail showEmail={showEmail} setShowEmail={setShowEmail} />

        <ToolInformation
          showInformation={showInformation}
          setShowInformation={setShowInformation}
        />
        <ToolComparison
          showComparison={showComparison}
          setShowComparison={setShowComparison}
        />

        {roleCheck && (
          <button
            className={`${
              activeListings.length > 0
                ? roleCheck
                  ? "col-span-6"
                  : "col-span-12"
                : "col-span-12"
            } border-2 border-green-900 hover:bg-green-900 hover:text-white transition-all duration-500 py-2 px-5 w-full md:w-auto tertiary-button text-green-900 rounded-md`}
            onClick={selectAllListings}
          >
            Select All
          </button>
        )}

        {roleCheck && activeListings.length > 0 && (
          <button
            className={`${
              roleCheck ? "col-span-6" : "col-span-12"
            } border-2 border-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 py-2 px-5  w-full md:w-auto tertiary-button text-red-900 rounded-md`}
            onClick={() => {
              setShowActiveListings(false);
              dispatch(decrementAllActiveListing());
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {roleCheck && (
        <div
          id="form-button-container"
          className="flex flex-col gap-2 w-full justify-between h-full sm:col-span-6 col-span-12 lg:col-span-4"
        >
          <button
            className="candidate-btn w-full"
            value="tc"
            onClick={() => handleOpenRegistration("TC")}
          >
            Territory Checks
          </button>
          <button
            className="candidate-btn w-full"
            value="fr"
            onClick={() => handleOpenRegistration("FR")}
          >
            Formal Registrations
          </button>
        </div>
      )}
    </div>
  );
};

export default AllListings;
